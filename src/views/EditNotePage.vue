<template>
  <div>
    <n-spin :show="isLoading" size="large">
      <EditTopNavBar :isPinned="isPinned" @pin="handlePin" @done="handleDone" @back="handleBack"/>
      <n-input
          class="input-box title-box"
          placeholder="标题"
          v-model:value="title"
      />
      <n-select
          class="input-box tag-box"
          filterable
          multiple
          tag
          type="info"
          v-model:value="tags"
          :show-arrow="false"
          :show="false"
          :max-tag-count="3"
          placeholder="Tag"
      />
      <n-input
          class="input-box content-box"
          type="textarea"
          placeholder="内容"
          :autosize="{
            minRows: 10
          }"
          v-model:value="content"
      />
      <EditBottomBtn @analysis="handleAI"/>

      <template #description>
        AI Note分析中，请稍候...
      </template>
    </n-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {NInput, NSelect, NSpin, useMessage} from 'naive-ui'
import router from "@/router";
import EditTopNavBar from "@/components/EditTopNavBar.vue";
import EditBottomBtn from "@/components/EditBottomBtn.vue";
import axios from 'axios';

export default defineComponent({
  components: {
    EditBottomBtn,
    EditTopNavBar,
    NInput,
    NSelect,
    NSpin
  },
  setup() {
    const message = useMessage()
    const currentNote = sessionStorage.getItem('currentNote');

    const title = ref<string | null>(currentNote ? JSON.parse(currentNote).title : '')
    const tags = ref<string[]>(currentNote ? JSON.parse(currentNote).tags : [])
    const content = ref<string | null>(currentNote ? JSON.parse(currentNote).content : '')
    const isPinned = ref<boolean | null>(currentNote ? JSON.parse(currentNote).isPinned : false)
    const isFocused = ref(false)
    const isLoading = ref(false)

    const handleBack = () => {
      sessionStorage.removeItem('currentNote')
      router.back()
    }

    const handlePin = () => {
      isPinned.value = !isPinned.value
      message.info(isPinned.value ? '已收藏' : '已取消收藏')
      
    }

    const handleDone = () => {
      const note = {
        title: title.value,
        tags: tags.value,
        content: content.value,
        isPinned: isPinned.value,
      }
      if (note.title === '' && note.content === '' && note.tags.length === 0) {
        message.error('标题、标签和内容不能都为空')
        return
      }
      // 当前用户信息
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        const user = JSON.parse(currentUser)

        // 如果是编辑已有笔记，则替换原来同样title的笔记
        if (currentNote) {
          const index = user.notes.findIndex((note: any) => note.title === JSON.parse(currentNote).title)
          user.notes.splice(index, 1, note)
        } else {
          // 如果是新建笔记，则添加
          user.notes.push(note)
        }

        localStorage.setItem('currentUser', JSON.stringify(user))
        sessionStorage.removeItem('currentNote')
      }
      router.push('/home')
    }

    const openAI = async (messages: Array<{role: string, content: string}>) => {
      const response = await axios.post('https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: messages
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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'
            }
          });
      console.log(response.data);
      return response.data.choices[0].message.content;
    }


    // 打字机效果
    const typeWriterEffect = (text: string, textField: any) => {
      let i = 0;
      let typing = setInterval(() => {
        if (i < text.length) {
          textField.value += text.charAt(i);
          window.scrollTo(0, window.scrollY + 100);
          i++;
        } else {
          clearInterval(typing);
        }
      }, 50);
    }

    const handleAI = async () => {
      const note = {
        title: title.value,
        tags: tags.value,
        content: content.value,
        isPinned: isPinned.value,
      }

      if (note.title === '' && note.content === '' && note.tags.length === 0) {
        message.error('标题、标签和内容不能都为空')
        return
      }

      isLoading.value = true;

      if (note.title !== '' && note.content !== '') {
        try {
          const messages = [
            {role: "system", content: "你是一个笔记助手。必须严格按照用户要求进行回答。"},
            {role: "user", content: "使用中文，用最快的速度根据标题和内容续写一段内容，禁止使用MarkDown语法，这是标题: " + note.title
                  + "。这是内容: " + note.content},
          ];
          const generatedText = await openAI(messages);
          content.value += "\n\n [ AI NOTE GENERATION ] \n";
          typeWriterEffect(generatedText, content);
        } catch (error) {
          message.error('网络错误: ' + error);
        }
      }

      if(note.title === '') {
        try {
          if(note.content === '') {
            message.error('标题和内容不能都为空')
            return
          }

          const messages = [
            {role: "system", content: "你是一个笔记助手。必须严格按照用户要求进行回答。"},
            {role: "user", content: "使用中文，用最快的速度根据这段内容归纳一个标题，要求不使用主语，不超过十个字: " + note.content},
          ];
          const generatedText = await openAI(messages);
          title.value = "[AI] ";
          typeWriterEffect(generatedText, title);
        } catch (error) {
          message.error('网络错误: ' + error);
        }
      }

      if(note.tags.length === 0) {
        try {
          let messages: Array<{role: string, content: string}>;
          if (note.content === '')
            messages = [
              {role: "system", content: "你是一个笔记助手。必须严格按照用户要求进行回答。"},
              {role: "user", content: "使用中文，用最快的速度为以下标题生成一个中文分类标签，最好为一个词汇，并严格要求不超过五个字，不含标点符号: " + note.title},
            ];
          else
            messages = [
              {role: "system", content: "你是一个笔记助手。必须严格按照用户要求进行回答。"},
              {role: "user", content: "使用中文，用最快的速度为以下内容生成一个中文分类标签，最好为一个词汇，并严格要求不超过五个字，不含标点符号: " + note.content},
            ];

          const generatedText = await openAI(messages);
          tags.value = ["AI", generatedText];
        } catch (error) {
          message.error('网络错误: ' + error);
        }
      }

      if(note.content === '') {
        try {
          const messages = [
            {role: "system", content: "你是一个笔记助手。必须严格按照用户要求进行回答。"},
            {role: "user", content: "使用中文，用最快的速度根据标题生成一篇短篇教学式笔记，禁止使用MarkDown语法: " + note.title},
          ];
          const generatedText = await openAI(messages);
          content.value += " [ AI NOTE GENERATION ] \n";
          typeWriterEffect(generatedText, content);
        } catch (error) {
          message.error('网络错误: ' + error);
        }
      }

      isLoading.value = false;
    }

    return {
      title,
      tags,
      content,
      isPinned,
      isFocused,
      handleBack,
      handlePin,
      handleDone,
      handleAI,
      isLoading,
    }
  }
})
</script>

<style scoped>
.input-box, .input-box >>> .n-base-selection  {
  --n-border: 0 !important;
  --n-border-hover: 0 !important;
  --n-border-focus: 0 !important;
  --n-border-active: 0 !important;
  --n-box-shadow-active: 0 !important;
  --n-box-shadow-focus: 0 !important;
  --n-caret-color: #000000 !important;
}

.input-box >>> .n-tag {
  --n-color: #e2eefb !important;
  --n-text-color: #207fee !important;
}

.title-box {
  font-size: 28px;
  line-height: 1.8;
  padding: 15px 10px;
}

.tag-box {
  font-size: 12px;
  font-family: "Comic Sans MS + YouYuan", serif;
}

.content-box {
  font-size: 16px;
  padding: 5px 10px 15px 10px;
}

</style>

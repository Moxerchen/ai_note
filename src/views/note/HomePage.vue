<template>
  <TopNavBar @onSearch="handleSearch" @on-add="handleAdd" @on-pin="handlePin" />
  <n-list hoverable>
    <n-list-item v-for="(note, index) in notes" :key="index">
      <n-thing :title="note.title" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag v-for="(tag, tagIndex) in note.tags" :key="tagIndex" :bordered="false" type="info" size="small">
              {{ tag }}
            </n-tag>
          </n-space>
        </template>
        <n-ellipsis style="max-width: 240px" :tooltip="false">
          {{ note.content }}
        </n-ellipsis>
      </n-thing>

      <template #suffix>
        <n-button
            quaternary
            style="font-size: 24px"
            circle
            @click="editNote(note)">
          <n-icon :component="Edit" />
        </n-button>
        <n-button
            quaternary
            style="font-size: 24px"
            circle
            @click="delNote(note)">
          <n-icon :component="Delete" />
        </n-button>
      </template>
    </n-list-item>
  </n-list>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {NList, NListItem, NThing, NSpace, NTag, NEllipsis, NButton, NIcon, useMessage} from 'naive-ui'
import TopNavBar from "@/components/TopNavBar.vue";
import {UserInfo} from "@/types/UserInfo";
import router from "@/router";
import {Edit, Delete} from "@vicons/carbon";
import {useNewUser} from "@/untils/useNewUser";

interface Note {
  title: string;
  tags: string[];
  content: string;
  isPinned: boolean;
}

export default defineComponent({
  components: {
    TopNavBar,
    NList,
    NListItem,
    NThing,
    NSpace,
    NTag,
    NEllipsis,
    NButton,
    NIcon,
  },
  setup() {
    // 检测是否为新用户
    useNewUser();

    const message = useMessage()

    const notes = ref<Note[]>([])
    const currentUser = localStorage.getItem('currentUser')
    const data: UserInfo = currentUser == null ? null : JSON.parse(currentUser)
    const displayPin = ref(false)

    onMounted(() => {
      notes.value = [...data.notes]
    })

    const handleSearch = (value: string) => {
      // 更新notes，仅包含搜索结果
      if (value == null || value === '')
        notes.value = [...data.notes]
      else
        value = value.toUpperCase()

      notes.value = data.notes.filter(note =>
          note.title.toUpperCase().includes(value) ||
          (note.tags && Array.isArray(note.tags) && note.tags.some(tag => tag.toUpperCase().includes(value))) ||
          note.content.toUpperCase().includes(value)
      )
    }

    const handlePin = () => {
      if (displayPin.value) {
        notes.value = data.notes
        message.info('平平淡淡才是真~🎈')
      }
      else {
        notes.value = data.notes.filter(note => note.isPinned)
        message.info('哇，宝藏笔记！🎁')
      }

      displayPin.value = !displayPin.value
    }

    const editNote = (note: Note) => {
      sessionStorage.setItem('currentNote', JSON.stringify(note));
      router.push('/edit-note');
    }

    const delNote = (note: Note) => {
      const index = notes.value.findIndex(item => item.title === note.title)
      notes.value.splice(index, 1)
      data.notes.splice(index, 1)
      localStorage.setItem('currentUser', JSON.stringify(data))
    }

    const handleAdd = () => {
      router.push('/edit-note');
    }

    return {
      Edit,
      Delete,
      notes,
      handleSearch,
      handleAdd,
      handlePin,
      editNote,
      delNote,
    }
  }
})
</script>
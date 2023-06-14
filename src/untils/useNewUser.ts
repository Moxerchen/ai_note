import { onMounted } from 'vue';
import router from "@/router";

export function useNewUser() {
    onMounted(() => {
        const currentUser: string | null = localStorage.getItem('currentUser');
        if (currentUser && JSON.parse(currentUser).isFirstLogin) {
            router.push('/guide');
        } else {
            router.push('/home');
        }
    });
}

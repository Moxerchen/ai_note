import { onMounted } from 'vue';
import router from "@/router";

export function useAuth() {
    onMounted(() => {
        const isLogged: string | null = localStorage.getItem('isLogged');
        if (isLogged && JSON.parse(isLogged)) {
            router.push('/home');
        }
    });
}

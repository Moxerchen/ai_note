import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from "@/views/RegisterPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LoginPage,
        },
        {
            path: '/register',
            component: RegisterPage,
        }
    ],
});

router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check if the user is logged in
        if (!isUserLoggedIn()) {
            // If the user is not logged in, redirect to login page
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next();
    }
});

function isUserLoggedIn() {
    return localStorage.getItem('isLogged');
}


export default router;

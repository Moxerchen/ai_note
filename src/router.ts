import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from "@/views/RegisterPage.vue";
import VerificationPage from "@/views/VerificationPage.vue";
import ForgetPage from "@/views/ForgetPage.vue";
import RetrievePage from "@/views/RetrievePage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import HomePage from "@/views/HomePage.vue";

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
        },
        {
            path: '/verification',
            component : VerificationPage,
        },
        {
            path: '/forget-password',
            component: ForgetPage,
        },
        {
            path: '/retrieve',
            component: RetrievePage,
        },
        {
            path: '/reset-password',
            component: ResetPasswordPage,
        },
        {
            path: '/home',
            component: HomePage,
            meta: {
                requiresAuth: true,
            }
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
    return localStorage.getItem('isLogged') === 'true';
}

export default router;

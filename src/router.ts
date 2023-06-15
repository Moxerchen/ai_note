import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './views/user/LoginPage.vue';
import RegisterPage from "@/views/user/RegisterPage.vue";
import VerificationPage from "@/views/user/VerificationPage.vue";
import ForgetPage from "@/views/user/ForgetPage.vue";
import RetrievePage from "@/views/user/RetrievePage.vue";
import ResetPasswordPage from "@/views/user/ResetPasswordPage.vue";
import HomePage from "@/views/note/HomePage.vue";
import EditNotePage from "@/views/note/EditNotePage.vue";
import GuidePage from "@/views/note/GuidePage.vue";
import NewUserPage from "@/views/note/NewUserPage.vue";
import PersonalPage from "@/views/note/PersonalPage.vue";

import SearchPage from './views/topic/SearchPage.vue';
import SearchTopic from './views/topic/SearchTopic.vue';
import QuestionBank from './views/topic/QuestionBank.vue';
import BookBankPage from './views/topic/BookBankPage.vue';
import BookList from './views/topic/BookList.vue';
import BookDetail from './views/topic/BookDetail.vue';
import BookPage from './views/topic/BookPage.vue';
import Interpretation from './views/topic/Interpretation.vue';
import BankList from './views/topic/BankList.vue';
import HongLou from './views/topic/HonglouPage.vue';
import SwitchBank from './views/topic/SwitchBank.vue';
import Result from './views/topic/ResultPage.vue';
import QuestionDetail from './views/topic/QuestionDetail.vue';

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
                showFooter: true,
            }
        },
        {
            path: '/guide',
            component: GuidePage,
        },
        {
            path: '/new-user',
            component: NewUserPage,
        },
        {
            path: '/book',
            component: SearchTopic,
            meta: {
                requiresAuth: true,
                showFooter: true,
            }
        },
        {
            path: '/QuestionBank',
            component: QuestionBank
        },
        {
            path: '/SearchPage',
            component: SearchPage
        },
        {
            path: '/BookBankPage',
            component: BookBankPage
        },
        {
            path:'/BookList',
            component:BookList
        },
        {
            path:'/BookDetail',
            component:BookDetail
        },
        {
            path:'/BookPage',
            component:BookPage
        },
        {
            path:'/Inter',
            component:Interpretation
        },
        {
            path:'/BankList',
            component:BankList
        },
        {
            path:'/HongLou',
            component:HongLou
        },
        {
            path:'/SwitchBank',
            name:'SwitchBank',
            component:SwitchBank
        },
        {
            path:'/Result',
            name:'Result',
            component:Result,
            props: (route) => ({
                score: route.query.score ? parseInt(route.query.score as string, 10) : 0,
                questions: JSON.parse(route.query.questions as string),
                selectedAnswers: JSON.parse(route.query.selectedAnswers as string)
            })
        },
        {
            path: '/question/:text',
            name: 'QuestionDetail',
            component: QuestionDetail,
        },
        {
            path: '/person',
            component: PersonalPage,
            meta: {
                requiresAuth: true,
                showFooter: true,
            }
        },
        {
            path: '/edit-note',
            component: EditNotePage,
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

import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from "@/views/RegisterPage.vue";
import VerificationPage from "@/views/VerificationPage.vue";
import ForgetPage from "@/views/ForgetPage.vue";
import RetrievePage from "@/views/RetrievePage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import HomePage from "@/views/HomePage.vue";
import EditNotePage from "@/views/EditNotePage.vue";
import GuidePage from "@/views/GuidePage.vue";
import NewUserPage from "@/views/NewUserPage.vue";

import SearchPage from './views/SearchPage.vue';
import SearchTopic from './views/SearchTopic.vue';
import QuestionBank from './views/QuestionBank1.vue';
import BookBankPage from './views/BookBankPage.vue';
import BookList from './views/BookList.vue';
import BookDetail from './views/BookDetail.vue';
import BookPage from './views/BookPage.vue';
import Interpretation from './views/Interpretation.vue';
import BankList from './views/BankList.vue';
import HongLou from './views/HonglouPage.vue';
import SwitchBank from './views/SwitchBank.vue';
import Result from './views/ResultPage.vue';
import QuestionDetail from './views/QuestionDetail.vue';

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
        // {
        //     path: '/person',
        //     component: PersonPage,
        //     meta: {
        //         requiresAuth: true,
        //         showFooter: true,
        //     }
        // },
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

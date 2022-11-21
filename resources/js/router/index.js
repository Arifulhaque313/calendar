import { createRouter, createWebHistory } from "vue-router";

/** router define */
const routes = [
    { path: '/nsl-login', name: 'login', component: () => import('./../views/auth/login2') },
    { path: '/reg', name: 'reg', component: () => import('./../views/auth/register2')},
    { path: '/reset-pass', name: 'resetpass', component: () => import('./../views/auth/reset')},
    
    {
    path: '',
    component: () => import('../views/admin/layout.vue'),
    beforeEnter: checkAuth,
    children: [
       
        // ------------------ADMIN PORTION------------------
        { path: '/dashboard', name: 'dashboard', component: () => import('./../views/admin/dashboard.vue') },
        { path: '/admin', name: 'admin.index', component: () => import('./../views/admin/admin/index') },
        { path: '/admin/create', name: 'admin.create', component: () => import('./../views/admin/admin/create') },
        { path: '/admin/:id', name: 'admin.show', component: () => import('./../views/admin/admin/view') },
        { path: '/admin/:id/edit', name: 'admin.edit', component: () => import('./../views/admin/admin/create') },

        { path: '/module', name: 'module.index', component: () => import('./../views/admin/system/module/index') },
        { path: '/module/create', name: 'module.create', component: () => import('./../views/admin/system/module/create') },

       
        // ------------------CALENDAR PORTION------------------
        { path: '/calendar', name: 'calendar.index', component: () => import('./../views/admin/calendar/index')},
        { path: '/calendar/create', name: 'calendar.create', component: () => import('./../views/admin/calendar/create')},
        { path: '/calendar/:id', name: 'calendar.show', component: () => import('./../views/admin/calendar/view')},
        { path: '/calendar/:id/edit', name: 'calendar.edit', component: () => import('./../views/admin/calendar/create')},
    ],
},

]

/** check auth login / not */
function checkAuth(to, from, next) {
    let role = localStorage.getItem('role')
    let user = localStorage.getItem('user')
    if (role && user) {
        next()
    } else {
        window.location.href = "/";
    }
}

/** router initial */
const router = createRouter({
    history: createWebHistory(process.env.MIX_VUE_ROUTER_BASE),
    scrollBehavior() {
        window.scrollTo(0, 0);
    },
    linkExactActiveClass: "active",
    routes
});

export default router;
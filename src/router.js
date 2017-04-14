const routers = [
    {
        path: '/',redirect: '/User'
    },
    {
         path: '/User',
         redirect: '/User/New',
         meta: {
            title: ''
        },
        children:[
              {path: '/User/New', component: (resolve) => require(['./views/user/new.vue'], resolve)},
              {path: '/User/Active', component: (resolve) => require(['./views/user/active.vue'], resolve)}
        ],
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
     {
        path: '/Content',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/content.vue'], resolve)
    }
];
export default routers;
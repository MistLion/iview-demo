const routers = [
    {
        path: '/', redirect: '/Index'
    },
    {
        path: '/Index',
        redirect:'/Index/Home',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/main/index.vue'], resolve),
        children: [
            {
                path: '/User',
                redirect: '/User/New',
                meta: {
                    title: '用户管理'
                },
                children: [
                    { path: '/User/New', component: (resolve) => require(['./views/user/new.vue'], resolve) },
                    { path: '/User/Active', component: (resolve) => require(['./views/user/active.vue'], resolve) }
                ],
                component: (resolve) => require(['./views/main/user.vue'], resolve)
            },
            {
                path: '/Car',
                redirect:'/Car/Car',
                meta: {
                    title: '车辆管理'
                },
                component: (resolve) => require(['./views/main/car.vue'], resolve),
                children: [
                    { path: '/Car/Car', component: (resolve) => require(['./views/car/car.vue'], resolve) },
                    { path: '/Car/Station', component: (resolve) => require(['./views/car/station.vue'], resolve) },
                    { path: '/Car/Line', component: (resolve) => require(['./views/car/line.vue'], resolve) },
                    { path: '/Car/Class', component: (resolve) => require(['./views/car/class.vue'], resolve) }
                ],
            },
            {
                path: '/Index/Home',
                meta: {
                    title: '首页'
                },
                component: (resolve) => require(['./views/main/home.vue'], resolve)
            }
        ]
    },

];
export default routers;
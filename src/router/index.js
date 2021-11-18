import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/layout/header.vue"),
      children: [
        {
          path:"banner_set",
          name:'banner_set',
          component:() => import("@/view/banner_setting/banner_set")
        },
        {
          path:"hospital_set",
          name:'hospital_set',
          component:() => import("@/view/hospital_setting/hospital_set")
        }
      ]
    },
    {
      path: "/login",
      component: () => import("@/view/login.vue"),
    }
  ],
  linkActiveClass: "ant-menu-item-selected"
})

// router.beforeEach((to, from, next) => {
//   if (to.path !== "/login" && !sessionStorage.token) {
//     return next("/login");
//   }
//   next();
// });

export default router;
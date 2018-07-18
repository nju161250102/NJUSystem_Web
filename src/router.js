import VueRouter from 'vue-router'
import Login from './components/Login'
import Index from './components/Index'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {title: '登录 | 学生综合服务平台'},
    },
    {
      path: '/main',
      name: 'Main',
      component: Index,
      children: [

      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

export default router

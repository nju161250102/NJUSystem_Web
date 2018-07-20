import VueRouter from 'vue-router'
import Login from './components/Login'
import Index from './components/Index'
import CardRecord from './components/card/CardRecord'
import CardInfo from './components/card/CardInfo'

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {title: '登录 | 学生综合服务平台'},
    },
    {
      path: '/',
      name: 'Main',
      component: Index,
      children: [
        {
          path: '/cardInfo',
          name: "cardInfo",
          component: CardInfo,
          meta: {title: '校园卡个人信息'}
        },
        {
          path: '/cardRecord',
          name: "cardRecord",
          component: CardRecord,
          meta: {title: '校园卡消费明细'}
        },
        {
          path: '/',
          meta: {title: '首页 | 学生综合服务平台'}
        },
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

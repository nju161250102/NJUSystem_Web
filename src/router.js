import VueRouter from 'vue-router'
import Login from './components/Login'

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

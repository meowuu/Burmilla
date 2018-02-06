import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/pages/Home')
const Read = () => import('@/pages/Read')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/read/:id',
      name: 'Read',
      component: Read
    }
  ]
})

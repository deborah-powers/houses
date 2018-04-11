import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import usersList from '@/components/usersList'
import messagesList from '@/components/messagesList'
import home from '@/components/home'
import error from '@/components/error'
import messageToUser from '@/components/messageToUser'
import messageDetails from '@/components/messageDetails'
import userDetails from '@/components/userDetails'
import profile from '@/components/userProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/erreur',
      name: 'error',
      component: error
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/users',
      name: 'users',
      component: usersList
    },
    {
      path: '/users/:id',
      name: 'messageToUser',
      component: messageToUser
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/profile/:id',
      name: 'userDetails',
      component: userDetails
    },
    {
      path: '/messages',
      name: 'messages',
      component: messagesList
    },
    {
      path: '/messages/:id',
      name: 'messageDetails',
      component: messageDetails
    }
  ]
})

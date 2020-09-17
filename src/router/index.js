import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/views/register.vue'
import loginpage from '@/views/login.vue'
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/edit.vue'
import Home from '@/views/home.vue'
import email from "@/views/email.vue"
import article from "@/views/article.vue"
import editcategorytab from "@/views/editcategorytab.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: loginpage
  },
  {
    path: '/userinfo',
    component: userinfo,
    meta: {
      istoken: true
    }
  },
  {
    path:'/edit',
    component:edit,
    meta: {
      istoken: true
    }
  },
  {
    path:'/',
    component:Home,
    meta:{
      keepalive : true
    }
  },
  {
    path:'/email',
    component:email
  },
  {
    path:'/article/:id',
    component:article
  },
  {
    path:'/editcategory',
    component:editcategorytab
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if((!localStorage.getItem('token') || !localStorage.getItem('id'))&&to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})
export default router

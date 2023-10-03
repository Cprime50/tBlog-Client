

import { createRouter, createWebHistory } from 'vue-router'
import Body from './../components/Body.vue'
import Login from './../components/Login.vue'
import Blog from './../components/Blog.vue'
import Blogs from './../components/Blogs.vue'
import BlogsAdmin from './../components/BlogsAdmin.vue'
import BlogEdit from './../components/BlogEdit.vue'
import User from './../components/UserEdit.vue'
import Users from './../components/Users.vue'
import Admin from './../components/Admin.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Body,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
    },
    {
        path: '/blogs/:blogName',
        name: 'Blog',
        component: Blog,
    },
    {
        path: '/admin/blogs',
        name: 'BlogsAdmin',
        component: BlogsAdmin,
    },
    {
        path: '/admin/blogs/:blogID',
        name: 'BlogEdit',
        component: BlogEdit,
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: Users,
    },
    {
        path: '/admin/users/:userId',
        name: 'User',
        component: User,
    },

]

const router = createRouter({history: createWebHistory(), routes})
export default router
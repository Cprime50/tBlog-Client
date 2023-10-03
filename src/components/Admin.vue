<template>
<div class="container">
    <div class="row">
        <div class="col">
            <ul class="">
            <li>
              <router-link to="/admin/users">Manage Users</router-link>
            </li>
            <li>
              <router-link  to="/admin/users/0">Add Users</router-link>
            </li>
            <li>
              <router-link  to="/admin/blogs">Manage Blogs</router-link>
            </li>
            <li>
              <router-link  to="/admin/blogs/0">Add blog</router-link>
            </li>
          </ul>


        </div>
    </div>
</div>
  
</template>


<script>
import Security from './security.js'

export default {
    beforeMount() {
        Security.requireToken();
    }

}
</script>

<style>

</style>
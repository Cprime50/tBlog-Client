<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">User</h1>
                <hr>
                <form-tag @userEditEvent="submitHandler" name="userform" event="userEditEvent">

                    <text-input
                        v-model="user.first_name"
                        type="text"
                        required="true"
                        label="First Name"
                        :value="user.first_name"
                        name="first-name"></text-input>

                    <text-input
                        v-model="user.last_name"
                        type="text"
                        required="true"
                        label="Last Name"
                        :value="user.first_name"
                        name="last-name"></text-input>

                    <text-input
                        v-model="user.email"
                        type="text"
                        required="true"
                        label="Email"
                        :value="user.email"
                        name="email"></text-input>

                    <text-input
                        v-if="this.user.id === 0"
                        v-model="user.password"
                        type="password"
                        required="true"
                        label="Password"
                        :value="user.password"
                        name="password"></text-input>
                    
                    <text-input
                        v-else
                        v-model="user.password"
                        type="password"
                        required="true"
                        label="Password"
                        :value="user.password"
                        name="password"></text-input>

                        <hr>
                        <div class="float-start">
                            <input type="submit" class="btn btn-primary me-2" value="Save">
                            <router-link to="/admin/users" class="btn btn-outline-secondary">cancel</router-link>
                        </div>

                     <div class="float-end">
                        <!-- Check if userId is greater than 0 and not the same as the logged-in user's id -->
                        <a v-if="this.$route.params.userId > 0 && parseInt(this.$route.params.userId, 10) !== store.user.id"
                        class="btn btn-danger" href="javascript:void(0);" @click="confirmDelete(this.$route.params.userId)">Delete</a>
                    </div>

                        <div class="clearfix"></div>


                </form-tag>
            </div>
        </div>
    </div>
</template>

<script>
import Security from './security.js'
import FormTag from './forms/FormTag.vue'
import TextInput from './forms/TextInput.vue'
import {store} from './store.js'
import notie from 'notie'

export default {
    beforeMount() {
        Security.requireToken();

        if (parseInt(String(this.$route.params.userId), 10) > 0) {

                // editing an existing user
            
            fetch(process.env.VUE_APP_API_URL + "/admin/users/get/" + this.$route.params.userId, Security.requestOptions(""))
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    notie.alert({
                        type: 'error',
                        text: data.message,
                    })
                } else {
                    this.user = data;
                    // we want password to be empty for exiting users
                    this.user.password = "";
                }
            })
        }
                
    }, 
    data() {
        return {
            user: {
                id:0,
                first_name:"",
                last_name:"",
                email:"",
                password:"",
            },
            store,
        }
    },
    components: {
        'form-tag': FormTag,
        'text-input': TextInput,
    },
    methods: {
        submitHandler() {
            const payload = {
                id: parseInt(String(this.$route.params.userId), 10),
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                email: this.user.email,
                password: this.user.password,
            }

            fetch(`${process.env.VUE_APP_API_URL}/admin/users/save`, Security.requestOptions(payload))
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    notie.alert({
                        type:'error',
                        text: data.message
                    })
                } else {
                     notie.alert({
                        type:'error',
                        text: 'Changes saved!',
                    })
                }
            })
            .catch((error) => {
                notie.alert({
                    type:'error',
                    text: error,
                })
            })
        },
        confirmDelete() {

        }
    }

}

</script>

<style>

</style>
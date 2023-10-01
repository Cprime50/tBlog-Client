<template>
  <Header />
  <div>
    <router-view/>
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { store } from './components/store.js'

// read through cookies find  a particuler cookie and return else if that cookie doesnt exist return empty string
const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      store
    }
  },
  beforeMount() {
    // check for a cookie with the getCookie function
    let data = getCookie("_site_data");

    // if cookie not empty string
    if (data !== "") {
      let cookieData = JSON.parse(data);

      // update store
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }
  },
  mounted() {
    const payload = {
      foo: "bar",
    }

    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("Authorization", "Bearer " + store.token);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
      //headers: headers,
    }

    fetch("http://localhost:8082/admin/foo", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
  }
}
</script>

<style>

</style>
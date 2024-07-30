<template>
  <router-view />
</template>

<script>
//import axios from "axios"
import Profile from "./views/Profile.vue";

export default {
  components: { Profile },

  //  async mounted () {
  //   let response = await axios.get("http://localhost:3000/api/users/1")
  //   console.log(response)

  //app.get('http://localhost:3000/api/users', cors(corsOptions), (req, res) => {
  // Your route logic here
  //console.log(res)
  //});

  //},

  return: {
    Profile,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>

<template>
  <h1>Edit your Profile</h1>
  <div class="upload">
    <input ref="fileInput" type="file" @input="chooseFile" />
  </div>
  <h4>Update your Name</h4>
  <input type="text" v-model="fullName" placeholder="enter"  />
  <h4>Update your Bio display</h4>
  <input type="text" v-model="bio" placeholder="Bio"  />
  <div class="cancel">
    <router-link to="/">Cancel</router-link>
  </div>
  <router-view />
  <button id="b2" @click="updateUser">Save</button>
  <slot />
</template>

<script>
import axios from "axios";

export default {

      data(){

    return {
      bio : this.$store.getters.bio,
        fullName: this.$store.getters.fullName
    }
  },
      methods: {
        updateUser() {


          //console.log("====>"+ this.$store.getters.bio)
        console.log(this.bio);

          axios
            .post("http://localhost:3000/api/saveuser", {
              firstName: "Renat",
              lastName: "Galyamov",
              bio: this.bio
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
      },
    };
</script>

<style scoped>
</style>

<template>
  <h1 class="font-serif text-3xl font-medium text-center text-red-600">
    Edit your Profile
  </h1>
  <div class="upload">
    <label class="img">Change image</label>
    <img style="" :src="image" alt="" />
    <input @change="handleImage" class="custom" type="file" accept="image/*" />
    <!-- <input ref="fileInput" type="file" @input="chooseFile" /> -->
  </div>
  <h4>Update your Name</h4>
  <input type="text" v-model="username" placeholder="enter" />
  <h4>Update your Bio display</h4>
  <input type="text" v-model="about" placeholder="Bio" />
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
  data() {
    return {
      about: this.$store.getters.bio,
      username: this.$store.getters.fullName,
      image: "",
      remoteurl: "",
    };
  },

  methods: {
    updateUser() {
      //console.log("====>"+ this.$store.getters.bio)
      console.log(this.bio);
      const user = {
        id: "66a93e05aa059d260385e6e6",
        username: this.username,
        about: this.about,
        image: this.image,
      };

      axios
        .post("http://localhost:3000/api/saveuser", user)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleImage(e) {
      console.log("inside handle");
      const selectImage = e.target.files[0];
      //this.image = selectImage;
      const reader = new FileReader();

      reader.onloadend = () => {
        this.image = reader.result;
        console.log(this.image);
      };
      reader.readAsDataURL(selectImage);
    },
  },
};
</script>

<style scoped></style>

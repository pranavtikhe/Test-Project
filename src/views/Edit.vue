<template>
  <body class="bg-cover h-screen bg-white">
    <h1 class="font-bold text-xl leading-[1.1] sm:text-3xl md:text-5xl">
      Edit your Profile
    </h1>
    <div class="upload">
      <label class="mb-4 font-semibold">Change image</label>
      <img style="" :src="image" alt="" />
      <input
        class="relative text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] custom"
        @change="handleImage"
        type="file"
        accept="image/*"
      />
      <!-- <input ref="fileInput" type="file" @input="chooseFile" /> -->
    </div>
    <h4 class="mb-4 font-semibold">Update your Name</h4>
    <input
      type="text"
      class="py-3 px-4 w-64 text-center items-center border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      v-model="username"
      placeholder="enter"
    />
    <h4 class="mb-4 font-semibold">Update your Bio display</h4>
    <div class="space-y-4">
    <input
      type="text"
      class="py-3 px-4 w-64 text-center items-center border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      v-model="about"
      placeholder="Bio"
    />
    <div class="space-x-4">  
    <button
      class="p-2 w-auto rounded-lg text-sm font-medium text-white bg-teal-600 "
      @click="updateUser"
    >
      Save
    </button>
    <router-link
        class="p-2 ml-22 w-auto rounded-lg text-sm font-medium bg-red-300 text-red-800"
        to="/"
        >Cancel</router-link
      >
    <router-view />
    </div>
    </div>

    <slot />
  </body>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      about: this.$store.getters.about,
      username: this.$store.getters.username,
      image: "",
    };
  },

  methods: {
    updateUser() {
      //console.log("====>"+ this.$store.getters.bio)
      // console.log(this.bio);
      // const user = {
      //   id: "66a93e05aa059d260385e6e6",
      //   username: this.username,
      //   about: this.about,
      //   image: this.image,
      // };
      const user = {
        id: "66a93e05aa059d260385e6e6",
        username: this.username,
        about: this.about,
        image: this.image,
      };
      console.log(user);

      axios
        .post("http://localhost:3000/api/saveuser", user)
        .then(function (response) {
          console.log("post response:", response);
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

<style scoped>
</style>

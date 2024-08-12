<template>
<!-- < class="w-full h-screen bg-gray-100 px-10 pt-10"> -->
  <!-- <button
    @click="toggleDark"
    class="py-2 px-4 bg-black text-white rounded-md dark:bg-white dark:text-black"
  >
    Change Theame
  </button>
  <span class="dark:text-gray-700"> {{ isDark ? "Dark" : "Light" }} Mode </span> -->
<!-- <div class="bg-slate-400 dark:bg-slate-800">
  <input type="checkbox" v-model="isDark"> -->
  <div class="theme-options" >
    <div id="theme-white"></div>
    <div id="theme-orange"
    v-bind:class="{'active':currentTheme === 'theme-orange'}"
    v-on:click="switchTheme(theme-orange)"></div>
    <div id="theme-black"></div>
  </div>

  <div class="space-x-50">
    <img style="" :src="image" class="shadow rounded-full max-w-full h-auto align-middle border-none  justify-center items-center" alt="" />
  </div>
  
  <div class="px-3 mt-4 space-y-10 ">
  <label class="font-bold text-3xl text-center mb-1 ">{{ user.username }}</label>
  <div class="px-3 mt-4 space-x-2">
  <label class="font-bold">About:</label>
  <label class=" mt-2 text-l text-gray-900">{{ user.about }}</label>
  </div>

  <div class="space-y-20 w-20 items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto" >
    <router-link to="/edit" >Edit</router-link>
  </div>
  <router-view />

  <div class="space-y-5 ">
  <label class="absolute inset-y-100 left-12 font-semibold border-solid">Contact Me:</label>
  <button class="absolute inset-y-100 right-10 bottom-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Share Link</button>
  <edit />
  <br />
  <div id="overall">
    <table class="border-collapse border  border-slate-500" border="1px">
      <thead>
        <tr>
          <th v-for="header in headers">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="links.length === 0">
          <td>No data</td>
        </tr>
        <tr v-else v-for="link in links" v-bind:key="links.id">
          <td>{{ link.title }}</td>
          <td>{{ link.url }}</td>
          <td>{{ link.description }}</td>
          <td>
            <div id="edit">
              <button @click="link.openModal = true" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-11">Edit</button>
              <Editlink v-show="link.openModal" @closeModal="()=>{link.openModal = false; reloadLinks()}" :link="link"/>
            </div>
          </td>
          <td>
            <button  @click="deleteLink(link._id)" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-11">Delete</button>
          </td>
     </tr>
      </tbody>
    </table>
  </div>
  </div>

    <br/>
   <div>
      <button class=" absolute  left-10 h-10 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openModal">Add</button>
      <Editlink v-show="isModalVisible" @closeModal="closeModal" :link="{
        title:'',
        url: '',
        description: ''
      }"/>
  </div>
  </div>

  <br/>

  <!-- <ShareNetwork
    network="facebook"
    url="http://192.168.0.102:8080/"
    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
    description="This week, Id like to introduce you to 'Vite', which means 'Fast'. Its a brand new development setup created by Evan You."
    quote="The hot reload is so fast it\'s near instant. - Evan You"
    hashtags="vuejs,vite"
  >
    Share on Facebook
</ShareNetwork> -->

  
</template>

<script >
import axios from "axios";
import Editlink from "./Editlink.vue";
// import { useDark} from "@vueuse/core";

// const isDark = useDark();
// const toggleDark  = useToggle(isDark);
export default {
  components: { Editlink },
  data() {
    return {
      user: "",
      image: "",
      headers: ["Title", "URL", "Description"],
      links: [],

      isModalVisible: false,
      toggleDark: false,
      currentTheme: localStorage.getItem('theme-color') 
    };
  },

  methods: {
    addLink: function (link) {
      this.links.push(link);
    },

    // toggleDark() {
    //   this.toggleDark = useToggle(isDark);
      // if(isDark){
      //   isDark = false;
      // }else{
      //   isDark = true;
      // }
    switchTheme(theme){
      localStorage.setItem('theme-color', theme);
        this.currentTheme = localStorage.getItem('theme-color')
    },

    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      console.log("closed modal")
      this.isModalVisible = false;
      this.reloadLinks()
    },

    async deleteLink(linkId) {

      console.log("delete link id: ", linkId);
      let response = await axios
      .delete("http://localhost:3000/api/links/delete/"+ linkId)
      .then((response) => {
        console.log("Delete response: ",response);
        this.reloadLinks()
      });
    },

    async reloadLinks()
    {

      await axios
        .get("http://localhost:3000/api/users/66a93e05aa059d260385e6e6")
        .then((response) => {
          console.log("links->" + response)
          this.user = response.data;
          this.links = this.user.links;

        
        });
    },
  },

  async mounted() {
     await axios
      .get("http://localhost:3000/api/users/66a93e05aa059d260385e6e6")
      .then((response) => {
        this.user = response.data;
        this.links = this.user.links;
        this.image = response.data.image;
        //console.log("user data", response.data);
        // const reader = new FileReader();
        // this.remoteImage = response.data.image;
        // reader.readAsDataURL(this.remoteImage);
        // this.$store.state.user.bio = this.user.about;
        //this.$store.commit("changeBio", this.user.about);
        // this.$store.dispatch("changeBio", {
        //   newBio: this.user.about
        // });
        this.$store.commit("changeAbout", {
          newAbout: this.user.about,
        });
        this.$store.commit("changeUsername", {
          newUsername: this.user.username,
        });
        this.$store.commit("changeImage", {
          newImage: this.user.image,
        });
      
      // this.$store.commit("changeLink", {
        //   newLink: this.user.link,
        // });

        // console.log("----" + this.$store.getters.about);
        // console.log("----" + this.$store.getters.username);
        // console.log("----" + this.$store.getters.image);
        // console.log("----" + this.$store.getters.link);
        //console.log("----"+ this.$store.state.user.bio );
        //console.log(this.user)
        //this.pos = response.pos;
      });
  },
  // this.user = response.json().data
  // console.log(this.user)
};
</script>

<style scoped></style>

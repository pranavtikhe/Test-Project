<template>
  <div class="image">
    <img :src= "remoteImage" alt="" />
  </div>

  <label class="name">{{ user.username }}</label>

  <label class="bio">{{ user.about }}</label>

  <div class="edit">
    <router-link to="/edit">Edit</router-link>
  </div>
  <router-view />

  <label class="contact">Contact Me</label>
  <button class="share">Share Link</button>
  <edit />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: "",
      remoteImage: "",
    };
  },

  async mounted() {
    let response = await axios
      .get("http://localhost:3000/api/users/66a93e05aa059d260385e6e6")
      .then((response) => {
        this.user = response.data;
        console.log(response.data)
        // const reader = new FileReader();
        // this.remoteImage = response.data.image;
        // reader.readAsDataURL(this.remoteImage);
        // this.$store.state.user.bio = this.user.about;
        //this.$store.commit("changeBio", this.user.about);
        // this.$store.dispatch("changeBio", {
        //   newBio: this.user.about
        // });
        this.$store.commit("changeBio", {
          newBio: this.user.about,
        });
        this.$store.commit("changeName", {
          newName: this.user.fullName,
        });
        this.$store.commit("changeImage", {
          newImage: this.user.image,
        });

        console.log("----" + this.$store.getters.bio);
        console.log("----" + this.$store.getters.fullName);

        //console.log("----"+ this.$store.state.user.bio );
        //console.log(this.user)
        //this.pos = response.pos;
      });
    // this.user = response.json().data
    // console.log(this.user)
  },
};
</script>

<style scoped>
.image {
  width: 150px;
  height: 150px;
  display: inline-flex;
}

.name {
  text-align: center;
  display: flow;
  padding: 40px;
  color: black;
}

.bio {
  text-align: center;
  display: flow;
  padding: 40px;
  color: black;
  border-style: solid;
  border-width: 2px;
  border-color: darkslategrey;
  padding: 15px;
}

.edit{
    position: fixed;
    right: 180px;
    bottom: 350px;
}

.share{
    position: fixed;
    bottom: 120px;
    right: 145px;
}
.contact{
    position: fixed;
    left: 130px;
    bottom: 350px;
    border-style: outset;
    border-color: darkslategray;
}
</style>

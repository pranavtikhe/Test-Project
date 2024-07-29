
<template>
  <div class="image">
    <img src="../assets/avatar.png" alt="" />
  </div>

  <p>{{user.user_name}}</p>
 <div class="edit">
<router-link to="/edit">Edit</router-link>
</div>
<router-view/>
  <p>{{user.about}}</p>

  <div class="info">
    <p>Information</p>

    <p>Contact Me</p>
    <button>Share Link</button>
  </div>
  <edit />
</template>

<script>
import axios from "axios"

export default {

  data(){

    return {
      user : "",
    
    }
  },

  async mounted () {
    let response = await axios.get("http://localhost:3000/api/users/3").then(response => {
    this.user = response.data;
   // this.$store.state.user.bio = this.user.about;
    //this.$store.commit("changeBio", this.user.about);
    // this.$store.dispatch("changeBio", {
    //   newBio: this.user.about
    // });
    this.$store.commit("changeBio", {
      newBio: this.user.about
    });
    console.log("----"+ this.$store.getters.bio)

    //console.log("----"+ this.$store.state.user.bio );
    //console.log(this.user)
    //this.pos = response.pos;
  });
    // this.user = response.json().data
    // console.log(this.user)
  }
   
};
</script>

<style scoped>

.image {
  width: 150px;
  height: 150px;
  display: inline-flex;
}
</style>
<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Edit your Link
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <table>
      <thead>
        <tr>
          <th>
            
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Title:
          </td>
          <td>
            <input type="text" v-model="currentLink.title"  placeholder="enter" />
          </td>
        </tr>
        <tr>
          <td>
            URL:
          </td>
          <td>
            <input type="text" v-model="currentLink.url"  placeholder="enter" />
          </td>
        </tr>
        <tr>
          <td>
            Description:
          </td>
          <td>
            <input type="text" v-model="currentLink.description"  placeholder="enter" />
          </td>
        </tr>
      </tbody>
    </table>
        </slot>
       </section>

      <footer class="modal-footer">
        <!-- <slot name="footer">
          This is the default footer!
        </slot> -->
        <button type="button"  @click="save">Save</button>
        <br/>
        <button type="button"  @click="close">Close</button>
      </footer>
    </div>
  </div>
</transition>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({  
  emits:['closeModal'],
  data: () => {
    return{
      currentLink: {
        title: '',
        description: '',
        url:''
      }
    }
  },
  props: {
   link: {
      type: Object,
   },
  },
  mounted()
  {
    this.currentLink = {...this.$props.link}
  },
  methods: {
    async save() {
      console.log("inside save 1")
      if (this.currentLink._id) {
        console.log("inside save");
        const linkJson = { id: this.currentLink._id, userid: "66a93e05aa059d260385e6e6", title: this.currentLink.title, url: this.currentLink.url, description: this.currentLink.description }
        console.log(linkJson);
        await axios
          .post("http://localhost:3000/api/savelink", linkJson)
          .then(function (response) {
            console.log("post response: ", response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("inside add");
        const linkJson = {userid: "66a93e05aa059d260385e6e6", title: this.currentLink.title, url: this.currentLink.url, description: this.currentLink.description }
        console.log(linkJson);
        await axios
          .post("http://localhost:3000/api/addlink", linkJson)
          .then(function (response) {
            console.log("post add response: ", response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      console.log("closed")
      this.$emit('closeModal')
      

    },

    close() {
      this.$emit("closeModal");
    },
  },
});
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

</style>


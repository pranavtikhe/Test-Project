import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {
            username: '',
            about: '',
            image: '',
            link: '',
        }
    },

    getters: {
        about: state => {
          return state.user.about;
        },
        username: state => {
            return state.user.username;
          },
          image: state => {
            return state.user.image;
          },
          link: state => {
            return state.user.link;
          }
              },

          

    mutations: {
        changeAbout (state, payload) {
          state.user.about = payload.newAbout
        },
        
        changeUsername (state, payload) {
          state.user.username = payload.newUsername
        },
        changeImage (state, payload) {
        state.user.image = payload.newImage
        },
        changeLink(state, payload) {
          state.user.link = payload.newLink
          },
     },

     actions: {
        changeBio (context, payload) {
          setTimeout(() => {
            context.commit("changeAbout", payload);
          }, 2000);
        },

        changeName(context, payload) {
          setTimeout(() => {
            context.commit("changeUsername", payload);
          }, 2000);
          },

          changeImage(context, payload) {
            setTimeout(() => {
              context.commit("changeImage", payload);
            }, 2000);
            },

           changeImage(context, payload) {
              setTimeout(() => {
                context.commit("changeLink", payload);
              }, 2000);
            },
          },
        

  });
 
  export default store;

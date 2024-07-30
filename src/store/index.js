import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {
            // username: '',
            fullName: '',
            bio: '',
            image: '',
        }
    },

    getters: {
        bio: state => {
          return state.user.bio;
        },
        fullName: state => {
            return state.user.fullName;
          },
          image: state => {
            return state.user.image;
          },
              },

    mutations: {
        changeBio (state, payload) {
          state.user.bio = payload.newBio
        },
        
        changeName (state, payload) {
          state.user.fullName = payload.newUsername
        },
        changeImage (state, payload) {
        state.user.image = payload.newImage
        },
     },

     actions: {
        changeBio (context, payload) {
          setTimeout(() => {
            context.commit("changeBio", payload);
          }, 2000);
        },

        changeName(context, payload) {
          setTimeout(() => {
            context.commit("changeName", payload);
          }, 2000);
          },

          changeImage(context, payload) {
            setTimeout(() => {
              context.commit("changeImage", payload);
            }, 2000);
            },
        }

  });
 
  export default store;

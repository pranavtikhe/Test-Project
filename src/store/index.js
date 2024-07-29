import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {
            username: '',
            fullName: '',
            bio: ''
        }
    },

    getters: {
        bio: state => {
          return state.user.bio;
        },
        fullName: state => {
            return state.user.fullName;
          },
      },

    mutations: {
        changeBio (state, payload) {
          state.user.bio = payload.newBio
        
        }
     },

     actions: {
        changeBio (context, payload) {
          setTimeout(() => {
            context.commit("changeBio", payload);
          }, 2000);
        }
     }

  });
 
  export default store;

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
// import VueSocialSharing from 'vue-social-sharing'
const app = createApp(App)


// Vue.use(VueSocialSharing);

app.use(store)

app.use(router).mount('#app')



//App.use(store)

//createApp(App).use(router).mount('#app')

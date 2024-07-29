import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
const app = createApp(App)

app.use(store)

app.use(router).mount('#app')



//App.use(store)

//createApp(App).use(router).mount('#app')

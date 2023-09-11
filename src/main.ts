import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)

const options = {
  // You can set your default options here
}

app.component('QuillEditor', QuillEditor)
app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')

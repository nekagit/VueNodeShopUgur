import './styles/main.style.css'
import '@vue-js-cron/light/dist/light.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)

// Extra imports
import CronLightPlugin from '@vue-js-cron/light'
app.use(CronLightPlugin);

app.mount('#app')

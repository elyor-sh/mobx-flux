import { createApp } from 'vue'
import App from './App.vue'
import {createStoreProvider} from "mobx-flux-vue";
import {store} from "./store";

const app = createApp(App)

app.use(createStoreProvider(store))

app.mount('#app')

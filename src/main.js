import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "font-awesome/css/font-awesome.min.css";

const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);
app.use(store);

app.config.devtools = true;
app.mount('#app');

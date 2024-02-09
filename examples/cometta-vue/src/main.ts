import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import cometta from 'cometta';

cometta.normalize();

const app = createApp(App);

app.use(router);

app.mount('#app');

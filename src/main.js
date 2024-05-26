import { createApp } from 'vue';
import App from './components/App.vue';

function init(element = 'app') {
  createApp(App).mount(`.${element}`);
}

init('app');

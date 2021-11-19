import Router from './router/router.js';
import App from './firebase/app.js';

const root = document.getElementById('root');
export const app = new App();
const router = new Router(root, '#/', app);
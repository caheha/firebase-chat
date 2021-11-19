import Home from '../views/Home.js';
import Page from '../views/Page.js';

const pageTitle = "My app - ";

export const routes = [
    {
        path: '#/',
        view: Home,
        title: pageTitle + "Forside",
        auth: false
    }
];
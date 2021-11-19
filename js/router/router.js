import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

import { routes } from './routes.js';
import ErrorPage from '../views/ErrorPage.js';
import NotAuthenticated from '../views/NotAuthenticated.js';

export default class Router {
    constructor(root, defaultPage, app) {
        this.defaultPage = defaultPage;
        this.root = root;
        this.routes = routes;
        this.app = app;
        window.onload = () => this.render();
        window.onpopstate = () => this.render();
        window.navigateTo = (path) => this.navigateTo(path);
        this.init();
    }

    init() {
        onAuthStateChanged(this.app.auth, user => {
            if (user) {
                this.app.userLoggedIn = true;
                this.app.user = user;
                this.app.createUser();
                this.render();
                this.app.updateDOM();
            } else {
                this.app.userLoggedIn = false;
                this.app.user = undefined;
                this.app.updateDOM();
                this.navigateTo('#/');
            }
        });

        this.defaultPage = this.routes.find(r => r.path === location.hash) ? location.hash : this.defaultPage;
        this.navigateTo(this.defaultPage);
    }

    navigateTo(path) {
        window.history.pushState({}, path, path);
        this.render();
    }

    render() {
        const route = this.routes.find(route => route.path === location.hash);

        if (route === undefined) {
            this.root.innerHTML = ErrorPage();
        } else {
            if (!this.app.userLoggedIn && route.auth) {
                this.root.innerHTML = NotAuthenticated();
            } else {
                document.title = route.title;
                this.root.innerHTML = route.view();
                if (route.path == '#/') this.app.updateDOM();
            }
        }

        window.scrollTo(0, 0);
    }
}
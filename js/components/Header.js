import ProfileButton from './ProfileButton.js';
import LoginButton from './LoginButton.js';

import { app } from '../main.js';

export default function Header() {

    let button = app.userLoggedIn ? ProfileButton() : LoginButton();

    return /*html*/`
        <header class="header">
            <div class="header-content">
                <a href="#/" alt="Logo">My chat app</a>
                ${button}
            </div>
        </header>
    `;
}


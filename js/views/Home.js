import Header from '../components/Header.js';

import { app } from '../main.js';

export default function Home() {

    let _user = app.user;

    const title = _user === undefined ? 'Hello! Sign in to start chatting' : `Hello, ${_user.displayName}! You can now chat`;

    window.keyPress = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault();
            const input = document.querySelector('.message-input');
            if (input.value != "") {
                app.sendMessage();
                input.value = "";
            }
        }
    }

    app.loadChat();

    return /*html*/`
        ${Header()}
        <main>
            <h1>${title}</h1>
            <section class="chat-wrapper">
                <div class="chat-container">
                    <section class="messages"></section>
                </div>
                <form>
                    <input class="message-input" onsubmit="return false" id="message-input" type="text" autocomplete="off" placeholder="Send message" onkeypress="keyPress(event)">
                </form>
            </section>
        </main>
    `;
}
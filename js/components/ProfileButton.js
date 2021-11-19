import { app } from '../main.js';

export default function Header() {

    const _user = app.user;

    setTimeout(() => {
        const image = document.querySelector('.profile-button img');
        const dropdown = document.querySelector('.dropdown');
        image.addEventListener('click', () => {
            dropdown.classList.toggle('hide');
            document.querySelector('body').addEventListener('click', (event) => {
                if (event.target != dropdown && event.target != image) {
                    dropdown.classList.add('hide');
                }
            });
        });
    }, 0);

    window.changeUsername = () => {
        const dialog = document.createElement('div');

        dialog.classList.add('dialog-box');

        dialog.innerHTML = /*html*/`
            <h3>Change username</h3>
            <input id="new-name" type="text" placeholder="New username" autocomplete="off">
            <div>
                <button onclick="closeDialog()">Close</button>
                <button onclick="updateUser()">Save</button>
            </div>
        `;

        document.body.appendChild(dialog);
    }

    window.closeDialog = () => {
        const dialog = document.querySelector('.dialog-box');
        document.body.removeChild(dialog);
    }

    return /*html*/`
        <div class="profile-button">
            ${_user.displayName}
            <img src="${_user.photoURL}" alt="${_user.displayName}">
            <div class="dropdown hide">
                <div onclick="changeUsername()">Change username</div>
                <div onclick="logout()">Logout</div>
            </div>
        </div>
    `;
}




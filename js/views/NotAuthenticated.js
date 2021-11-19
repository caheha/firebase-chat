import Header from '../components/Header.js';

export default function ErrorPage() {

    document.title = "Not logged in";

    return /*html*/`
        ${Header()}
        <main>
            <h1>You aren't logged</h1>
        </main>
    `;
}
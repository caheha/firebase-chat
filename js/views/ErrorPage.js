import Header from '../components/Header.js';

export default function ErrorPage() {

    document.title = "An error occured";

    return /*html*/`
        ${Header()}
        <main>
            <h1>The page you requested doesn't exist :(</h1>
        </main>
    `;
}
import Header from '../components/Header.js';

export default function Home() {
    return /*html*/`
        ${Header()}
        <main>
            <h1>Another page</h1>
            <a href="#/">Go back</a>
        </main>
    `;
}
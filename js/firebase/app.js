import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, addDoc, getDoc, setDoc, query, orderBy, doc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { firebaseConfig } from './config.js';

export default class App {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();
        this.db = getFirestore();
        this.usersRef = collection(this.db, 'users');
        this.messagesRef = collection(this.db, 'messages');
        this.users;
        this.messages;
        this.user;
        this.userLoggedIn = false;
        this.init();
    }

    init() {

        window.login = () =>  this.login();
        window.logout = () => this.logout();

        window.sendMessage = () => this.sendMessage();
        window.updateUser = () => this.updateUser();

        onSnapshot(this.usersRef, snapshot => {
            this.users = snapshot.docs.map(doc => {
                const user = doc.data();
                user.id = doc.id;
                return user;
            });
        });

        this.updateDOM()        
    }

    updateDOM() {
        const q = query(this.messagesRef, orderBy('timestamp'));
        onSnapshot(q, snapshot => {
            this.messages = snapshot.docs.map(doc => {
                const message = doc.data();
                message.id = doc.id;
                return message;
            });
            this.appendMessages();
        });
    }

    async createUser() {
        const userRef = doc(this.usersRef, this.user.uid)
        const userDoc = await getDoc(userRef);
       
        if (!userDoc.exists()) {
            let newUser = {
                name: this.user.displayName,
                img: this.user.photoURL
            }
            await setDoc(userRef, newUser);
        }
    }

    async updateUser() {
        const userRef = doc(this.usersRef, this.user.uid)

        let updatedUser = {
            name: document.querySelector('#new-name').value,
            img: this.user.photoURL
        }
        
        await setDoc(userRef, updatedUser);
        this.updateDOM();
    }

    appendMessages() {
        const messageContainer = document.querySelector('.messages');
        messageContainer.innerHTML = "";
        
        let prevAuthor = {};

        for (const message of this.messages) {
            const author = this.users.find(user => user.id == message.sender);

            if (author == prevAuthor) {
                let messages = document.querySelectorAll('.message-text');
                messages[messages.length - 1].innerHTML += `<p>${message.content}</p>`;
            } else {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
    
                messageElement.innerHTML = /*html*/`
                        <div class="image">
                            <img src="${author.img}" alt="${author.name}">
                        </div>
                        <div class="name">${author.name}</div>
                        <div class="message-text"><p>${message.content}</p></div>
                `;
    
                prevAuthor = author;
    
                messageContainer.appendChild(messageElement);
            }
        }
        const container =  document.querySelector('.chat-container');
        container.scrollTop = container.scrollHeight;
    }

    sendMessage() {
        const input = document.querySelector('#message-input').value;

        let newMessage = {
            sender: this.user.uid,
            content: input,
            timestamp: Date.now()
        }

        addDoc(this.messagesRef, newMessage);
    }

    login() {
        signInWithPopup(this.auth, this.provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                this.user = result.user;
                this.userLoggedIn = true;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorCode, errorMessage, email, credential)
            });
    }

    logout() {
        signOut(this.auth)
            .then(() => {
                this.userLoggedIn = false;
            }).catch((error) => {
                console.log(error);
            });
    }
}

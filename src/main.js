import "../public/main.css"

import App from './App.vue'
import { createApp } from 'vue'
import liff from '@line/liff';

async function LiffInit() {
    await liff.init({
        liffId: '2006768109-BXdo0kr8'
    }).then(() => {
        if (!liff.isLoggedIn()) {
            console.log("123")
            liff.login({ redirectUri: "https://ffb0-122-117-106-162.ngrok-free.app/" });
        }
    }).catch((err) => {
        console.log(err.code, err.message);
    });
}

LiffInit().then(() => {
    console.log(liff.isLoggedIn())
    console.log(liff.getProfile().displayname)
    createApp(App).mount('#app');
});



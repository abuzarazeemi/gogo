import { applyPlugin, defineNuxtPlugin }from "#app";
import firebase from 'firebase';

export default defineNuxtPlugin(nuxtApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyApuwHAQD_4c61jsu5kDnt5Lntte_loOSE",
        
        authDomain: "gogonepal-eacf8.firebaseapp.com",
        
        projectId: "gogonepal-eacf8",
        
        storageBucket: "gogonepal-eacf8.appspot.com",
        
        messagingSenderId: "930859010697",
        
        appId: "1:930859010697:web:47215b71fa6e275e0d9458",
        
        measurementId: "G-5732VJPW68"
    }
      
      
    firebase.initializeApp(firebaseConfig);
})
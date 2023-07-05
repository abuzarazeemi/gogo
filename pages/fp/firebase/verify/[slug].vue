<template>
  <div class="container px-5 mx-auto mt-10 mb-5">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-124" style="width: 500px">
        <p class="mb-5 font-semibold md:text-2xl">Verification</p>
        <div>
           <span v-if="showRecaptcha == true">
            <div id="recaptcha-container"></div><br>
          </span>
           <ul class="text-xs text-gray-400">
            <li></li>
            <li>Please reCAPTCHA to get code </li>
          </ul>
            <input
              type="tel"
              v-model="code"
              placeholder="enter code"
              id="phone"
              class="block w-full px-2 py-2 mt-2 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
       
          <div class="w-full mt-2" v-if="settings">
            <button
              type="button"
              :style="{ 'background-color': settings.colors.primaryColor }"
              @click="verifyOTP"
              class="w-full px-10 py-2 text-center text-white rounded"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Download />
</template>
<script>
import axios from "axios";
import { VueTelInput } from 'vue-tel-input'
import Download from "@/components/Downloads.vue";
import { notify } from "@kyvg/vue3-notification";
import firebase from 'firebase'
import {useStorageStore} from '@/store/storage.js'
export default {
  name: "Login",
  components: {
    Download,
    VueTelInput,
  },
  head() {
    return {
      title: "GoGo app: Grocery,Vegetables, Food, Taxi Booking & Courier",
      meta: [
        {
          name: 'description',
          content: 'GoGo the best delivery app gets you Food, Grocery, Medicine, Pet Supplies, Fruits & Vegetables, Meat & Fish, Health & Wellness, Gifts and Send Packages from.'
        }
      ]
    }
  },
  data() {
    return {
      token: null,
      settings: null,
      base_url: this.store.baseUrl,
      code: null,
      appVerifier: null,
      showRecaptcha: true,
    };
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },

  mounted() {
    this.store.setLoading(true)
    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => {
        this.store.setLoading(false)
        this.settings = response.data;
      })
      .catch((error) => console.log(error));

      // this.signInWithPhoneNumber()
      // this.initReCaptcha()
      this.phoneSignIn()
  },

  methods: {
    randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$^*()";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    verifyOTP() {
      // const code = getCodeFromUserInput();
      //show loading screen
      window.confirmationResult.confirm(this.code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          user.getIdToken()
          .then( (result) => {
            let token = result;
            localStorage.setItem("fbtoken", token)
            let phone = JSON.parse(!process.server ? localStorage.getItem("phone") : null)
            axios
              .post(this.base_url + "api/otp/firebase/verify", {
                phone: phone,
                firebase_id_token: token,
              })
              .then((response) => {
                notify({
                  type: "success",
                  title: "Verification",
                  text: response.data.message,
                });
                this.$router.push("/reset/password/" + this.randomString(300));
              })
              .catch((error) => {
                console.log(error);
                notify({
                  type: "error",
                  title: "Verification",
                  text: error.response.data.message,
                });
              })
              .finally(() => this.store.setLoading(false));
            });

          // user.getIdToken().then((result) {

          //     token = result.token;
          // });
          // hide the loading screen now
          //redirect to home
          // ...
      }).catch((error) => {
          // hide the loading screen now
          // User couldn't sign in (bad verification code?)
          // ...
      });
    },
    verify() {
      let phone = JSON.parse(!process.server ? localStorage.getItem("phone") : null)
      // 245193
      this.store.setLoading(true)
      axios
        .post(this.base_url + "api/otp/firebase/verify", {
          phone: phone,
          firebase_id_token: this.token,
        })
        .then((response) => {
           console.log("otp", response)
          // console.log(this.settings)
          notify({
            type: "success",
            title: "Verification",
            text: response.data.message,
          });
        })
        .catch((error) => {
          console.log(error);
          notify({
            type: "error",
            title: "Verification",
            text: error.response.data.message,
          });
        })
        .finally(() => this.store.setLoading(false));
    },

    // signInWithPhoneNumber() {
    //   let phone = JSON.parse(localStorage.getItem("phone"))
    //   // 245193
    //   this.store.setLoading(true)
    //   let appVerifier = this.appVerifier
    //   firebase.auth().signInWithPhoneNumber(phone, appVerifier)
    //   .then(function(confirmationResult) {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //     vm.initReCaptcha()
    //     // ...
    //   }).catch(function(error) {
    //     // Error; SMS not sent
    //     // ...
    //   });
    // },

  //  initReCaptcha(){
  //   setTimeout(()=>{
  //     let vm = this
  //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  //       'size': 'invisible',
  //       'callback': function(response) {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         // ...
  //       },
  //       'expired-callback': function() {
  //         // Response expired. Ask user to solve reCAPTCHA again.
  //         // ...
  //       }
  //     });
  //     //
  //     this.appVerifier =  window.recaptchaVerifier
  //   })
  // },

    phoneSignIn(){
      if(this.showRecaptcha == true){
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        
        //user phone number
       let phone = JSON.parse(!process.server ? localStorage.getItem("phone") : null)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phone, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            this.showRecaptcha = false
            //  this.store.setLoading(false)
            //   notify({
            //     type: "success",
            //     title: "Register",
            //     text: "You have successfully registered. Please check your phone for OTP",
            //   });
            // this.$router.push("/firebase/verify/" + this.randomString(300));
          }).catch(function (error) {
            // Error; SMS not sent
            // ...
            console.log(error)
            notify({
              type: "error",
              title: "OTP",
              text: error,
            });
            // alert('Error ! SMS not sent')
        });
      }
    },

    
  },

  // created() {
  //   this.initReCaptcha()
  // }

};
</script>


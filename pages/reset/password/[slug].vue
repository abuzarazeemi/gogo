<template>
  <div class="container px-5 mx-auto mt-10 mb-5" v-if="settings">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-124">
        <p class="mb-5 font-semibold md:text-2xl">Forgot Password</p>
        <div>
        <div class="block mb-4">
          <span class="font-light text-gray-600">{{
            $t("profile.newPassword")
          }}</span>
          <input
            type="password"
            v-model="password"
            placeholder="********************"
            class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          />
        </div>
        <div class="block mb-4">
          <span class="font-light text-gray-600">{{
            $t("profile.confirmPassword")
          }}</span>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="********************"
            class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          />
        </div>
          <div class="w-full mt-8" v-if="settings">
            <button
              type="button"
              :style="{ 'background-color': settings.colors.primaryColor }"
              @click="resetPassword"
              class="w-full px-10 py-2 text-center text-white rounded"
            >
              Submit
            </button>
          </div>
          <div class="flex justify-center mt-8">
          <p class="text-sm text-gray-600">{{ $t('login.alreadyHaveAnAccount') }}</p>
          <router-link to="/login" class="ml-2 text-sm text-gray-600 cursor-pointer">{{ $t('nav.login') }}</router-link>
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
import {useStorageStore} from '@/store/storage.js';

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
      password: null,
      phoneNumber: null,
      phone: null,
      confirmPassword: null,
      settings: null,
      base_url: this.store.baseUrl,
      countryCode: null,
      bindProps: {
        mode: "international",
        defaultCountry: "NP",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        // placeholder: "Enter a phone number",
        required: false,
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "on",
        name: "telephone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: true
        }
      }
    };
  },

  setup() {
    const store = useStorageStore();
    return { store };
  },

  mounted() {
    this.store.setLoading(true)
    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => {
        this.store.setLoading(false)
        this.settings = response.data;
        // console.log(this.settings)
      })
      .catch((error) => console.log(error));
      // console.log(this.base_url)
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

    countryChanged(country) {
      this.country = country.iso2;
      this.code = country.dialCode;
    },

    resetPassword() {
        if(this.password == this.confirmPassword){
        let phone = JSON.parse(!process.server ? localStorage.getItem("phone") : null)
        
        let token = !process.server ? localStorage.getItem("fbtoken") : null
        let firebase_token
        if(token != null){
          firebase_token = token
        }
        
        this.store.setLoading(true)
        axios.post(this.base_url + "api/password/reset/init", {
            phone: phone,
            password: this.password,
            firebase_id_token: firebase_token
            
        })
        .then((response) => {
          !process.server ? localStorage.removeItem('fbtoken') : null
          !process.server ? localStorage.removeItem('phone') : null
          this.store.setLoading(false)
          notify({
              type: "success",
              title: "Forgot Password",
              text: response.data.message,
          });
          this.$router.push("/login");
        })
        .catch((error) => {
          notify({
              type: "error",
              title: "Forgot Password",
              text: error.response.data.message,
          });
        })
        .finally(() => this.store.setLoading(false));
        }else{
             notify({
                type: "error",
                title: "Reset Password",
                text: "Password does not match",
            });
        }
        
    },

  
    // countryChanged(country) {
    //   this.countryCode = country.dialCode;
    //   console.log(this.countryCode);
    // },
  },
};
</script>


<template>
  <div class="container px-5 mx-auto mt-10 mb-5" v-if="settings">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-112" style="width: 500px">
        <p class="mb-5 text-3xl font-semibold">{{ $t('nav.login') }}</p>
        <form>
          <div class="block w-full mb-4">
              <span class="font-light text-gray-600">{{ $t('login.email') }}</span>
              <input type="email" name="email" 
              placeholder="mail@example.com" 
              v-model="details.email" 
              id="email"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
          </div>
          <div class="block w-full mb-4">
              <span class="font-light text-gray-600">{{ $t('login.password') }}</span>
              <input type="password" placeholder="********************" 
              name="password" 
              v-model="details.password" 
              id="password"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
              <p v-if="showError" class="text-center text-red-500">{{ $t('login.error') }}</p>
          </div>
          <div class="w-full mt-8" v-if="settings">
            <button type="button" @click="login" class="w-full px-10 py-2 text-center text-white rounded" :style="{ 'background-color': settings.colors.primaryColor }">
               {{ $t('nav.login') }}
            </button>
          </div>
                <!-- focus:outline-none focus:shadow-outline-primary -->
        </form>
        <a href="/forgot-password" v-if="settings" class="flex justify-center mt-6 text-sm text-center text-gray-600 underline" :style="{ 'color': settings.colors.primaryColor }">{{ $t('login.forgotPassword') }}</a>
        <div class="flex justify-center mt-2">
          <p class="text-sm text-gray-600">{{ $t('login.dontHaveAnAccount') }}</p>
          <!-- <router-link to="/register" class="ml-2 text-sm text-gray-600 cursor-pointer hover:underline">{{ $t('login.SignUp') }}</router-link> -->
          <a href="/register" class="ml-2 text-sm text-gray-600 cursor-pointer hover:underline">{{ $t('login.SignUp') }}</a>
        </div>

      </div>
    </div>
  </div>
  <Download/>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from "vuex"
import Download from '@/components/Downloads.vue'
import { notify } from "@kyvg/vue3-notification"
import {useStorageStore} from '@/store/storage'

definePageMeta({
  layout: "default",
});

export default {
  name: "Login",
  components: {
    Download,
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
      details: {
        email: null,
        password: null
      },
      showError: false,
      settings: null,
      base_url: this.store.baseUrl,
    };
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },

  mounted() {
    // this.$store.commit("setErrors", {})

    this.store.setLoading(true)
    axios.get(this.base_url+'api/app/settings')
    .then((response) => {
      this.store.setLoading(false)
        this.settings = response.data
        // console.log(this.settings)
    })
    .catch(error => console.log(error))

  },

  methods: {
    randomString(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$^*()';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },

    login()
    {
      
      this.store.setLoading(true)
      if(this.terms == false)
      {

      }
      axios.post(this.base_url+'api/login',this.details)
      .then((response) => {

        if(this.settings.strings.otpGateway == "Firebase" && this.settings.strings.enableOTPLogin == '1') {
          !process.server ? localStorage.setItem("phone", JSON.stringify(response.data.user.phone)) : null;
          this.$router.push('/firebase/verify/'+ this.randomString(200))
        }else if(this.settings.strings.otpGateway != "None" && this.settings.strings.enableOTPLogin == '1') {
          !process.server ? localStorage.setItem("phone", JSON.stringify(response.data.user.phone)) : null;
          this.$router.push('/verify/'+ this.randomString(200))
        }else {
          !process.server ? localStorage.setItem("authToken", response.data.token) : null;
          !process.server ? localStorage.setItem("user",JSON.stringify(response.data.user)) : null;
          notify({
            type: "success",
            title: "Login",
            text: response.data.message,
          });
           window.location.href = "/"
        }
        
      })
      .catch((error) => {
        if (error.response) {
           notify({
            type: 'error',
            title: 'Account Error',
            text: error.response.data.message,
            duration: 3000
          })
        }
      })
      .finally(() =>this.store.setLoading(false))
    },
    
  }
};
</script>


<template>
  <div class="container px-5 mx-auto mt-10 mb-5" v-if="settings">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-124" style="width: 500px">
        <p class="mb-5 font-semibold md:text-2xl">Verification</p>
        <div>
            <input
              type="tel"
              v-model="code"
              placeholder="code"
              id="phone"
              class="block px-2 py-2 text-sm border border-gray-300 rounded md:w-full w-38 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          
          <div class="w-full mt-8" v-if="settings">
            <button
              type="button"
              :style="{ 'background-color': settings.colors.primaryColor }"
              @click="verify"
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
      code: null,
      settings: null,
      isLoggedIn: false,
      user: null,
      phone: JSON.parse(!process.server ? localStorage.getItem("phone") : null),
      base_url: this.store.baseUrl,
      countryCode: null,
    };
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },

  mounted() {
    console.log("runing <<<<<<<<<<");
    this.store.setLoading(true)
    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => {
        this.store.setLoading(false)
        this.settings = response.data;
        console.log(this.settings)
      })
      .catch((error) => console.log(error));

    axios
      .post(this.base_url + "api/otp/send/",
      {
        phone: this.phone,
      })
      .then((response) => {
        notify({
          type: "success",
          title: "Verification",
          text: response.data.message,
        });
      })
      .catch((error) => console.log(error));

    //   if (localStorage.getItem("authToken")) {
    //   this.isLoggedIn = true;
    //   this.user = JSON.parse(localStorage.getItem("user"));
    // }

    // if (this.isLoggedIn == false) {
    //   this.$router.push("/login");
    //   localStorage.removeItem("user");
    // //   localStorage.removeItem("authToken");
    // }
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

    verify() {
      this.store.setLoading(true)
      axios
        .post(this.base_url + "api/otp/verify", {
          phone: this.phone,
          code: this.code,
                // is_login: true
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
    },

    countryChanged(country) {
      this.countryCode = country.dialCode;
      console.log(this.countryCode);
    },
  },
};
</script>


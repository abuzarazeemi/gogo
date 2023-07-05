<template>
  <div class="container px-5 mx-auto mt-10 mb-5">
    <div
      class="md:p-5 p-3 mx-auto rounded shadow-lg sm:p-12 md:w-112" style="width:500px"
      v-if="settings"
    >
      <form @submit.prevent="submit">
        <p class="mb-5 text-3xl font-semibold">{{ $t("login.register") }}</p>

        <div class="block mb-4">
          <span class="font-light text-gray-600">{{ $t("login.name") }}</span>
          <input
            type="text"
            placeholder="John Doe"
            v-model="details.name"
            id="name"
            class="
              block
              w-full
              px-2
              py-2
              mt-1
              text-sm
              border border-gray-300
              rounded
              dark:border-gray-600 dark:bg-gray-700
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              form-input
            "
          />
        </div>
        <div class="block mb-4">
          <span class="font-light text-gray-600">{{ $t("login.email") }}</span>
          <input
            type="email"
            placeholder="mail@example.com"
            id="email"
            v-model="details.email"
            class="
              block
              w-full
              px-2
              py-2
              mt-1
              text-sm
              border border-gray-300
              rounded
              dark:border-gray-600 dark:bg-gray-700
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              form-input
            "
          />
        </div>

        <div class="block mb-4">
          <span class="font-light text-gray-600">{{ $t("login.phone") }}</span>

            <vue-tel-input
              v-model="details.phone"
              mode="international"
              :enableCountryCode="true"
              :defaultCountry="'np'"
              :autoFormat="false"
              :inputOptions="{ showDialCode: true, placeholder: '5555555555' }"
              v-on:country-changed="countryChanged"
            ></vue-tel-input>
          
          <ul class="text-xs text-gray-400">
            <li></li>
            <li>Phone number has to be atleast 10 digits</li>
            <!-- <li class="text-sm text-red-500" v-if="errors.details.phone">{{ errors.details.phone }}</li> -->
            <!-- <li class="text-sm text-red-500" v-if="errors.details.email">{{ errors.details.email }}</li> -->
            <!-- <li>
              No need to retype country code in the phone field, since its
              autopopulated
            </li> -->
            <!-- <li>Please ignore any 0 at the begining of a phone number</li> -->
            <li>Please enter the right format for phone number</li>
          </ul>
        </div>
        <div class="block mb-4">
          <span class="font-light text-gray-600">{{
            $t("login.password")
          }}</span>
          <input
            type="password"
            v-model="details.password"
            @click="phoneChange"
            placeholder="********************"
            id="password"
            class="
              block
              w-full
              px-2
              py-2
              mt-1
              text-sm
              border border-gray-300
              rounded
              dark:border-gray-600 dark:bg-gray-700
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:text-gray-300 dark:focus:shadow-outline-gray
              form-input
            "
          />
          <!-- <p v-if="setErrors" class="text-center text-red-400" id="error"></p> -->
        </div>
        <div id="recaptcha-container"></div><br>
        <label class="flex">
          <div
            class="
              relative
              flex
              items-center
              w-4
              h-4
              mr-1
              bg-white
              border-2 border-gray-400
              rounded
            "
          >
            <input
              type="checkbox"
              value="agree"
              v-model="checked"
              class="absolute opacity-0"
            />
            <svg
              class="
                hidden
                w-4
                h-4
                text-green-500
                pointer-events-none
                fill-current
              "
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </div>
          <a
            target="__blank"
            :href="`${this.store.baseUrl}pages/terms`"
            class="text-sm font-light"
            >{{ $t("footer.sub3") }}</a
          >
        </label>
        <div class="mt-5" v-if="!checked">
          <div
            class="w-full px-10 py-2 text-center text-white bg-gray-300 rounded"
          >
            {{ $t("login.register") }}
          </div>
        </div>
        <div class="mt-5" v-else>
          <button
            @click="register"
            id="sign-in-button"
            class="w-full px-10 py-2 text-center text-white rounded"
            :style="{ 'background-color': settings.colors.primaryColor }"
          >
            Register
          </button>
        </div>
        <!-- focus:outline-none focus:shadow-outline-primary -->
      </form>
      <div class="flex justify-center mt-8">
        <p class="text-sm text-gray-600">
          {{ $t("login.alreadyHaveAnAccount") }}
        </p>
        <router-link
          to="/login"
          class="ml-2 text-sm text-gray-600 cursor-pointer"
          >{{ $t("nav.login") }}</router-link
        >
      </div>
    </div>
  </div>
  <Download />
</template>
<script>
import axios from "axios";
import Download from "@/components/Downloads.vue";
import { VueTelInput } from "vue-tel-input";
import { notify } from "@kyvg/vue3-notification";
import firebase from 'firebase'
import {useStorageStore} from '@/store/storage'
definePageMeta({
  layout: "default",
});
export default {
  name: "Home",
  components: {
    VueTelInput,
    Download,
    firebase
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
  data: function () {
    return {
      phone: "",
      details: {
        name: null,
        email: null,
        password: null,
        phone: null,
        country_code: null,
      },
      checked: false,
      settings: null,
      base_url: this.store.baseUrl,
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
          disabledDialCode: false,
        },
        inputOptions: {
          showDialCode: true,
        },
      },
      phoneNumber : '',
    };
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  mounted() {
    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => {
        this.settings = response.data;
        // console.log(this.settings)
      })
      .catch((error) => console.log(error));

      // if(this.details.phone != null){
      //   const withoutLeading0 = +this.details.phone.replace(/^0+/, "");
      //   console.log(withoutLeading0);
      // }
  },

  methods: {
    countryChanged(country) {
      this.country = country.iso2;
      this.code = country.dialCode;
    },

    phoneChange() {
      let withoutLeading0 = this.details.phone.replace(/^0+/, "");
      this.details.phone = withoutLeading0;
    },

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

    async register() {
      if (this.checked) {

        this.phoneNumber = '+'+this.code+this.details.phone;
        this.details.country_code = this.country;
        this.details.phone = this.phoneNumber;
        await axios
          .post(this.base_url + "api/register", this.details)
          .then((response) => {
            
            // console.log(response)
            // if (response.data.status == "success") {
            //   this.$store.commit("setUser", response.data.user);
            //   this.$store.commit("setToken", response.data.token);
            //   this.$store.commit("setUserId", response.data.user.id);
            //   this.$store.commit("setUserName", response.data.user.name);
            //   this.$store.commit("setUserEmail", response.data.user.email);
            //   this.$store.commit("setUserPhone", response.data.user.phone);
            //   this.$store.commit("setUserCountry", response.data.user.country);
            //   this.$store.commit("setUserCountryCode", response.data.user.country_code);
            //   this.$store.commit("setUserImage", response.data.user.image);
            //   this.$store.commit("setUserRole", response.data.user.role);
            //   this.$store.commit("setUserStatus", response.data.user.status);
            //   this.$store.commit("setUserCreatedAt", response.data.user.created_at);
            //   this.$store.commit("setUserUpdatedAt", response.data.user.updated_at);
            //   this.$store.commit("setUserBalance", response.data.user.balance);
            //   this.$store.commit("setUserReferralCode", response.data.user.referral_code);
            //   this.$store.commit("setUserReferralCount", response.data.user.referral_count);
            //   this.$store.commit("setUserReferralEarnings", response.data.user.referral_earnings);
            //   this.$store.commit("setUserReferralEarningsCount", response.data.user.referral_earnings_count);
            //   this.$store.commit("setUserReferralEarningsTotal", response.data.user.referral_earnings_total);
            //   this.$store.commit("setUserReferralEarningsTotalCount", response.data.user.referral_earnings_total_count);
            //   this.$store.commit("setUserReferralEarningsTotalAmount", response.data.user.referral_)
            // }
            !process.server ? localStorage.setItem("phone", JSON.stringify(this.phoneNumber)) : null;

            if ( this.settings.strings.enble_otp == "1" && this.settings.strings.otpGateway == "Firebase") {
              notify({
                type: "success",
                title: "Register",
                text: "You have successfully registered. You'll be redirected automatically",
              });
              !process.server ? localStorage.setItem("phone", JSON.stringify(this.phoneNumber)) : null;
              this.$router.push("/firebase/verify/" + this.randomString(300));

            }else if (this.settings.strings.enble_otp == "1" &&this.settings.strings.otpGateway != "None") {
              notify({
                type: "success",
                title: "Register",
                text: "You have successfully registered. Please check your phone for OTP",
              });
              !process.server ? localStorage.setItem("phone",JSON.stringify(this.phoneNumber)) : null;
              this.$router.push("/verify/" + this.randomString(300));
            } else {
              notify({
                type: "success",
                title: "Register",
                text: response.data.message,
              });
              !process.server ? localStorage.setItem("authToken", response.data.token) : null;
              !process.server ? localStorage.setItem("user", JSON.stringify(response.data.user)) : null;
              window.location.href = "/";
            }
          })
          .catch((error) => {
            if (error.response) {
              notify({
                type: "error",
                title: "Account Error",
                text: error.response.data.message,
                duration: 3000,
              });
            }
          });
      } else {
        notify({
          type: "error",
          title: "Error",
          message: "Please agree to the terms and conditions",
          duration: 3000,
        });
      }
    },

  },
};
</script>


<!-- this.store.setLoading(true)
              window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
              
              //user phone number
              console.log(this.phoneNumber)
              localStorage.setItem("phone", JSON.stringify(this.phoneNumber));
              const appVerifier = window.recaptchaVerifier;

              firebase.auth().signInWithPhoneNumber(this.phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).

                  window.confirmationResult = confirmationResult;
                  localStorage.setItem("confirmation", JSON.stringify(window.confirmationResult));
                   this.store.setLoading(false)
                    notify({
                      type: "success",
                      title: "Register",
                      text: "You have successfully registered. Please check your phone for OTP",
                    });
                  this.$router.push("/firebase/verify/" + this.randomString(300));
                }).catch(function (error) {
                  // Error; SMS not sent
                  // ...
                  console.log(error)
                  notify({
                    type: "success",
                    title: "Register",
                    text: "SMS not sent",
                  });
                  // alert('Error ! SMS not sent')
              }); -->
import { defineNuxtPlugin } from "#app";
import Notifications from "@kyvg/vue3-notification";
import "@/registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import i18n from "./i18n.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .use(VueAxios, axios)
    .use(i18n)
    .use(Notifications)
    .use(VueSweetalert2)
    .use(VueTelInput)
    .use(VueGoogleMaps, {
      load: {
        // key: "AIzaSyCpC_EvzUOBP8LxwaEU75dtoP8_hIIfPlM",
        // ket: "AIzaSyAxeJ9nWeJjc3uQuLnvKeCD-lDMQHVaVm0",
        key: !process.server ? localStorage.getItem("mapApiKey") : null,
        libraries: "places", // This is required if you use the Autocomplete plugin
      },
      installComponents: true,
    });
});

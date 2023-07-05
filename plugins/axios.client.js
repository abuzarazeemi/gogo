import { defineNuxtPlugin }from "#app";
import axios from 'axios'
import VueAxios from 'vue-axios'
import {useStorageStore} from '@/store/storage.js'



export default defineNuxtPlugin(nuxtApp => {
    const store = !process.server ? useStorageStore() : null;
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        if (config.showLoader) {
          !process.server ? store.setLoading(true) : null
        }
        return config;
      }, function (error) {
        // Do something with request error
        if (error.config.showLoader) {
            !process.server ? store.setLoading(false) : null
        }
        return Promise.reject(error);
      });
      
      // Add a response interceptor
      axios.interceptors.response.use(function (response) {
        // Do something with response data
        
        if (response.config.showLoader) {
            !process.server ? store.setLoading(true) : null
        }
        return response;
      }, function (error) {
      
        if (error.config.showLoader) {
            !process.server ? store.setLoading(false) : null
        }
        // Do something with response error
        return Promise.reject(error);
      });
    // nuxtApp.vueApp
})
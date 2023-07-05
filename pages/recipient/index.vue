<template>
   <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
        <div class="">
            <div class="max-w-xl mx-auto mt-5 overflow-hidden shadow sm:rounded-md">
                
                  <div class="">
                      
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <p class="mb-1 text-3xl font-extrabold">{{ $t('parcel.recipients') }}</p>
                        <p class="mb-5 text-xs font-light text-gray-500">{{ $t('parcel.recipientInfo') }}</p>
                    
                        <div class="flex flex-col" v-if="from">
                          <p>{{ $t('parcel.contactInfo') }}({{ from.name }})</p>
                          <div class="mb-3">
                              <label for="name" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                                <UserIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                                <span>{{ $t('login.name') }} <span class="text-red-500">*</span></span>
                              </label>
                              <input type="text" name="name" v-model="fullname" placeholder="John Doe" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                          </div>
                          <div class="mb-3">
                              <label for="phone" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                              <PhoneIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                                <span>{{ $t('login.phone') }} <span class="text-red-500">*</span></span>
                              </label>
                            <input type="tel" name="phone" v-model="phone" id="phone" placeholder="08000000000" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                          </div>
                          <div class="">
                            <label for="note" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                                <AnnotationIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                                <span>{{ $t('parcel.notes') }}</span>
                            </label>
                            <textarea id="about" name="about" v-model="note" rows="3" class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com" />
                          </div>
                          <!-- <p class="my-2 text-xs text-gray-500">By confirming I accept this order doesn’t contain illegal/resticted items, if illegal/restricted items are found by Dunzo Partner, they may report it to the law enforcement authorities. Terms and Conditions</p> -->
                        </div>
                        
                        <div class="flex flex-col mt-5" v-if="to">
                          <p>{{ $t('parcel.contactInfo') }} ({{ to.name }})</p>
                          <div class="mb-3">
                              <label for="name" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                                <UserIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                                <span>{{ $t('login.name') }} <span class="text-red-500">*</span></span>
                              </label>
                              <input type="text" name="name" v-model="fullname1" placeholder="John Doe" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                          </div>
                          <div class="mb-3">
                              <label for="phone" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                              <PhoneIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                                <span>{{ $t('login.phone') }} <span class="text-red-500">*</span></span>
                              </label>
                            <input type="tel" name="phone" v-model="phone1" id="phone" placeholder="08000000000" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                          </div>
                          <div class="">
                            <label for="note" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                                <AnnotationIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                                <span>{{ $t('parcel.notes') }}</span>
                            </label>
                            <textarea id="about" name="about" v-model="note1" rows="3" class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com" />
                          </div>
                          <p class="my-2 text-xs text-gray-500" v-if="setting">{{ $t('parcel.disclaimer') }} {{ setting.app_name }} {{ $t('parcel.disclaimer2') }}</p>
                        </div>
                    </div>
                    <div class="px-4 py-3 text-right bg-gray-50 sm:px-6" v-if="this.fullname != null && this.phone && this.fullname1 && this.phone1">
                      <Navigation></Navigation>
                    </div>
                    <div class="flex justify-between px-4 py-3 text-right bg-gray-50 sm:px-6" v-else>
                      <a href="/parcel-order" class="px-4 py-2 text-white uppercase bg-green-500 rounded">previous</a>
                      <div class="px-4 py-2 mr-5 text-white uppercase bg-gray-200 border border-gray-300 rounded">Next</div>
                    </div>
                  </div>
                <!-- </form> -->
            </div>
            
        </div>
    </div>
    <Download/>
</template>
<script>
import axios from "axios";
import { UserIcon, PhoneIcon, AnnotationIcon } from '@heroicons/vue/outline'
import Navigation from '@/components/parcel/Navigation.vue'
import Download from '@/components/Downloads.vue'
import {useStorageStore} from '@/store/storage.js';

export default {
    components: {
        UserIcon,
        PhoneIcon,
        AnnotationIcon,
        Download,
        Navigation
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
     data () {
        return {
          from: null,
          to: null,
          isLoggedIn: false,
          fullname: null,
          phone: null,
          note: null,
          fullname1: null,
          phone1: null,
          note1: null,
          AuthStr: "",
          base_url : this.store.baseUrl,
          // setting: this.$store.state.settings,
          setting: null,
        }
    },
    setup() {
    const store = useStorageStore();
    return { store };
  },
    mounted() {
      this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`
      let fromId = !process.server ? localStorage.getItem('from') : null
      let toId = !process.server ? localStorage.getItem('to') : null

      axios.get(this.base_url+'api/delivery/addresses/'+ fromId, 
        { headers: { Authorization: this.AuthStr }})
        .then((response) => {
            this.from = response.data.data
        })
        .catch(error => console.log(error))


        axios.get(this.base_url+'api/app/settings')
        .then( (response) => {
            this.setting = response.data.strings;
        })

        axios.get(this.base_url+'api/delivery/addresses/'+ toId, 
        { headers: { Authorization: this.AuthStr }})
        .then((response) => {
            this.to = response.data.data
        })
        .catch(error => console.log(error))

      if (!process.server ? localStorage.getItem("authToken") : null) {
        this.isLoggedIn = true;
        this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null)
        }

      if(this.isLoggedIn == false) {
            this.$router.push("/login");
      }

      if (localStorage.fullname) {
        this.fullname = localStorage.fullname;
      }

      if (localStorage.phone) {
        this.phone = localStorage.phone;
      }
      if (localStorage.fullname1) {
        this.fullname1 = localStorage.fullname1;
      }

      if (localStorage.phone1) {
        this.phone1 = localStorage.phone1;
      }

      if (localStorage.note) {
        this.note = localStorage.note;
      }

      if (localStorage.fullname1) {
        this.fullname1 = localStorage.fullname1;
      }

      if (localStorage.phone1) {
        this.phone1 = localStorage.phone1;
      }

      if (localStorage.note1) {
        this.note1 = localStorage.note1;
      }
    },

    watch: {
      fullname(newFullName) {
        localStorage.fullname = newFullName;
      },

      phone(newPhone) {
        localStorage.phone = newPhone;
      },
      
      note(newNote) {
        localStorage.note = newNote;
      },

      fullname1(newFullName1) {
        localStorage.fullname1 = newFullName1;
      },

      phone1(newPhone1) {
        localStorage.phone1 = newPhone1;
      },
      
      note1(newNote1) {
        localStorage.note1 = newNote1;
      }
    },

}
</script>
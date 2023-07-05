
<template>
<!-- max-w-7xl -->
<!-- v-slot="{ open  = !open}" -->
  <Disclosure v-if="settings" as="nav" class="sticky inset-x-0 bottom-0 z-50 w-full h-12 shadow-sm" :style="{ 'background-color': settings.colors.primaryColor }">
    <div class="container max-w-6xl px-5 pt-2 pb-3 mx-auto">
        <div class="relative flex items-center justify-between">
            
            
             <a href="/cart" class="relative flex inline-block px-2 py-2 font-semibold md:mr-4 md:px-2 md:py-2 md:text-xl">
              <ShoppingCartIcon class="self-center w-5 h-5 font-thin text-white" aria-hidden="true" />
              <!-- <ShoppingCartIcon class="w-4 h-4 text-black md:w-6 md:h-6" aria-hidden="true" /> -->
              <span class="absolute inline-flex items-center justify-center px-1 text-xs font-light leading-none text-white transform translate-x-1/2 -translate-y-1/2 rounded-full" :style="{ 'background-color': settings.colors.accentColor }">{{ cartItemCount }}</span>
              <!-- <span class="hidden px-1 font-semibold text-white md:block font-eina text-smaller">Cart</span> -->
            </a>
                <!-- <div class="absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> -->
            <!-- <div class="flex hidden lg:mr-6 md:block"> -->
              <a href="/search" class="p-2 text-white hover:text-gray-500">
                <span class="sr-only">Search</span>
                <SearchIcon class="w-5 h-5 font-thin" aria-hidden="true" />
              </a>
            <!-- </div> -->
            
            <a href="/" class="relative flex inline-block px-2 py-2 font-light md:mr-4 md:px-2 md:py-2 md:text-xl">
                <HomeIcon class="self-center w-5 h-5 font-thin text-white" aria-hidden="true" />
            </a>
           
            
                <!-- Mobile menu button-->
            <!-- <div class=" sm:hidden">
                <DisclosureButton class="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span class="sr-only">Open main menu</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                        <path v-if="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        <path v-if="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </DisclosureButton>
            </div> -->
            
            <!-- </div> -->
        </div>
        <DisclosurePanel class=" sm:hidden">
            <div class="px-1 pt-2 pb-3">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'text-sm text-green-500' : 'text-white', 'block px-3 text-sm py-2 rounded-md font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                <span v-if="this.$route.name == 'Home'">
                <a href="#services" class="block px-2 py-2 font-semibold text-white font-eina text-smaller">Services</a> 
              </span>
            </div>
        </DisclosurePanel>
    </div>
   
</Disclosure>
        
        


</template>

<script>
import axios from 'axios'
import { mapActions } from "vuex";
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MenuIcon, XIcon, UserCircleIcon, ShoppingBagIcon } from '@heroicons/vue/outline'
import { ShoppingCartIcon, HomeIcon, SearchIcon } from '@heroicons/vue/solid'

import {useStorageStore} from '@/store/storage'
// const store = useStorageStore()


const navigation = [
  { name: 'Home', href: '/', current: false},
  { name: 'Vendors', href: '/vendors', current: false },
  // { name: 'Services', href: '#services', current: false }
]

export default {
  data () {
    return {
        isLoggedIn: false,
        user: null,
        settings: null,
        showModal: false,
        search: null,
        products: null,
        currency: null,
        base_url: this.store.baseUrl,
    }
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ShoppingCartIcon,
    SearchIcon,
    // BellIcon,
    ShoppingBagIcon,
    MenuIcon,
    UserCircleIcon,
    HomeIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)
    const store = useStorageStore();
    return {
      navigation,
      open,
      store
    }
  },

  mounted() {
    
    this.store.setLoading(true)
    axios.get(this.base_url+'api/app/settings')
    .then((response) => {
      this.store.setLoading(false)
      this.settings = response.data
      // console.log(this.settings)
    })
    .catch(error => console.log(error))

    if (!process.server ? localStorage.getItem("authToken") : null) {
      this.isLoggedIn = true;
      this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null)
    }
  },

  computed: {
    cartItemCount() {
      return this.store.count;
    }
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),

    logout() {
      !process.server ? localStorage.removeItem('authToken') : null
      !process.server ? localStorage.removeItem('user') : null
      this.$router.push("/");
      window.location.href = "/login";
    },

    toggleModal: function(){
      this.showModal = !this.showModal;
    },

    sanitizeTitle(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');
      
      return slug;
    },

    getCurrency() {
      let base_url = this.store.baseUrl;
        let setting;
        axios.get(base_url+'api/app/settings')
        .then( (response) => {
            setting = response.data;
            this.currency = setting.strings.currency
        })
        return this.currency;
    },
    
    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },

    getSearchResult()
    {
      let base_url = this.store.baseUrl
      this.store.setLoading(true)
      axios.get(base_url+'api/search?keyword='+this.search)
        .then((response) => {
          // console.log(response)
          this.store.setLoading(false)
          let search
          search = response.data.products.data
          this.products = search
        })
        .catch(error => console.log(error))
    }
    
  },
};
</script>
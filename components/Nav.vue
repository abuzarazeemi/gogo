
<template>
<!-- max-w-7xl -->
 <!-- :style="{ 'background-color': settings.colors.primaryColor }" -->
  <Disclosure v-if="settings" as="nav" class="sticky inset-x-0 top-0 z-50 w-full text-black bg-white shadow">
    <div class="container px-5 mx-auto max-w-7xl">
      <div class="flex items-center justify-between h-12 md:h-16">
        <div class="flex items-center flex-shrink-0 " v-if="settings" >
          <a href="/">
            <img src="@/assets/images/Asset_1.png" class="vuemastery-logo-white" data-v-3ffe7e8c="">
          </a>
        </div>
         <div class="flex items-center justify-center ">
            
            <div class="content-center hidden px-5 py-3 rounded-md sm:block sm:ml-6">
              <div class="flex content-center justify-center float-right space-x-4">
              </div>
            </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="hidden md:mx-2 md:block" v-if="this.$route.name == 'Home'">
                <a href="/search" class="p-2 text-white">
                  <span class="sr-only">Search</span>
                  <SearchIcon class="flex justify-center w-5 h-5 text-white" aria-hidden="true" />
                </a>
              </div>
              <span class="">
                <!-- <img :src="`/img/en.png`" class="w-8 h-8"> -->
                <select style="background: #fff; outline: 2px solid #2f9e4f" v-model="$i18n.locale" class=" px-3 py-2 -m-2 text-black bg-gray-100 rounded-full md:mx-2">
                  <option v-for="(lang, i) in $i18n.availableLocales" class=" bg-transparent" :key="`Lang${i}`" :value="lang">
                    
                    <span>{{ lang }}</span>
                  </option>
                </select>
              </span>
              <span class="hidden px-3 py-2 -m-2 text-white rounded-full md:mx-2 md:block" :style="{ 'background-color': settings.colors.primaryColor }">
                <a href="/cart" class="">
                  <span class="flex space-x-2">
                    <ShoppingCartIcon class="self-center w-5 h-5 text-white" aria-hidden="true" />
                    <span class="text-sm text-white">{{ cartItemCount }}</span>
                  </span>
                </a>
              </span>
              <span v-show="!isLoggedIn" class="flex mx-2">
                <a href="/login" class="px-2 py-1 font-medium text-black bg-gray-100 rounded-full md:px-3 md:py-2" style="background: #fff; outline: 2px solid #2f9e4f">
                  {{ $t('nav.login') }}
                  <!-- <UserCircleIcon class="self-center w-5 h-5 text-black" aria-hidden="true" /> -->
                </a>
              </span>
              
              <!-- Profile dropdown -->
              <Menu as="div" class="relative p-2" v-show="isLoggedIn">
                <div class="flex space-x-2">
                  <MenuButton class="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-black">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-6 h-6 rounded-full" v-if="user" v-bind:src="user.photo" alt="user photo" />
                    
                  </MenuButton>
                </div>
                <transition enter-active-class="transition duration-100 ease-out" 
                  enter-from-class="transform scale-95 opacity-0" 
                  enter-to-class="transform scale-100 opacity-100" 
                  leave-active-class="transition duration-75 ease-in" 
                  leave-from-class="transform scale-100 opacity-100" 
                  leave-to-class="transform scale-95 opacity-0">
                  <MenuItems class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                      <a href="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">My Profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="/orders" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Orders</a>
                    </MenuItem>
                    <!-- <MenuItem v-slot="{ active }">
                      <a href="/wallet" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Wallet</a>
                    </MenuItem> -->
                    <MenuItem v-slot="{ active }">
                      <a href="#" @click="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Sign out</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            
              
            
            <!-- </span> -->
        </div>
      </div>
      <DisclosurePanel class="sm:hidden">
          <div class="px-1 pt-2 pb-3 space-y-1">
            <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'text-sm text-green-500' : 'text-primary hover:text-black', 'block px-3 text-sm py-2 rounded-md font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
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
import { MenuIcon, XIcon, UserCircleIcon, ShoppingBagIcon, SearchIcon } from '@heroicons/vue/outline'
import { ShoppingCartIcon } from '@heroicons/vue/solid'

import {useStorageStore} from '@/store/storage'
// const store = useStorageStore()


const navigation = [
  { name: 'Home', href: '/', current: false},
  { name: 'Vendors', href: '/vendors', current: false },
  // { name: 'Pharmacy', href: '/pharmacies', current: false }
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
        langs: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh'], 
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
    MenuIcon,
    UserCircleIcon,
    ShoppingBagIcon,
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
      let mapKey = this.settings.strings.google_maps_key
      !process.server ? localStorage.setItem('mapApiKey', mapKey) : null
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
      !process.server ? localStorage.removeItem('phone') : null
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

    
    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },

    // getSearchResult()
    // {
    //   let base_url = this.$store.state.baseUrl
    //   this.$store.commit('loading', true)
    //   axios.get(base_url+'api/search?keyword='+this.search)
    //     .then((response) => {
    //       this.$store.commit('loading', false)
    //       let search
    //       search = response.data.products.data
    //       this.products = search
    //     })
    //     .catch(error => console.log(error))
    // }
    
  },
};
</script>

<style scoped>
nav {
  background-color: #fff;
}
</style>
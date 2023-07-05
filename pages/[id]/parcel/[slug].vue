<template>
  <div class="checkout " v-show="isLoggedIn">
    <div class="max-w-full  md:h-56" v-if="settings" :style="{ 'background-color': settings.colors.primaryColor }">
      <div class="mx-auto container flex flex-row md:max-w-6xl">
        <!-- <p class="text-3xl font-semibold md:text-6xl">Coming Soon</p>
        <p class="pt-3">Sorry for the inconvenience</p>
        <a class="underline" href="/">Home</a> -->
        <div class="p-3 md:p-0 w-full flex flex-col justify-center">
           <p class="pb-2 font-sans text-xl text-white md:text-4xl font-bold md:mt-3 md:w-120">
            {{ $t('parcel.header') }}
          </p>
          <p class="mb-5 text-white text-sm md:text-xl font-extralight">{{ $t('parcel.subHeader') }}</p>
          <a href="/parcel-order" v-if="settings" class="px-3 text-center w-32 py-2 text-sm font-black text-white rounded-lg shadow-sm" :style="{ 'background-color': settings.colors.accentColor }">{{ $t('parcel.orderNow') }}</a>
        </div>
         <div class="w-full md:block hidden">
           <div class=" flex justify-end">
              <img src="/img/delivery-man.png" class=" md:w-56 md:h-56" alt="">
           </div>
           
         </div>
        <!-- <img src="/img/parcel.jpg" class="h-60" alt=""> -->
      </div>
    </div>
    <div class="container max-w-6xl p-5 mx-auto">
        <p class="mt-5 text-2xl font-medium text-center">{{ $t('parcel.trackPackage') }}</p>
        <!-- <div class="flex items-center" v-if="settings">
          <a href="/parcel-order" class="flex items-center h-8 p-5 text-center text-white rounded-md shadow-md" :style="{ 'background-color': settings.colors.primaryColor }">Parcel Delivery</a>
        </div> -->
        
      
      <div class="flex p-3 mt-2 bg-white rounded-md shadow">
          <!-- <span class="flex items-center justify-end w-auto p-2 text-gray-500">
              <SearchIcon class="self-center w-6 h-6 text-gray-200 md:w-6 md:h-6" aria-hidden="true" />
          </span> -->
          <input class="w-full p-2 border-white" v-model="search" type="text" placeholder="search by code">
          <div @click="some" class="flex items-center p-2 pl-4 pr-4 cursor-pointer">
              <SearchIcon class="self-center w-6 h-6 font-black text-black md:w-6 md:h-6" aria-hidden="true" />
          </div>
      </div>
      <div class="container flex flex-col py-5">
        <p class="text-sm font-light">{{ $t('parcel.recentOrders') }}</p>
        <a :href="$router.resolve({name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(`${order.code}`) }}).href" class="w-full p-5 my-5 rounded-lg shadow-md " v-for="order in orders" :key="order.id">
          <div class="flex justify-between pb-2 border-b">
            <p class="text-sm font-semibold">{{ order.code }}</p>
            <p class="text-sm font-light">{{ currency }}{{ order.total }}</p>
          </div>
          <div class="flex justify-between">
            <div class="my-2">
              <p class="text-sm font-semibold">{{ order.vendor.name }}</p>
              <p class="text-sm font-light" v-if="order.package_type">{{ order.package_type.name }}</p>
            </div>
            <div class="my-2">
              <p class="text-sm font-semibold">{{ order.formatted_date }}</p>
              <p class="text-sm font-light">{{ order.payment_method.name }}</p>
            </div>
            <div class="my-2">
              <p class="mb-2 text-sm font-semibold">{{ order.status }}</p>
              <!-- <a :href="$router.resolve({name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(`${order.code}`) }}).href" v-if="settings" class="px-3 py-2 text-sm font-black text-white rounded-lg shadow-sm" :style="{ 'background-color': settings.colors.accentColor }"> -->
              <a :href="`/OrderDetails/${order.id}/${sanitizeTitle(order.code)}`" v-if="settings" class="px-3 py-2 text-sm font-black text-white rounded-lg shadow-sm" :style="{ 'background-color': settings.colors.accentColor }">
                View</a>
            </div>
            
          </div>
        </a>
      </div>
    </div>
  </div>
  <Download/> 
</template>

<script>
import axios from 'axios'
import { CreditCardIcon, SearchIcon } from '@heroicons/vue/outline'
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Download from '@/components/Downloads.vue'
import {useStorageStore} from '@/store/storage.js'
export default {
  name: 'checkout',
  components: {
    CreditCardIcon,
    SearchIcon,
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
  data () {
    return {
        isLoggedIn: false,
        user: null,
        note: null,
        addresses: null,
        methods: null,
        vendor_pickup: false,
        AuthStr : "",
        paymentMethod: null,
        address: null,
        settings: null,
        base_url: this.store.baseUrl,
        search: null,
        settings: null,
        orders: null,
        currency: null
    }
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },

    mounted () {

      this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`

      axios
      .get(this.base_url + "api/orders?vendor_type_id=" +this.$route.params.id,
       { headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
          this.orders = response.data.data
      })
      .catch((error) => console.log(error));

        axios.get(this.base_url+'api/app/settings')
        .then((response) => {
          this.settings = response.data
          this.currency = this.settings.strings.currency;
        })
        .catch(error => console.log(error))

        axios.get(this.base_url+'api/payment/methods', { 
            'headers': { 'Authorization': this.AuthStr } })
        .then(response => (this.methods = response.data.data))
        .catch(error => console.log(error))

        axios.get(this.base_url+'api/delivery/addresses', 
        { 'headers': { 'Authorization': this.AuthStr } }
            )
        .then(response => (this.addresses = response.data.data))
        .catch(error => console.log(error))
        

        if (!process.server ? localStorage.getItem("authToken") : null) {
            this.isLoggedIn = true;
            this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null)
        }

        if(this.isLoggedIn == false) {
            // this.$router.push("/login");
            window.location.href = "/login";
            !process.server ? localStorage.removeItem("user") : null
            !process.server ? localStorage.removeItem("authToken") : null
        }
    },

    methods: {
      sanitizeTitle(title) {
        var slug = "";
        // Change to lower case
        var titleLower = title.toLowerCase();
        // Letter "e"
        slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
        // Letter "a"
        slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
        // Letter "o"
        slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
        // Letter "u"
        slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
        // Letter "d"
        slug = slug.replace(/đ/gi, "d");
        // Trim the last whitespace
        slug = slug.replace(/\s*$/g, "");
        // Change whitespace to "-"
        slug = slug.replace(/\s+/g, "-");

        return slug;
      },
    }
    
}
</script>

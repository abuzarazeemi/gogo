<template>
  <div class="checkout" v-show="isLoggedIn">
    <section class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="methods">
        <div class="flex flex-col">
            <div class="grid gap-4 md:grid-cols-2" v-if="settings">
                <div>
                        
                    <div class="p-2 overflow-hidden overflow-y-scroll border-4 border-dashed border-light-gray-300 md:w-124 h-80" id="journal-scroll">
                        <div class="flex items-center justify-center">
                            <input type="file" accept="image/*" multiple="multiple" @change="previewMultiImage" id="my-file" hidden/>
                            <label  class="p-2 text-sm text-white rounded-full cursor-pointer" :style="{ 'background-color': settings.colors.primaryColor }" for="my-file">{{ $t('pages.chooseFile') }}</label>
                        </div>
                        <template v-if="preview_list.length">
                            <div class="grid gap-4 md:grid-cols-2">
                                <div v-for="item, index in preview_list" :key="index">
                                    <img :src="item" class="h-52 md:w-52" />
                                    <!-- <p class="mb-0">file name: {{ image_list[index].name }}</p> -->
                                    <!-- <p>size: {{ image_list[index].size/1024 }}KB</p> -->
                                </div>
                            </div>
                        
                        </template>
                    </div>
                </div>
                <div class="">
                    <span>
                        <label class="flex md:items-start md:justify-start md:flex">
                            <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                <input type="checkbox" class="absolute opacity-0" v-model="vendor_pickup" @click="vendorPickup">
                                <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                            </div>
                            <div class="text-base font-semibold">{{ $t('pickupOrder') }}</div>
                        </label>
                        <p class="text-xs font-light text-gray-600 md:text-sm">{{ $t('pharmacyIndicate') }}</p>
                    </span>
                    <div class="mt-2"  v-show="vendor_pickup == false || vendor_pickup == null">
                        <p class="text-base font-semibold">{{ $t('deliveryAddress') }}</p>
                        <div class="flex space-x-5">
                            <span class="mt-2 text-xs font-light text-gray-600 md:text-sm">{{ $t('selectAddress') }}</span>
                            <a href="/profile" class="px-8 py-2 text-xs text-green-500 md:text-sm hover:underline">{{ $t('addAddress') }}</a>
                        </div>
                        <div class="mt-2 md:max-w-sm">
                            <select id="address" name="address" @change="GetDeliveryFee" v-model="address" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <!-- <option value="0">Select a delivery address</option> -->
                                <option v-for="address in addresses" :value="address" v-bind:key="address.id">
                                    {{ address.name }} [{{ address.address }}]
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
             <div class="mt-10">
                <p class="text-base font-semibold">{{ $t('paymentMethods') }}</p>
                <div class="grid md:grid-cols-2">
                    <div  class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-80 rounded-xl" v-for="(method, index) in methods" :key="index">
                        <div class="flex justify-between">
                            <div class="flex-shrink-0">
                                <img class="self-center object-cover w-8 h-8"  v-if="method" v-bind:src="method.photo" alt="Man looking at item at a store">
                            </div>
                            <div class="self-center px-2">
                                <div class="self-center text-xs text-black text-gray-600 md:text-sm">{{ method.name }}</div>
                            </div>
                            <label class="self-center md:items-start md:justify-start md:flex">
                                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                    <input type="radio" class="absolute opacity-0" v-model="paymentMethod" :value="method">
                                    <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>
                                <!-- <div class="text-sm font-medium text-black md:text-base">{{ paymentMethod.name }}</div> -->
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid gap-5 mt-10 md:grid-cols-2">
                <textarea id="note" name="note" placeholder="note" v-model="note" rows="3" class="block p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <div v-if="settings" @click="checkoutOrder" class="w-full h-12 px-6 py-3 text-center text-white uppercase rounded cursor-pointer md:w-80" 
                :style="{ 'background-color': settings.colors.primaryColor }">
                    <!-- <CreditCardIcon class="w-6 h-6 text-white" aria-hidden="true" /> -->
                    <span>{{ $t('placeOrderRequest') }}</span>
                </div>
            </div>
           
        </div>
    </section>
  </div>
  <Download/> 
</template>

<script>
import axios from 'axios'
import { CreditCardIcon } from '@heroicons/vue/outline'
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Download from '@/components/Downloads.vue'
import {useStorageStore} from '@/store/storage.js';

export default {
  name: 'checkout',
  components: {
    CreditCardIcon,
    Download
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
        preview: null,
        image: null,
        preview_list: [],
        image_list: [],
        vendor: null,
        delivery_fee: 0,
        discount: null,
        discount: 0,
        delivery_amount: 0,
        stax: 0,
        taxAmt: 0,
    }
  },

  setup() {
    const store = useStorageStore();
    return { store };
  },

    mounted () {

        this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`

        axios.get(this.base_url+'api/app/settings')
        .then(response => (this.settings = response.data))
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
            this.$router.push("/login");
            !process.server ? localStorage.removeItem("user") : null
            !process.server ? localStorage.removeItem("authToken") : null
        }

        this.store.setLoading(true)
        axios.get(this.base_url+'api/vendors/' + this.$route.params.id)
        .then((response) => {
        this.store.setLoading(false)
        this.vendor = response.data
        console.log(this.vendor)
        })
        .catch(error => console.log(error))
    },
    methods: {

        vendorPickup()
        {
            this.delivery_fee = 0.00
        },

        calcCrow() 
        {
            let vendor = this.vendor
            let lat1 = this.toRad(vendor.latitude)
            let lon1 = this.toRad(vendor.longitude)
            let lat2
            let lon2
            if(this.address != null){
                 lat2 = this.toRad(this.address.latitude)
                 lon2 = this.toRad(this.address.longitude)
            }
            
            var R = 6371; // km
            var dLat = this.toRad(lat2-lat1);
            var dLon = this.toRad(lon2-lon1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c;
            // console.log(d.toFixed(2))
            return d.toFixed(2);
        },

        toRad(Value) 
        {
            return Value * Math.PI / 180;
        },

        GetDeliveryFee()
        {
            // let cart = this.$store.state.cart[0]
            let vendor = this.vendor
            let address_id
            if(this.address != null){
                 address_id = this.address.id
            }

            this.store.setLoading(true)
            axios.get(this.base_url+'api/general/order/summary',{
                params: {
                    delivery_address_id: address_id,
                    vendor_id: vendor.id
                },
                'headers': { 'Authorization': this.AuthStr }
            })
            .then( (response) => {
                this.store.setLoading(false)
                let fee = response.data
                this.delivery_fee = fee.delivery_fee
                if(vendor.delivery_range < this.calcCrow()) {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Delivery address out of reach for vendor!',
                    })
                }else {
                    this.delivery_amount = this.delivery_fee
                }
            })
        },

        checkoutOrder() {
            if(this.vendor_pickup == null && this.address == null)
            {
                notify({
                    type: "error",
                    title: "Order Checkout",
                    text: 'address field is empty',
                })
            }else if(this.paymentMethod == null)
            {
                notify({
                    type: "error",
                    title: "Order Checkout",
                    text:  'select a payment method',
                })
            }else {
                let address_id = this.address ? this.address.id : '';
                let payment = this.paymentMethod;
                let total = this.delivery_fee + Number(this.vendor.tax);
                let sub_total = this.delivery_fee
                axios.post(this.base_url+'api/orders', 
                    { 
                        sub_total: sub_total,
                        tax: this.vendor.tax,
                        total: total,
                        note: this.note,
                        products: [],
                        discount: 0,
                        vendor_id: this.vendor.id,
                        delivery_address_id: address_id,
                        payment_method_id: payment.id,
                        delivery_fee: this.delivery_fee,
                        note: this.note,
                        photo: this.image_list
                    }, 
                    { 'headers': { 'Authorization': this.AuthStr } }
                )
                .then(function (response) {
                    !process.server ? localStorage.removeItem('cart') : null;
                    if (payment.is_cash == 1) {
                        Swal.fire({
                            title: 'Order Successful',
                            text: "Please pay rider" + " "+ total +" " +" on delivery",
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Okay'
                        }).then((result) => {
                            if(result.isConfirmed) {
                                window.location.href = '/'
                            }
                        })
                    }else {
                        notify({
                            type: "success",
                            title: "Order Checkout",
                            text: response.data.message,
                        });
                        window.location.href = response.data.link
                    }
                })
                .catch(error => console.log(error))
                
            }
        },

        previewImage: function(event) {
        var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                this.preview = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },

        previewMultiImage: function(event) {
        var input = event.target;
        var count = input.files.length;
        var index = 0;
            if (input.files) {
                while(count --) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview_list.push(e.target.result);
                }
                this.image_list.push(input.files[index]);
                reader.readAsDataURL(input.files[index]);
                index ++;
                }
            }
        },
        reset: function() {
            this.image = null;
            this.preview = null;
            this.image_list = [];
            this.preview_list = [];
        }
    }
}
</script>
<style>
input:checked + svg {
    display: block;
}
  #journal-scroll::-webkit-scrollbar {
    width: 4px;
    cursor: pointer;
    /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/

  }
  #journal-scroll::-webkit-scrollbar-track {
      background-color: rgba(229, 231, 235, var(--bg-opacity));
      cursor: pointer;
      /*background: red;*/
  }
  #journal-scroll::-webkit-scrollbar-thumb {
      cursor: pointer;
      background-color: #a0aec0;
      /*outline: 1px solid slategrey;*/
  }
</style>
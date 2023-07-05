<template>
    <div class="cart">
        <section class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="settings">
            <!-- <div @click="back">
                back
            </div> -->
            <p class="flex justify-center mb-10 text-2xl font-medium md:justify-start md:font-light md:text-5xl md:mb-16">{{ $t('cart.header') }}</p>
            <div class="" v-if="products?.length <= 0">
                <p class="mb-5">{{ $t('cart.empty') }}</p>  
            </div>
            <div class="grid gap-4 md:grid-cols-3" v-else>
                <div class="md:col-span-2">
                    <div class="relative px-5 py-3 mx-auto mb-5 shadow-md md:justify-between rounded-xl md:flex md:space-x-10" v-for="product in products" :key="product.id"> 
                        <button @click="removeProduct(product.id)" class="absolute top-0 right-0 p-1 bg-red-500 rounded-md shadow-md">
                            <MinusSmIcon  class="w-3 h-3 mt-1 text-white cursor-pointer md:w-3 md:h-3" aria-hidden="true" />
                        </button>
                        <a :aria-label="product.name" :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)">
                            <img  v-if="product" v-bind:src="product.photo" class="mx-auto mt-3 md:h-16">
                        </a>
                        <div class="flex flex-col">
                            <a :aria-label="product.name" :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)">
                                <div class="flex self-center"> 
                                    <p class="flex m-0 mt-4 text-gray-600 md:mt-0 ">{{ product.name }}</p>
                                    <!-- <p class="mt-2 text-xs text-gray-600 ">{{ product.vendor.name }}</p> -->
                                </div>
                            </a>
                            <a :aria-label="product.vendor.name" :href="`vendor/${product.vendor.id}/`+sanitizeTitle(`${product.vendor.name}`)">
                                <div class="self-center "> 
                                    <!-- <p class="flex m-0 mt-5 text-gray-600 md:mt-0 ">{{ product.name }}</p> -->
                                    <p class="mt-1 text-xs text-gray-600 ">{{ product.vendor.name }}</p>
                                </div>
                            </a>
                        </div>
                       
                        
                        
                         <div class="flex flex-row self-center space-x-2">
                            <!-- <p class="flex self-center text-xs ">{{ $t('product.quantity') }}:</p>
                            <p class="text-xs font-semibold">{{ product.quantity }}</p> -->
                            <div class="flex md:items-center">
                                <button
                                class="flex items-center justify-center w-8 h-8 p-2 my-2 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer md:mx-2 hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                @click="decrementProduct(product)">
                                <MinusIcon class="w-6 h-6 text-gray-500" />
                                </button>
                                <div class="w-8 h-8 overflow-hidden">
                                    <div class="w-full h-full p-2 text-xl font-light text-center md:p-0">{{ product.quantity }}</div>
                                <!-- <input class="w-full h-full text-xl font-light text-center" v-model="product.quantity"/> -->
                                </div>
                                <button
                                class="flex items-center justify-center w-8 h-8 p-2 m-2 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                @click="incrementProduct(product)">
                                    <PlusIcon class="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col self-center">
                             <div class="flex justify-between space-x-2">
                                 <p class="text-xs">{{ $t('cart.price') }}:</p>
                                    <span v-if="product.discount_price > 0">
                                        <p class="text-sm text-gray-600">{{ currency }}{{ product.discount_price.toFixed(2) }}</p>
                                    </span>
                                    <span v-else>
                                        <p class="text-sm text-gray-600">{{ currency }}{{ product.price.toFixed(2) }}</p>
                                    </span>
                             </div>
                             <div class="flex justify-between space-x-2">
                                 <p class="text-xs">{{ $t('cart.totalProductPrice') }}:</p>
                                 <p class="flex self-center text-sm text-gray-600">{{ currency }}{{ product ? product.totalPrice.toFixed(2) : '' }}</p>
                             </div>
                             <div>
                                 <p class="text-xs" v-if="product.selectedOption == null || product.selectedOptions.length != 0">{{ $t('cart.noExtras') }}</p>
                                 <p class="text-xs underline" v-if="product.selectedOption != null || product.selectedOptions.length != 0">{{ $t('cart.extras') }}:</p>
                                    <p class="flex text-xs" v-if="product.selectedOption != null">
                                        
                                            {{ product.selectedOption.name }}:<span class="flex"> {{ currency }} {{ product.selectedOption.price }}</span>
                                      
                                    </p>
                                <div class="flex flex-col" v-for="option in product.selectedOptions" :key="option.id">
                                  
                                        <p class="flex text-xs" v-if="option">
                                            {{ option.name }}: <span class="flex"> {{ currency }} {{ option.price }}</span>
                                        </p>
                                    
                                    
                                </div>
                            </div>
                             <!-- <div>
                                 <p class="text-xs">{{ $t('cart.noExtras') }}</p>
                                 <p class="text-xs underline">{{ $t('cart.extras') }}:</p>
                                <div class="flex flex-col" v-if="product.selectedOptions">
                                    <div class="flex justify-between space-x-2">
                                        <p class="text-xs" v-for="option in product.selectedOptions" :key="option.id">{{ option.name }}</p>
                                    </div>
                                    <div class="flex justify-between space-x-2">
                                        <p class="text-sm text-gray-600" v-for="option in product.selectedOptions" :key="option.id">{{ currency }} {{ option.price }}</p>
                                    </div>
                                </div>
                             </div> -->
                             
                        </div>
                       
                    </div>
                </div>
                
                <div class="md:col-span-1" v-for="product in products" :key="product.id">
                    <p class="py-3 text-sm font-semibold text-gray-600 md:mt-0">{{ $t('cart.orderSummary') }}</p>
                    <div class="font-bold divide-y divide-black">
                        <p class="text-xs font-light text-gray-600 md:mb-3 md:mt-0">{{ $t('cart.orderSummary2') }}</p>
                        <div></div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <p class="text-sm font-light text-gray-600">{{ $t('cart.totalItems') }}(s)</p>
                        <p class="font-bold text-black">{{ product.quantity }}</p>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-light text-gray-600">{{ $t('cart.subtotal') }}</p>
                        <span>
                        <p class="font-bold text-black">{{ currency }}{{ product.totalPrice.toFixed(2) }}</p>
                        </span>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-light text-gray-600">{{ $t('cart.Discount') }}</p>
                        <p class="font-bold text-black" v-if="discountAmount">
                            <span v-if="discount.percentage == 1">%</span>
                            <span v-else>{{ currency }}</span>
                            {{ discountAmount }}
                        </p>
                    </div>
                    <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-semibold text-gray-600">{{ $t('cart.totalAmount') }}</p>
                        <span v-if="totalAmt">
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }}{{ totalAmt.toFixed(2) }}</p>
                        </span>
                    </div>
                    <div class="px-5 mt-10 border-2 border-gray-100 rounded py-7" v-show="!isLoggedIn">
                        <div class="flex justify-between">
                            <div>
                                <p class="font-bold">{{ $t('cart.haveAnAccount') }}?</p>
                                <span class="text-sm font-light">
                                
                                    <a href="/register" class="text-sm font-light underline"> {{ $t('cart.join') }}</a>
                                    {{ $t('cart.or') }}
                                    <a href="/login" class="underline"> {{ $t('nav.login') }}</a>
                                    {{ $t('cart.forAsmootherCheckout') }}
                                </span>
                            </div>
                            <span class="text-2xl font-bold"><UserIcon class="w-6 h-6 text-black" aria-hidden="true" /></span>
                        </div>
                    </div>
                    <div v-show="isLoggedIn">
                        <a :href="`checkout`" v-if="settings" class="flex justify-between w-full px-5 py-10 mt-10 rounded" :style="{ 'background-color': settings.colors.primaryColor }">
                            <p class="self-center font-semibold text-primary">{{ $t('cart.continueToCheckout') }}</p>
                            <span class="self-center w-12 h-12 p-3 text-2xl font-light text-center text-black bg-white rounded-full">
                                <ArrowCircleRightIcon class="w-6 h-6 text-black" aria-hidden="true" />
                            </span>
                        </a>
                    </div>
                    <div class="mt-8 font-semibold text-black ">
                        <div class="pb-10 underline ">{{ $t('cart.useADiscount') }}</div>
                            <input type="text" name="text" 
                                placeholder="Discount code" 
                                v-model="coupon" 
                                class="block w-full px-2 py-2 mt-1 text-sm border-b-2 border-black dark:border-gray-600 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                            <div class="text-center">
                                <button @click="getCoupon" class="px-6 py-3 mt-5 font-semibold border-2 border-gray-300 rounded-full" type="submit">{{ $t('cart.getDiscount') }}</button>
                            </div>
                        </div>
                        <div class="flex mt-8 text-sm font-semibold text-gray-600">
                            <ShoppingBagIcon class="w-4 h-4 mr-2 text-black" aria-hidden="true" />
                            <p> {{ $t('cart.shoppingWithSSLEncryption') }}</p>
                        </div>
                </div>
            </div>
            
           
        </section>
    </div>
    <Download/>
</template>

<script>
import axios from 'axios'
import Download from '@/components/Downloads.vue'
import { UserIcon, ArrowCircleRightIcon, MinusSmIcon, ShoppingBagIcon, PlusIcon, MinusIcon } from '@heroicons/vue/outline'
import { notify } from "@kyvg/vue3-notification"
import {useStorageStore} from '@/store/storage'

export default {
  name: 'cart',
  components: {
    Download,
    UserIcon,
    ArrowCircleRightIcon,
    MinusSmIcon,
    ShoppingBagIcon,
    PlusIcon,
    MinusIcon
    // MenuTab
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
        products: null,
        product: null,
        currency: null,
        quantity: 1,
        coupon: null,
        discount: null,
        discountAmount: null,
        animationDown :{
            translateY:'translateY(-100%)',
            // eslint-disable-next-line no-dupe-keys
            translateY:'translateY(100%)'
        },
        AuthStr: null,
        orders: null,
        settings: null,
        base_url: this.store.baseUrl,
        cart: null,
        subtotal: null,
        total: null,
    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
    mounted () {
        this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`
    if (!process.server ? localStorage.getItem("authToken") : null) {
      this.isLoggedIn = true;
      this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null)
    }

    this.store.fetchSettings(this.items).then(() => {
      this.settings = this.store.settings;
      this.currency = this.settings.strings.currency
    })

    if (!process.server ? localStorage.getItem("cart") : null) {
      this.products = JSON.parse(!process.server ? localStorage.getItem("cart") : null)
    }
    
  },

  computed: {

    // totalAmt() {
    //   if (this.subtotal) {
    //     return this.subtotal - this.discountAmount
    //   }
    // }, 

    cartSubTotal() {
        this.subtotal = 0;
        for (let product of this.store.cart) {
            this.subtotal += Number(product.totalPrice);
            if(product.selectedOptions){
                product.selectedOptions.forEach((item, i) => {
                    this.subtotal += Number(item.price);
                })
            }if(product.selectedOption){
                this.subtotal += Number(product.selectedOption.price);
            }
            
        }
        return this.subtotal;
    },

    cartItemCount() {
      return this.store.count;
    },

    totalAmt(){
        //sum totalprices of products in the cart and divide or subtract discount from it
        //determine whether discount is % or a fixed amount to enable you to calculate the totalAmt
        // this.total = 0;
        this.total = Number(this.cartSubTotal);
        if(this.discount){
            if(this.discount.expired == false){
                this.discount.products.forEach((item, i) => {
                    const cartItems = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
                    const index = cartItems.findIndex(({ id }) => id === item.id);
                    if(cartItems[index]){
                       if(this.discount.percentage == 1){
                            this.discountAmount = this.discount.discount
                            this.total = this.total - (this.total * (this.discount.discount / 100));
                        }else if(this.discount.percentage == 0) {
                            this.discountAmount = this.discount.discount
                            this.total -= this.discount.discount;
                        }
                        cartItems[index].totalPrice =  this.total
                        cartItems[index].discount = this.discountAmount
                        !process.server ? localStorage.setItem("cart", JSON.stringify(cartItems)) : null;
                        
                        // localStorage.addItem("discount", this.discount)
                        // localStorage.getItem()
                    }
                })
                
            }
        }
        return this.total;
    }
},


   methods: {
        back(){
            this.$router.back()
        },

       removeProduct(product)
       {
            const cartItems = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
            const index = cartItems.findIndex(({ id }) => id === product);
            cartItems.splice(index, 1);
            !process.server ? localStorage.setItem("cart", JSON.stringify(cartItems)) : null;
            this.cart = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
            notify({
                type: "success",
                title: "Cart",
                text:  'Product Deleted successfully',
            })
            window.location.href = '/cart'
       },

       decrementProduct(product){
            const cartItems = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
            const index = cartItems.findIndex(({ id }) => id === product.id);
            if(cartItems[index].quantity > 1){
                product.quantity = cartItems[index].quantity--
                // reduce quantity by the price of the product
                // this.total -= product.price;
                if(product.discount_price != 0) {
                     product.totalPrice -= product.discount_price;
                 }else{
                      product.totalPrice -= product.price;
                 }
                 cartItems[index].totalPrice = product.totalPrice;
                !process.server ? localStorage.setItem("cart", JSON.stringify(cartItems)) : null;
                this.cart = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
            }else{
                this.removeProduct(product);
            }
       },
       
       incrementProduct(product){
            const cartItems = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
            const index = cartItems.findIndex(({ id }) => id === product.id);
            if(cartItems[index].quantity < product.available_qty){
                // let quaity 
                product.quantity = cartItems[index].quantity++
                // product.quantity = quaity
                // let qty = product.quantity
                if(product.discount_price != 0) { 
                    product.totalPrice = product.discount_price * product.quantity
                 }else{
                    product.totalPrice = product.price * product.quantity
                 }
                //  update totalPrice in cart in localStorage
                cartItems[index].totalPrice = product.totalPrice;
                !process.server ? localStorage.setItem("cart", JSON.stringify(cartItems)) : null;
                this.cart = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
            }else{
                notify({
                    type: "error",
                    title: "Cart",
                    text: "Product available",
                });
            }
         },

        getCoupon(){
           this.store.setLoading(true)
           axios.get(this.base_url+'api/coupons/'+this.coupon,{
            headers: { Authorization: this.AuthStr },
            })
            .then((response) => {
                this.store.setLoading(false)
                this.discount = response.data
                console.log(response)
            })
            .catch((error) => {
                this.store.setLoading(false)
                notify({
                    type: "error",
                    title: "Cart",
                    text:  error.response.data.message,
                })
            })
   
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


        // increment(product) {
        //     if(product.available_qty > 1){
        //         this.quantity++;
        //         this.totalPrice = product.price + this.quantity;
        //     }
        // },

        // decrement() {
        //     if(this.quantity === 1)
        //     {
        //          notify({
        //             type: "error",
        //             title: "Cart",
        //             text: "You cannot add 0 product",
        //         });
        //     }else{
        //         this.quantity--
        //     }
        // },

    }
}
</script>

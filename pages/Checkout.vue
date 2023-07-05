<template>
  <div class="checkout" v-show="isLoggedIn">
    <section class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="methods">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div class="md:col-start-1 md:col-span-4">
          <p
            class="mb-16 text-4xl font-bold leading-none tracking-widest xl:text-5xl"
          >
            {{ $t('checkout.header') }}
          </p>
          <div class="flex flex-col justify-start mb-5 md:max-w-sm tems-start">
            <input
              type="text"
              name="tip"
              id="tip"
              placeholder="tip driver"
              v-model="tip"
              class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <textarea
              id="note"
              name="note"
              placeholder="note"
              v-model="note"
              rows="3"
              class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <span v-if="products[0].vendor.pickup == 1">
            <label class="md:items-start md:justify-start md:flex">
              <div
                class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500"
              >
                <input
                  type="checkbox"
                  class="absolute opacity-0"
                  v-model="vendor_pickup"
                  @click="vendorPickup"
                />
                <svg
                  class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div class="text-base font-semibold">{{ $t('pickupOrder') }}</div>
            </label>
            <p class="text-xs font-light text-gray-600 md:text-sm">
              {{ $t('pharmacyIndicate') }}
            </p>
          </span>
          <div
            class="mt-10"
            v-show="vendor_pickup == false || vendor_pickup == null"
          >
            <p class="text-base font-semibold"> {{ $t('deliveryAddress') }}</p>
            <div class="flex space-x-5">
              <span class="mt-2 text-xs font-light text-gray-600 md:text-sm"
                >{{ $t('selectAddress') }}</span
              >
              <a
                href="/profile"
                class="px-8 py-2 text-xs text-green-500 md:text-sm hover:underline"
                >{{ $t('addAddress') }}</a
              >
            </div>
            <div class="mt-2 md:max-w-sm" v-if="user">
              <select
                id="address"
                name="address"
                @change="GetDeliveryFee"
                v-model="address"
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <!-- <option value="0">Select a delivery address</option> -->
                <option
                  v-for="address in addresses"
                  :value="address"
                  v-bind:key="address.id"
                >
                  {{ address.name }} [{{ address.address }}]
                </option>
              </select>
            </div>
          </div>
          <!-- </div> -->
          <div class="mt-10">
            <p class="text-base" v-if="user">{{ $t('paymentMethods') }}</p>
            <div class="grid md:grid-cols-2">
              <div
                class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-80 rounded-xl"
                v-for="(method, index) in methods"
                :key="index"
              >
                <div class="flex justify-between">
                  <div class="flex-shrink-0">
                    <img
                      class="self-center object-cover w-8 h-8"
                      v-if="method"
                      v-bind:src="method.photo"
                      alt="Man looking at item at a store"
                    />
                  </div>
                  <div class="self-center px-2">
                    <div
                      class="self-center text-xs text-gray-600 md:text-sm"
                    >
                      {{ method.name }}
                    </div>
                  </div>
                  <label
                    class="self-center md:items-start md:justify-start md:flex"
                  >
                    <div
                      class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500"
                    >
                      <input
                        type="radio"
                        class="absolute opacity-0"
                        v-model="paymentMethod"
                        :value="method"
                      />
                      <svg
                        class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                    <!-- <div class="text-sm font-medium text-black md:text-base">{{ paymentMethod.name }}</div> -->
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-start-5 md:col-end-7">
          <div class="flex justify-between">
            <p class="py-3 text-sm font-semibold text-gray-600">{{ $t('checkout.yourOrder') }}</p>
            <router-link to="/cart" class="font-light text-gray-600 underline"
              >{{ $t('edit') }}</router-link
            >
          </div>
          <div
            class="flex justify-between my-10"
            v-for="product in products"
            :key="product.id"
          >
            <div class="flex space-x-2">
              <img
                v-if="product.photo"
                v-bind:src="product.photo"
                class="rounded w-14 h-14"
              />
              <div>
                <p class="text-xs text-gray-600">{{ product.name }}</p>
                <p class="text-xs text-gray-600">
                  {{ $t('product.quantity') }}: {{ product.quantity }}
                </p>
                <p class="text-xs text-gray-600">
                  Total: {{ currency }} {{ product.totalPrice }}
                </p>
              </div>
            </div>
            <div class="flex flex-col" v-if="product.selectedOption?.length != 0">
              <div
                v-for="option in product.selectedOptions"
                :key="option.id"
                class="mb-3"
              >
                <img v-bind:src="option.photo" class="rounded w-14 h-14" />
                <div>
                  <p class="text-xs text-gray-600">{{ option.name }}</p>
                  <!-- <p class="text-xs text-gray-600">Quantity: {{ product.quantity }}</p> -->
                  <p class="text-xs text-gray-600">
                    {{ $t('cart.total') }}: {{ currency }}{{ option.price.toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-col" v-if="product.selectedOption != null">
          
                <img v-bind:src="product.selectedOption.photo" class="rounded w-14 h-14" />
                <div>
                  <p class="text-xs text-gray-600">{{ product.selectedOption.name }}</p>
                  <!-- <p class="text-xs text-gray-600">Quantity: {{ product.quantity }}</p> -->
                  <p class="text-xs text-gray-600">
                    {{ $t('cart.total') }}: {{ currency }}{{ product.selectedOption.price.toFixed(2) }}
                  </p>
                </div>
            </div>
            <!-- <p class="text-xs text-gray-600">{{ currency }}{{ product.price.toFixed(2) }}</p> -->
          </div>
          <div class="flex my-5">
            <p class="py-3 text-sm font-semibold text-gray-600">
              {{ $t('cart.orderSummary') }}
            </p>
          </div>
          <div class="flex my-5">
            <!-- <p class="text-xs font-light text-gray-600">Total delivery cost</p> -->
            <p class="text-xs font-light text-gray-600">
              {{ $t('checkout.orderSummaryText') }}
            </p>
          </div>
          <div class="font-bold divide-y divide-black">
            <div></div>
            <div></div>
          </div>
          <div class="flex justify-between mt-4">
            <p class="text-sm font-light text-gray-600">{{ $t('cart.subtotal') }}</p>
            <p class="text-sm font-bold text-black md:text-base">
              {{ currency }} {{ cartSubTotal ? cartSubTotal.toFixed(2) : "" }}
            </p>
          </div>
          <div class="flex justify-between mt-1">
            <!-- <p class="text-sm font-light text-black md:text-base">Discount</p> -->
            <!-- <p class="text-sm font-bold text-black md:text-base">{{ currency }}{{ product ? product.discount_price : 0 }}</p> -->
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-sm font-light text-gray-600">{{ $t('checkout.deliveryFee') }}</p>
            <p class="text-sm font-bold text-black md:text-base">
              {{ currency
              }}{{ delivery_amount ? delivery_amount.toFixed(2) : "0.00" }}
            </p>
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-sm font-light text-gray-600">{{ $t('checkout.tax') }}({{ products[0].vendor.tax }})</p>
            <p class="text-sm font-bold text-black md:text-base">
              {{ currency }}{{ getTaxAmt ? getTaxAmt : "0.00" }}
            </p>
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-sm font-light text-gray-600">{{ $t('checkout.driverTip') }}</p>
            <p class="text-sm font-bold text-black md:text-base">
              {{ currency }}{{ tip }}
            </p>
          </div>
          <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
            <div></div>
            <div></div>
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-sm font-semibold text-gray-600">{{ $t('cart.totalAmount') }}</p>
            <p class="text-sm font-bold text-black md:text-base">
              {{ currency }}{{ cartTotalAmt ? cartTotalAmt : "0.00" }}
            </p>
          </div>

          <div class="flex mt-8 text-sm font-semibold text-gray-600">
            <ShoppingBagIcon
              class="w-4 h-4 mr-2 text-black"
              aria-hidden="true"
            />
            <p>{{ $t('cart.shoppingWithSSLEncryption') }}</p>
          </div>
          <div class="grid mt-16 grid-col-1">
            <div
              v-if="settings"
              @click="checkoutOrder"
              class="flex justify-center px-6 py-3 space-x-3 text-white rounded cursor-pointer hover:bg-green-700"
              :style="{ 'background-color': settings.colors.primaryColor }"
            >
              <CreditCardIcon class="w-6 h-6 text-white" aria-hidden="true" />
              <span> {{ $t('checkout.placeOrder') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- footer -->
    <!-- <Footer/> -->
  </div>
  <Download />
</template>

<script>
import axios from "axios";
import { CreditCardIcon, ShoppingBagIcon } from "@heroicons/vue/outline";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Download from "@/components/Downloads.vue";
import {useStorageStore} from '@/store/storage.js'
export default {
  name: "checkout",
  components: {
    CreditCardIcon,
    Download,
    ShoppingBagIcon,
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
      isLoggedIn: false,
      user: null,
      tip: "0.00",
      note: null,
      products: null,
      addresses: null,
      currency: null,
      methods: null,
      tax: 0,
      taxAmt: 0,
      discount: 0,
      delivery_amount: 0,
      vendor_pickup: null,
      delivery_fee: 0,
      animationDown: {
        translateY: "translateY(-100%)",
        // eslint-disable-next-line no-dupe-keys
        translateY: "translateY(100%)",
      },
      AuthStr: "",
      paymentMethod: null,
      address: null,
      settings: null,
      base_url: this.store.baseUrl,
      subtotal: null,
    };
  },

  computed: {
    cartSubTotal() {
      this.subtotal = 0;
        for (let product of this.products) {
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

    getTaxAmt() {
      let taxAmt;
      let tax;
      let product = this.products[0];
      tax = product.vendor.tax;
      taxAmt = (Number(this.cartSubTotal) * Number(tax)) / 100;
      return parseFloat(taxAmt).toFixed(2);
      
    },

    cartTotalAmt() {
      let totalAmt;
      totalAmt = Number(this.cartSubTotal) + Number(this.tip);
      if (this.vendor_pickup) {
        totalAmt += Number(this.getTaxAmt);
      } else if (this.GetDeliveryFee) {
        totalAmt += Number(this.getTaxAmt) + Number(this.delivery_fee);
        // console.log(Number(this.getTaxAmt));
      } else {
        totalAmt += Number(this.getTaxAmt);
        
      }
      return totalAmt.toFixed(2);
    },

  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  mounted() {
    this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`
    if (!process.server ? localStorage.getItem("cart") : null) {
      this.products = JSON.parse(!process.server ? localStorage.getItem("cart") : null);
    }

    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => (this.settings = response.data))
      .catch((error) => console.log(error));

    axios
      .get(this.base_url + "api/payment/methods", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => (this.methods = response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(`${this.base_url}api/delivery/addresses`, {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => (this.addresses = response.data.data))
      .catch((error) => console.log(error));

    if (!process.server ? localStorage.getItem("authToken") : null) {
      this.isLoggedIn = true;
      this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null);
    }

    if (this.isLoggedIn == false) {
      this.$router.push("/login");
      !process.server ? localStorage.removeItem("user") : null;
      !process.server ? localStorage.removeItem("authToken") : null;
    }

    this.store.fetchSettings(this.items).then(() => {
      this.settings = this.store.settings;
      this.currency = this.settings.strings.currency
    })

    if (!process.server ? localStorage.getItem("cart") : null) {
      this.products = JSON.parse(!process.server ? localStorage.getItem("cart") : null)
    }

  },
  
  methods: {
    vendorPickup() {
      this.delivery_fee = 0.0;
    },

    calcCrow() {
      let cart = this.store.cart[0];
      let vendor = cart.vendor;
      let lat1 = this.toRad(vendor.latitude);
      let lon1 = this.toRad(vendor.longitude);
      let lat2;
      let lon2;
      if (this.address != null) {
        lat2 = this.toRad(this.address.latitude);
        lon2 = this.toRad(this.address.longitude);
      }

      var R = 6371; // km
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      // console.log(d.toFixed(2))
      return d.toFixed(2);
    },

    toRad(Value) {
      return (Value * Math.PI) / 180;
    },

    GetDeliveryFee() {
      let cart = this.store.cart[0];
      let vendor = cart.vendor;
      let address_id;
      if (this.address != null) {
        address_id = this.address.id;
      }

      this.store.setLoading(true)
      axios
        .get(this.base_url + "api/general/order/summary", {
          params: {
            delivery_address_id: address_id,
            vendor_id: vendor.id,
          },
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.store.setLoading(false)
          let fee = response.data;
          this.delivery_fee = fee.delivery_fee;

          if (vendor.delivery_range < this.calcCrow()) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Delivery address out of reach for vendor!",
            });
          } else {
            this.delivery_amount = this.delivery_fee;
          }
        });
    },

    checkoutOrder() {
      if (this.vendor_pickup == null && this.address == null) {
        notify({
          type: "error",
          title: "Order Checkout",
          text: "address field is empty",
        });
      } else if (this.paymentMethod == null) {
        notify({
          type: "error",
          title: "Order Checkout",
          text: "select a payment method",
        });
      } else {
        for (let product of this.products) {
           let quantity = product.quantity;
            let price = product.price;
          if(product.selectedOptions){
            product.selectedOptions.forEach((item, i) => {
              // product.selectedOptions[i].price = item.price;
             
              this.product_ = [
                {
                  selected_qty: quantity,
                  price: price,
                  product: {
                    id: product.id,
                    name: product.name,
                  },
                  options: [
                    {
                      id: item.id ? item.id : "",
                      name: item.name ? item.name : "",
                    },
                  ],
                  options_ids: [item.id ? item.id : ""],
                  options_flatten: item.name ? item.name : "",
                },
              ];
            })
          }if(product.selectedOption){
            this.product_ = [
              {
                selected_qty: quantity,
                price: price,
                product: {
                  id: product.id,
                  name: product.name,
                },
                options: [
                  {
                    id: product.selectedOption.id ? product.selectedOption.id : "",
                    name: product.selectedOption.name ? product.selectedOption.name : "",
                  },
                ],
                options_ids: [product.selectedOption.id ? product.selectedOption.id : ""],
                options_flatten: product.selectedOption.name ? product.selectedOption.name : "",
              },
            ];
          }else{
            this.product_ = [
              {
                selected_qty: quantity,
                price: price,
                product: {
                  id: product.id,
                  name: product.name,
                },
                options: [],
                options_ids: [],
                options_flatten: "",
              },
            ];
          }
        }
        axios.post(this.base_url + "api/orders",
          {
            vendor_id: this.products[0].vendor.id,
            sub_total: this.cartSubTotal,
            tax: this.products[0].vendor.tax,
            discount: this.products[0].discount ?? 0,
            delivery_address_id: this.address ? this.address.id : "",
            payment_method_id: this.paymentMethod.id,
            delivery_fee: this.delivery_fee,
            total: this.cartTotalAmt,
            note: this.note,
            tip: this.tip,
            products: this.product_,
          },
          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then((response) => {
          !process.server ? localStorage.removeItem("cart") : null;
          if (this.paymentMethod.is_cash == 1) {
            Swal.fire({
              title: "Order Successful",
              text:
                "Please pay rider" + " " + this.cartTotalAmt + " " + " on delivery",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Okay",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/";
              }
            });
          } else {
            notify({
              type: "success",
              title: "Order Checkout",
              text: response.data.message,
            });
            window.location.href = response.data.link;
          }
        })
        .catch((error) => console.log(error));
      }
    },
  },
};
</script>
<style>
input:checked + svg {
  display: block;
}
</style>

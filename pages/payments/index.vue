<template>
  <div class="p-2 mt-10 sm:mt-0" v-show="isLoggedIn">
    <div
      class="max-w-xl mx-auto overflow-hidden rounded-sm shadow-md bg-gray-50"
    >
      <div class="px-4 py-5 bg-white sm:p-6">
        <p class="mb-5 text-xl font-bold">{{ $t('parcel.payment') }}</p>
        <div class="flex flex-col" v-if="summary">
          <div class="flex justify-between">
            <p>{{ $t('parcel.distance') }}</p>
            <p>{{ summary.distance.toFixed(2) }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ $t('parcel.deliveryCharges') }}</p>
            <p>{{ currency }}{{ summary.delivery_fee.toFixed(2) }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ $t('parcel.packageSizeCharges') }}</p>
            <p>{{ currency }}{{ summary.package_type_fee.toFixed(2) }}</p>
          </div>
          <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
            <div></div>
            <div></div>
          </div>
          <div class="flex justify-between">
            <p>{{ $t('cart.subtotal') }}</p>
            <p>{{ currency }}{{ summary.sub_total.toFixed(2) }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ $t('checkout.tax') }}</p>
            <p>{{ currency }}{{ summary.tax.toFixed(2) }}</p>
          </div>
          <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
            <div></div>
            <div></div>
          </div>
          <div class="flex justify-between">
            <p>{{ $t('cart.total') }}</p>
            <p>{{ currency }}{{ summary.total.toFixed(2) }}</p>
          </div>
        </div>
         <div class="mt-10">
            <p class="text-base" v-if="user">{{ $t('paymentMethods') }}</p>
            <div class="grid md:grid-cols-2">
              <div
                class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-60 rounded-xl"
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
                        @click="pay(method)"
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
      <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
        <Navigation></Navigation>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Navigation from '@/components/parcel/Navigation.vue';
import {useStorageStore} from '@/store/storage.js';

export default {
  components: {
    Navigation,
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
      AuthStr: "",
      paymentMethod: [],
      isLoggedIn: false,
      user: null,
      methods: null,
      packages: null,
      package: null,
      couriers_: null,
      courier_: null,
      currency: null,
      address: null,
      from: null,
      to: null,
      base_url: this.store.baseUrl,
      summary: null,
      settings: null,
    };
  },

  setup() {
    const store = useStorageStore();
    return { store };
  },

  mounted() {
    this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`
    this.getCourier();
    this.getAddress();

    let package_id = !process.server ? localStorage.getItem("packageType") : null;
    let courier_id = !process.server ? localStorage.getItem("courier") : null;
    let weight = !process.server ? localStorage.getItem("weight") : null;
    let stops = !process.server ? localStorage.getItem("to") : null;
    let dropoff_location_id = !process.server ? localStorage.getItem("to") : null;
    let pickup_location_id = !process.server ? localStorage.getItem("from") : null;

    if (!process.server ? localStorage.getItem("authToken") : null) {
      this.isLoggedIn = true;
      this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null);
    }

    if (this.isLoggedIn == false) {
      !process.server ? localStorage.removeItem("user") : null;
      !process.server ? localStorage.removeItem("authToken") : null;
      this.$router.push("/login");
    }

    // payment method
    axios
      .get(this.base_url + "api/payment/methods", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => (this.methods = response.data.data))
      .catch((error) => console.log(error));

      this.store.fetchSettings(this.items).then(() => {
        this.settings = this.store.settings;
        this.currency = this.settings.strings.currency
      })

      // order summary method
      axios
        .get(
          this.base_url +
            "api/package/order/summary?vendor_id=" +
            courier_id +
            "&package_type_id=" +
            package_id +
            "&pickup_location_id=" +
            pickup_location_id +
            "&dropoff_location_id=" +
            dropoff_location_id +
            // '&stops='+stops+
            "&weight=" +
            weight,
          { headers: { Authorization: this.AuthStr } }
        )
        .then((response) => {
          this.summary = response.data;
        })
        .catch((error) => console.log(error));
  },

  methods: {
    pay(method) {
      if (this.paymentMethod) {
        !process.server ? localStorage.setItem("paymentId", method.id) : null;
        !process.server ? localStorage.setItem("cash", method.is_cash) : null;
      }
    },

    getPackage() {
      let base_url = this.store.baseUrl;
      this.store.setLoading(true)
      axios
        .get(base_url + "api/package/types", {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.store.setLoading(false)
          this.packages = response.data;
          let package_id = !process.server ? localStorage.getItem("packageType") : null;
          this.package = this.packages.find((p) => p.id == package_id);
        });
      return this.package.catch((error) => console.log(error));
    },

    getCourier() {
      let base_url = this.store.baseUrl;
      let package_id = !process.server ? localStorage.getItem("packageType") : null;
      axios
        .get(
          base_url + "api/vendors?type=package&package_type_id=" + package_id,
          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then((response) => {
          this.couriers_ = response.data.data;
          let courier_id = !process.server ? localStorage.getItem("courier") : null;
          this.courier_ = this.couriers_.find((c) => c.id == courier_id);
        })
        .catch((error) => console.log(error));
    },

    getAddress() {
      // delivery address method
      let base_url = this.store.baseUrl;
      axios
        .get(base_url + "api/delivery/addresses", {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.from = response.data.data;
          let from_id = !process.server ? localStorage.getItem("from") : null;
          this.address = this.from.find((f) => f.id == from_id);
          // console.log(this.address)
        })
        .catch((error) => console.log(error));
    },

    getFromAddress() {
      let base_url = this.store.baseUrl;
      axios
        .get(base_url + "api/delivery/addresses", {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.to = response.data.data;
          let to_id = !process.server ? localStorage.getItem("to") : null;
          this.address = this.to.find((f) => f.id == to_id);
          // console.log(this.address)
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

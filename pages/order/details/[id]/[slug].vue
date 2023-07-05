<template>
  <div class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="order">
    <nav class="w-full p-3 m-4 font-sans rounded bg-grey-light">
      <ol
        class="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <li>
          <a href="/orders" class="mr-2 text-sm font-medium text-gray-900"
            >Orders</a
          >
        </li>
        <li><span class="mx-2">\</span></li>
        <!-- <li><a href="#" class="font-bold text-blue">Library</a></li>
                <li><span class="mx-2">/</span></li> -->
        <li class="text-sm">
          <a class="font-medium text-gray-500 hover:text-gray-600" href="#">{{
            order.code
          }}</a>
        </li>
      </ol>
    </nav>
    <p
      class="flex justify-center mb-10 text-2xl font-medium md:justify-start md:font-light md:text-5xl md:mb-16"
    >
      Order Details
    </p>
    <div class="grid grid-cols-1 gap-2 mt-8 md:grid-cols-2">
      <div class="">
        <div class="flex flex-col">
          <img
            v-if="order.vendor"
            v-bind:src="order.vendor.feature_image"
            class="m-0 mb-5 md:w-28 md:h-20"
            alt=""
          />
          <div class="flex mb-1 space-x-2">
            <p class="font-semibold">Vendor Name:</p>
            <p class="font-light" v-if="order.vendor">
              {{ order.vendor.name }}
            </p>
          </div>
          <div class="flex mb-1 space-x-2">
            <p class="font-semibold">Code:</p>
            <p class="font-light">{{ order.code }}</p>
          </div>
          <div class="flex mb-1 space-x-2">
            <p class="font-semibold">Verification code:</p>
            <p class="font-light">{{ order.verification_code }}</p>
          </div>
          <div class="flex space-x-2">
            <p class="font-semibold">Delivery Address:</p>
            <p class="font-light">
              {{
                order.delivery_address
                  ? order.delivery_address.address
                  : "Customer Order Pickup"
              }}
            </p>
          </div>
          <div class="flex space-x-2">
            <p class="font-semibold">Status:</p>
            <p
              class="font-light text-gray-500 md:text-center"
              v-if="order.status == 'cancelled'"
            >
              {{ order.status }}
            </p>
            <p
              class="font-light text-green-500 md:text-center"
              v-else-if="order.status == 'delivered'"
            >
              {{ order.status }}
            </p>
            <p class="font-light text-blue-500 md:text-center" v-else>
              {{ order.status }}
            </p>
          </div>
          <div v-if="order.formatted_type == 'Parcel Delivery'">
            <p class="font-bold">Package Details</p>
            <div class="flex space-x-2">
              <p class="font-semibold">Package Type:</p>
              <p
                class="font-light text-gray-500 md:text-center"
                v-if="order.package_type"
              >
                {{ order.package_type.name }}
              </p>
            </div>
            <div class="flex space-x-2">
              <p class="font-semibold">Width:</p>
              <p class="font-light text-gray-500 md:text-center">
                {{ order.width }}
              </p>
            </div>
            <div class="flex space-x-2">
              <p class="font-semibold">Length:</p>
              <p class="font-light text-gray-500 md:text-center">
                {{ order.length }}
              </p>
            </div>
            <div class="flex space-x-2">
              <p class="font-semibold">Height</p>
              <p class="font-light text-gray-500 md:text-center">
                {{ order.height }}
              </p>
            </div>
            <div class="flex space-x-2">
              <p class="font-semibold">Height:</p>
              <p class="font-light text-gray-500 md:text-center">
                {{ order.weight }}
              </p>
            </div>
          </div>
          <div class="flex flex-col">
            <p class="font-semibold">Note:</p>
            <p class="font-light">{{ order.note }}</p>
          </div>
        </div>
      </div>
      <div class="" v-if="order.products">
        <div
          class="flex justify-between"
          v-for="product in order.products"
          :key="product.id"
        >
          <div class="flex space-x-2">
            <img
              v-if="product.photo"
              v-bind:src="product.product.photo"
              class="rounded w-14 h-14"
            />
            <div>
              <p class="text-xs text-gray-600">{{ product.product.name }}</p>
              <p class="text-xs text-gray-600">
                Quantity: {{ product.quantity }}
              </p>
              <p class="text-xs text-gray-600">
                Total: {{ currency }} {{ order.total }}
              </p>
            </div>
          </div>

          <div class="flex flex-col">
            <div
              v-for="option_group in product.product.option_groups"
              :key="option_group.id"
              class="mb-3"
            >
              <div v-if="option_group.length <= 0">
                <p class="text-xs text-black">hi</p>
              </div>
              <div v-else>
                <div v-for="option in option_group.options" :key="option.id">
                  <img v-bind:src="option.photo" class="rounded w-14 h-14" />
                  <div>
                    <p class="text-xs text-gray-600">{{ option.name }}</p>
                    <p class="text-xs text-gray-600">
                      Total: {{ currency }}{{ option.price }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex py-3 my-5 border-b border-black">
          <p class="py-3 text-sm font-semibold text-gray-600">Order summary</p>
        </div>
        <div class="flex justify-between mt-4">
          <p class="text-sm font-light text-gray-600">Subtotal</p>
          <p class="text-sm font-bold text-black md:text-base">
            {{ currency
            }}{{ order.sub_total ? order.sub_total.toFixed(2) : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1">
          <p class="text-sm font-light text-gray-600">Discount</p>
          <p class="text-sm font-bold text-black md:text-base">
            {{ currency
            }}{{ order.discount ? order.discount.toFixed(2) : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1">
          <p class="text-sm font-light text-gray-600">Delivery Fee</p>
          <p class="text-sm font-bold text-black md:text-base">
            {{ currency
            }}{{ order.delivery_fee ? order.delivery_fee.toFixed(2) : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1">
          <p class="text-sm font-light text-gray-600">Driver Tip</p>
          <p class="text-sm font-bold text-black md:text-base">
            {{ currency }}{{ order.tip ? order.tip.toFixed(2) : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1">
          <p class="text-sm font-light text-gray-600">Tax({{ order.tax }})</p>
          <p class="text-sm font-bold text-black md:text-base">
            {{ currency }}{{ order.tax ? order.tax.toFixed(2) : "0.00" }}
          </p>
        </div>
        <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
          <div></div>
          <div></div>
        </div>
        <div class="flex justify-between mt-1">
          <p class="text-sm font-semibold text-gray-600">Total Amount</p>
          <p class="text-sm font-bold text-black md:text-base">
            {{ currency }}{{ order.total }}
          </p>
        </div>

        <!-- </div> -->

        <!-- </div> -->
      </div>
    </div>
  </div>
  <Download />
</template>

<script>
import axios from "axios";
import Download from "@/components/Downloads.vue";
import {useStorageStore} from '@/store/storage.js';

export default {
  components: {
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
  name: "orders",
  data() {
    return {
      order: null,
      AuthStr: "",
      currency: null,
    };
  },
  setup() {
    const store = useStorageStore();
    return { store };
  },
  mounted() {
    this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`
    this.getCurrency();
    let base_url = this.store.baseUrl;

    axios
      .get(base_url + "api/orders/" + this.$route.params.id, {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.order = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    getCurrency() {
      let base_url = this.store.baseUrl;
      let setting;
      axios.get(base_url + "api/app/settings").then((response) => {
        setting = response.data;
        this.currency = setting.strings.currency;
      });
      return this.currency;
    },
  },
};
</script>

<template>
  <div class="product">
    <div class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="product">
      <nav class="w-full p-3 m-4 font-sans rounded bg-grey-light">
        <ol
          class="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <!-- <a :href="$router.resolve({name: 'Vendor', params: { id: product.vendor.id, slug: sanitizeTitle(`${product.vendor.name}`) }}).href" class="mr-2 text-sm font-medium text-gray-900">{{ product.vendor.name }}</a> -->
            <!-- <NuxtLink :to="{params: { id: product.vendor.id, slug: sanitizeTitle(`${product.vendor.name}`) }}" class="mr-2 text-sm font-medium text-gray-900">{{ product.vendor.name }}</NuxtLink> -->
            <a
              :href="`/vendor/${product.vendor.id}/${sanitizeTitle(
                product.vendor.name
              )}`"
              class="mr-2 text-sm font-medium text-gray-900"
              >{{ product.vendor.name }}</a
            >
          </li>
          <li><span class="mx-2">\</span></li>
          <li class="text-sm">
            <a class="font-medium text-gray-500 hover:text-gray-600" href="#">{{
              product.name
            }}</a>
          </li>
        </ol>
      </nav>
      <div class="grid grid-cols-6 gap-2" v-if="settings">
        <div class="col-span-full md:col-span-4 md:mr-10">
          <img
            v-if="product.photo"
            v-bind:src="product.photo"
            class="mx-auto mb-5 rounded-lg w-96 md:w-132"
          />
          <VueHorizontal
            ref="horizontal"
            class="horizontal"
            responsive
            v-if="product"
          >
            <div
              v-for="photo in product.photos"
              :key="photo.id"
              class="flex flex-row px-2 mb-10"
            >
            <!-- @click="selectedImage(photo)" -->
              <a
                class="flex flex-col items-center justify-center p-2 border border-gray-200 hover:border-gray-600 hover:border-2 h-14"
              >
                <img
                  v-if="product"
                  v-bind:src="photo"
                  class="h-12 mx-auto rounded-md"
                />
              </a>
            </div>
          </VueHorizontal>
        </div>
        <div class="md:col-start-5 md:col-end-7 col-span-full">
          <p class="mt-5 text-4xl font-light sm:mt-0 leading-large">
            {{ product.name }}
          </p>
          <span v-if="product.discount_price > 0">
            <p class="pt-5 mt-3 text-2xl tracking-wide">
              {{ currency }}{{ product.discount_price.toFixed(2) }}
            </p>
            <p class="pb-5 mt-3 text-2xl tracking-wide">
              {{ currency
              }}<span class="line-through">{{ product.price.toFixed(2) }}</span>
            </p>
          </span>
          <span v-else>
            <p class="pt-5 mt-3 text-2xl tracking-wide">
              {{ currency }}{{ product.price.toFixed(2) }}
            </p>
          </span>
          <p class="pb-5 leading-7 text-gray-600">{{ product.description }}</p>

          <div
            class="flex mb-5 space-x-4"
            v-if="product.vendor.vendor_type.slug != 'service'"
          >
            <div
              class="p-2 text-sm font-light text-black border border-green-600"
              v-if="product.deliverable == 1"
            >
              Deliverable
            </div>
            <div
              class="p-2 text-xs font-light text-black border border-red-600"
              v-if="product.deliverable == 0"
            >
              Not Deliverable
            </div>
            <div
              class="p-2 text-xs font-light text-black border border-gray-500"
            >
              {{ product.capacity }} {{ product.unit }}
            </div>
            <div
              class="p-2 text-xs font-light text-black border border-gray-500"
            >
              {{ product.package_count }} Item(s)
            </div>
          </div>

          <!-- <div v-if="product.option_groups">
                    <p class="mb-3 text-4xl" v-if="product.option_groups.length != '0'">{{ $t('product.optionHeader') }}</p>
                    <p class="mt-4 text-sm text-gray-600" v-if="product.option_groups.length != '0'">{{ $t('product.optionSubHeader') }}</p>
                     <select v-model="selectedOption" id="" class="block w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                     <option selected>Select Options</option>
                        <optgroup  v-for="option_group in product.option_groups" :key="option_group.id" :label=" option_group.name">
                            <option  :value="option" v-for="(option, index) in option_group.options" :key="index">
                                {{ truncate(option.name, 13) }}
                            </option>
                        </optgroup>
                    </select>    
                </div> -->

          <div class="flex" v-if="product.vendor.vendor_type.slug != 'service'">
            <p class="flex items-center px-2 text-xs">
              {{ $t("product.quantity") }}:
            </p>
            <!-- <div> -->
            <div class="flex items-center">
              <button
                class="flex items-center justify-center w-8 h-8 p-2 m-2 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                @click="decrement()"
              >
                <MinusIcon class="w-6 h-6 text-gray-500" />
              </button>
              <div class="w-10 h-10 overflow-hidden">
                <input
                  class="w-full h-full text-xl font-light text-center"
                  v-model="quantity"
                />
              </div>
              <button
                class="flex items-center justify-center w-8 h-8 p-2 m-2 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                @click="increment(product)"
              >
                <PlusIcon class="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <!-- </div> -->
          </div>
          <div class="" v-if="product.available_qty > 0">
            <p class="my-5 text-xs">
              {{ $t("Instock") }}: <span>{{ product.available_qty }}</span>
            </p>
          </div>
          <div v-else>
            <p class="my-5 text-xs">
              {{ $t("Outofstock") }}
            </p>
          </div>
          <div class="mt-1" v-if="settings">
            <button
              v-if="product.vendor.vendor_type.slug != 'service'"
              :style="{ 'background-color': settings.colors.primaryColor }"
              @click="addToCart(product)"
              class="w-full px-3 py-5 mr-5 text-xs font-semibold text-white md:py-4"
            >
              {{ $t("product.addtocart") }} {{ currency
              }}{{ totalPrice.toFixed(2) }}
            </button>
            <button
              v-else
              :style="{ 'background-color': settings.colors.primaryColor }"
              @click="addToCart(product)"
              class="w-full px-3 py-5 mr-5 text-xs font-semibold text-white md:py-4"
            >
              {{ $t("product.continue") }}
            </button>
          </div>
        </div>
      </div>
      <div class="mt-20" v-if="product.option_groups">
        <p class="mb-3 text-4xl" v-if="product.option_groups.length != '0'">
          {{ $t("product.optionHeader") }}
        </p>
        <p
          class="mt-4 text-sm text-gray-600"
          v-if="product.option_groups.length != '0'"
        >
          {{ $t("product.optionSubHeader") }}
        </p>

        <div
          v-for="option_group in product.option_groups"
          :key="option_group.id"
        >
          <p class="mt-4 text-xs font-medium md:text-xl">
            {{ option_group.name }}
          </p>

          <div
            class="grid gap-5 md:grid-cols-5"
            v-if="option_group.multiple == 1"
          >
            <div
              class="mt-5 bg-white shadow-md rounded-xl md:w-44"
              v-for="(option, index) in option_group.options.slice(0, 5)"
              :key="index"
            >
              <div class="flex mx-auto">
                <div class="flex items-center flex-shrink-0">
                  <img
                    class="object-contain w-14 h-14"
                    v-if="option"
                    v-bind:src="option.photo"
                    alt=""
                  />
                </div>
                <div class="self-center px-2 pt-2 md:p-4">
                  <h5 class="text-xs font-semibold text-gray-400 truncate">
                    {{ truncate(option.name, 13) }}
                  </h5>
                  <!-- <p class="text-xs text-gray-500">{{ option.description }}</p> -->
                  <div class="flex flex-row space-x-2">
                    <p class="text-xs text-center text-black">
                      {{ currency }}{{ option.price }}
                    </p>
                    <label class="">
                      <div
                        class="relative flex items-center w-4 h-4 bg-white border-2 border-gray-400 rounded-full"
                      >
                        <input
                          type="radio"
                          class="absolute opacity-0"
                          v-model="selectedOption"
                          :value="option"
                        />
                        <svg
                          class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="grid gap-5 md:grid-cols-5"
            v-else-if="option_group.multiple == 0"
          >
            <!-- .slice(0, 5) -->
            <div
              class="mt-5 bg-white shadow-md rounded-xl md:w-44"
              v-for="(option, index) in option_group.options"
              :key="index"
            >
              <div class="flex mx-auto">
                <div class="flex items-center flex-shrink-0">
                  <img
                    class="object-contain w-14 h-14"
                    v-if="option"
                    v-bind:src="option.photo"
                    alt=""
                  />
                </div>
                <div class="self-center px-2 pt-2 md:p-4">
                  <h5 class="text-xs font-semibold text-gray-400 truncate">
                    {{ truncate(option.name, 13) }}
                  </h5>

                  <div class="flex flex-row space-x-2">
                    <p class="text-xs text-center text-black">
                      {{ currency }}{{ option.price }}
                    </p>
                    <div class="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        v-model="selectedOptions"
                        :value="option"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Recommended />
  </div>
  <Download />
</template>

<script>
import axios from "axios";
import Recommended from "@/components/Recommended.vue";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Download from "@/components/Downloads.vue";
import VueHorizontal from "vue-horizontal";
import "sweetalert2/src/sweetalert2.scss";
import { PlusIcon, MinusIcon } from "@heroicons/vue/outline";
import {useStorageStore} from "@/store/storage.js";

export default {
  name: "product",
  components: {
    Recommended,
    Download,
    VueHorizontal,
    PlusIcon,
    MinusIcon,
  },
  head() {
    return {
      title: "GoGo app: Grocery,Vegetables, Food, Taxi Booking & Courier",
      meta: [
        {
          name: "description",
          content:
            "GoGo the best delivery app gets you Food, Grocery, Medicine, Pet Supplies, Fruits & Vegetables, Meat & Fish, Health & Wellness, Gifts and Send Packages from.",
        },
      ],
    };
  },
  data() {
    return {
      product: null,
      currency: null,
      limit: 5,
      quantity: 1,
      selectedOptions: [],
      selectedOption: null,
      animationDown: {
        translateY: "translateY(-100%)",
        translateY: "translateY(100%)",
      },
      settings: null,
      base_url: this.store.baseUrl,
    };
  },
  setup() {
    const store = useStorageStore();
    return { store };
  },
  computed: {
    totalPrice() {
      let total;
      if (this.product.discount_price != 0) {
        total = Number(this.quantity) * Number(this.product.discount_price);
      } else {
        total = Number(this.quantity) * Number(this.product.price);
      }

      if (this.selectedOption) {
        total += this.selectedOption.price;
      }
      if (this.selectedOptions) {
        this.selectedOptions.forEach((item, i) => {
          total += Number(item.price);
        });
      }
      return total;
    },
  },
  mounted() {
    axios
      .get(this.base_url + "api/products/" + this.$route.params.id)
      .then((response) => {
        this.product = response.data;
        // console.log(this.product)
      })
      .catch((error) => console.log(error));

    this.store.fetchSettings(this.items).then(() => {
      this.settings = this.store.settings;
      this.currency = this.settings.strings.currency;
    });
  },

  methods: {
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },

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

    addToCart(
      product,
      quantity = this.quantity,
      selectedOption = this.selectedOption,
      selectedOptions = this.selectedOptions
    ) {
      if (product.available_qty >= 0) {
        if (selectedOption) {
          this.store.addToCart({
            product,
            quantity,
            selectedOption,
            selectedOptions,
          });
        } else if (this.selectedOptions) {
          this.store.addToCart({
            product,
            quantity,
            selectedOption: this.selectedOption,
            selectedOptions: this.selectedOptions,
          });
        } else {
          this.store.addToCart({ product, quantity });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Product Available",
        });
      }
    },

    increment(product) {
      if (this.quantity >= product) {
        notify({
          type: "error",
          title: "Cart",
          text: "Product Available",
        });
      } else {
        this.quantity++;
        if (product.discount_price != 0) {
          this.totalPrice = product.discount_price + this.quantity;
        } else {
          this.totalPrice = product.price + this.quantity;
        }
      }
    },

    decrement() {
      if (this.quantity === 1) {
        notify({
          type: "error",
          title: "Cart",
          text: "You cannot add 0 product",
        });
      } else {
        this.quantity--;
      }
    },
  },
};
</script>

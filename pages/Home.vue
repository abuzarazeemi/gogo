<template>
  <div class="mx-auto md:max-w-full">
    <!-- <div class="flex-col hidden p-2 mt-8 sm:flex md:block w-72" v-if="settings">
      <img
        v-if="settings"
        :src="settings.strings.website.websiteIntroImage"
        class="w-44"
      />
      <p
        class="pt-5 text-sm font-light leading-normal text-gray-600 md:text-2l"
      >
        {{ settings.strings.app_name }} {{ $t('landingpageLeft') }}
      </p>
      <div class="flex flex-row mt-4">
        <a :href="settings.strings.androidDownloadLink" target="__blank">
          <img src="/img/play-store.png" class="h-9" />
        </a>
        <a :href="settings.strings.iosDownloadLink" target="__blank">
          <img src="/img/app-store.png" class="h-9" />
        </a>
      </div>
    </div> -->
    <!-- <div class="max-w-6xl p-5 mx-auto mt-16" v-if="settings">
      <div class="flex flex-col mx-auto">
        <p class="font-medium text-black md:text-2xl">
          {{ $t('landingpageHeader') }}
        </p>
        <p class="my-2 text-xs font-light text-black md:text-xl">
          {{ $t('landingpageSubHeader') }}
        </p>
      </div>
      <div class="">
        <p class="mt-3 text-sm font-light">Choose a service</p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5">
          <div v-for="vendor in vendors" :key="vendor.id" class="my-4">
            <a
              v-if="vendor"
              :href="`${vendor.id}/` + sanitizeTitle(`${vendor.slug}/`)+ randomString(200)"
            >
              <div
                class="flex flex-row items-center w-full h-24 p-3 rounded-md shadow-md bg-gray-50"
              >
                <img
                  v-if="vendor"
                  v-bind:src="vendor.logo"
                  class="w-16 h-16 mb-3"
                />
                <div class="ml-2">
                  <p class="font-medium md:font-bold">{{ vendor.name }}</p>
                  <p class="text-xs font-light md:text-sm">{{ truncate(vendor.description, 85) }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>


      
       <div class="flex flex-col mx-auto mt-8 rounded md:mt-20">
        <div class="flex p-3 md:justify-between md:p-8 bg-green-50">
          <div class="flex flex-col items-center justify-center w-full lg:w-112">
            <p class="font-medium">{{ $t('landingpageSellerHeader') }}</p>
            <p class="my-3 text-center text-gray-500 ">
             {{ $t('landingpageSellerSubHeader') }}
            </p>
            <a
              class="px-3 py-2 text-white bg-green-400 rounded-md shadow-sm hover:text-gray-600"
              target="__blank"
              :href="`${this.store.baseUrl}register#vendor`"
              >{{ $t('landingpageSellerButton') }}</a
            >
          </div>
          <div class="flex items-center justify-center w-full lg:w-112">
            <img src="/img/storefront.png" class="w-24 mx-auto md:w-32" alt="" />
          </div>
        </div>
      </div>
      <div class="mt-8 md:mt-20" id="services">
        <div
          class="grid gap-4 text-center md:grid-cols-2 lg:grid-cols-4"
          v-if="settings"
        >
          <div
            class="flex flex-col items-center justify-center p-2 rounded-md lg:w-full"
            :style="{ 'background-color': settings.colors.accentColor }"
          >
            <img src="/img/order1.png" class="h-12 mx-auto" />
            <h6 class="my-1 text-sm text-white capitalize">{{ $t('landingpageSellerFeat1') }}</h6>
          </div>
          <div
            class="p-2 text-center rounded-md lg:w-full justify-content-center"
            :style="{ 'background-color': settings.colors.accentColor }"
          >
            <img src="/img/delivery-truck.png" class="h-12 mx-auto" />
            <h6 class="my-1 text-sm text-white capitalize">{{ $t('landingpageSellerFeat2') }}</h6>
          </div>
          <div
            class="flex flex-col items-center justify-center p-2 rounded-md lg:w-full"
            :style="{ 'background-color': settings.colors.accentColor }"
          >
            <img src="/img/quality.png" class="h-12 mx-auto" />
            <h6 class="my-1 text-sm text-white capitalize">{{ $t('landingpageSellerFeat3') }}</h6>
          </div>
          <div
            class="flex flex-col items-center justify-center p-2 rounded-md lg:w-full"
            :style="{ 'background-color': settings.colors.accentColor }"
          >
            <img src="/img/payment.png" class="h-12 mx-auto" />
            <h6 class="my-1 text-sm text-white capitalize">
              {{ $t('landingpageSellerFeat4') }}
            </h6>
          </div>
        </div>
      </div>
     <div class="flex flex-col mx-auto mt-8 rounded-md md:mt-20">
        <div class="flex p-3 md:justify-between md:p-8 bg-green-50">
          <div class="flex flex-col items-center justify-center w-full lg:w-112">
            <p class="font-medium">{{ $t('landingpageRide.landingpageRiderHeader') }}</p>
            <p class="my-3 text-center text-gray-500">
              {{ $t('landingpageRide.landingpageRiderSubHeader') }}
            </p>
            <a class="px-3 py-2 text-white bg-green-400 rounded-md shadow-sm hover:text-gray-600"
              target="__blank"
              :href="`${this.store.baseUrl}register#driver`"
              >{{ $t('landingpageSellerButton') }}</a
            >
          </div>
          <div class="flex items-center justify-center w-full lg:w-112">
            <img src="/img/delivery-rider.png" class="w-24 mx-auto md:w-32" alt="" />
          </div>
        </div>
      </div>
    </div> -->

    <div class="layout" v-if="settings">
      <div class="main-banner">
        <h1>GoGo Multi Service App</h1>
        <p>
          Gogo all-in-one app is an on-demand taxi booking on-demand home
          services.
        </p>
        <p>
          courier delivery, grocery delivery and food delivery from your
          favourite restaurants.
        </p>
        <div class="searchbar">
          <div class="dropdown">
            <span
              ><i class="fa-regular fa-bars"></i>Select Service
              <i class="fa-solid fa-caret-down"></i
            ></span>
            <div class="dropdown-content">
              <div class="nav-link">
                <a href="#">Hello World!</a>
              </div>
              <div class="nav-link">
                <a href="#">Hello World!</a>
              </div>
              <div class="nav-link">
                <a href="#">Hello World!</a>
              </div>
              <div class="nav-link">
                <a href="#">Hello World!</a>
              </div>
              <div class="nav-link">
                <a href="#">Hello World!</a>
              </div>
            </div>
          </div>
          <div class="search">
            <input
              type="text"
              v-model="search"
              placeholder="Search a service"
              style="outline: none; color: black"
            />
          </div>
          <div class="search-btn">
            <button class="btn btn-success">
              <a :href="`/search?search=${search}`">Search</a>
            </button>
          </div>
        </div>
      </div>
      <div class="max-w-6xl1">
        <div class="center-heading">
          <h2>Pick a Service</h2>
          <div class="line"></div>
        </div>
        <div class="searvices-section">
          <div
            v-for="(vendor, index) in vendors"
            :key="vendor.id"
            :class="`serv-card card${index}`"
          >
            <a
              :href="
                `${vendor.id}/` +
                sanitizeTitle(`${vendor.slug}/`) +
                randomString(200)
              "
              class="service-anchor"
            >
              <img :src="vendor.logo" alt="" />
              <h4>{{ vendor.name }}</h4>
              <p>{{ truncate(vendor.description, 85) }}</p>
            </a>
          </div>
        </div>
      </div>
      <div class="max-w-6xl2">
        <div class="center-heading">
          <h2>Top Service</h2>
          <div class="line"></div>
        </div>
        <div class="top-services-section">
          <div class="top-card">
            <img src="@/assets/images/11.png" alt="" />
            <div class="text">
              <h4>Grocery delivery</h4>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </div>
          <div class="top-card">
            <img src="@/assets/images/22.png" alt="" />
            <div class="text">
              <h4>Grocery delivery</h4>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </div>
          <div class="top-card">
            <img src="@/assets/images/33.png" alt="" />
            <div class="text">
              <h4>Grocery delivery</h4>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-6xl3">
        <div class="center-heading">
          <h2>How to work</h2>
          <div class="line"></div>
        </div>
        <div class="how-to-work-section">
          <div class="work-card">
            <img class="user" src="@/assets/images/u1.png" alt="" />
            <h4>Place Order</h4>
          </div>
          <div class="work-card">
            <img class="arrow" src="@/assets/images/down.png" alt="" />
          </div>
          <div class="work-card">
            <img class="user" src="@/assets/images/u2.png" alt="" />
            <h4>Delivery</h4>
          </div>
          <div class="work-card">
            <img class="arrow" src="@/assets/images/up.png" alt="" />
          </div>
          <div class="work-card">
            <img class="user" src="@/assets/images/u3.png" alt="" />
            <h4>Enjoy</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="flex" v-if="settings">
      <img src="/img/landingpage1.jpg" class="hidden h-full lg:block w-72" alt="" />
    </div> -->
  </div>

  <div class="flex flex-col mx-auto rounded max-w-6xl2" v-if="settings">
    <div class="flex p-3 md:justify-between md:p-8 bg-green-50">
      <div class="flex flex-col items-center justify-center w-full lg:w-112">
        <p class="font-medium">{{ $t("landingpageSellerHeader") }}</p>
        <p class="my-3 text-center text-gray-500">
          {{ $t("landingpageSellerSubHeader") }}
        </p>
        <a
          class="px-3 py-2 text-white bg-green-400 rounded-md shadow-sm hover:text-gray-600"
          target="__blank"
          :href="`${store.baseUrl}register#vendor`"
          >{{ $t("landingpageSellerButton") }}</a
        >
      </div>
      <div class="flex items-center justify-center w-full lg:w-112">
        <img src="/img/storefront.png" class="w-24 mx-auto md:w-32" alt="" />
      </div>
    </div>
  </div>
  <div class="max-w-6xl2" id="services" v-if="settings">
    <div
      class="grid gap-4 text-center md:grid-cols-2 lg:grid-cols-4"
      v-if="settings"
    >
      <div
        class="flex flex-col items-center justify-center p-2 rounded-md lg:w-full"
        :style="`background-color: ${settings.colors.accentColor}`"
      >
        <img src="/img/order1.png" class="h-12 mx-auto" />
        <h6 class="my-1 text-sm text-white capitalize">
          {{ $t("landingpageSellerFeat1") }}
        </h6>
      </div>
      <div
        class="p-2 text-center rounded-md lg:w-full justify-content-center"
        :style="`background-color: ${settings.colors.accentColor}`"
      >
        <img src="/img/delivery-truck.png" class="h-12 mx-auto" />
        <h6 class="my-1 text-sm text-white capitalize">
          {{ $t("landingpageSellerFeat2") }}
        </h6>
      </div>
      <div
        class="flex flex-col items-center justify-center p-2 rounded-md lg:w-full"
        :style="`background-color: ${settings.colors.accentColor}`"
      >
        <img src="/img/quality.png" class="h-12 mx-auto" />
        <h6 class="my-1 text-sm text-white capitalize">
          {{ $t("landingpageSellerFeat3") }}
        </h6>
      </div>
      <div
        class="flex flex-col items-center justify-center p-2 rounded-md lg:w-full"
        :style="`background-color: ${settings.colors.accentColor}`"
      >
        <img src="/img/payment.png" class="h-12 mx-auto" />
        <h6 class="my-1 text-sm text-white capitalize">
          {{ $t("landingpageSellerFeat4") }}
        </h6>
      </div>
    </div>
  </div>
  <div class="flex flex-col mx-auto rounded-md max-w-6xl2" v-if="settings">
    <div class="flex p-3 md:justify-between md:p-8 bg-green-50">
      <div class="flex flex-col items-center justify-center w-full lg:w-112">
        <p class="font-medium">
          {{ $t("landingpageRide.landingpageRiderHeader") }}
        </p>
        <p class="my-3 text-center text-gray-500">
          {{ $t("landingpageRide.landingpageRiderSubHeader") }}
        </p>
        <a
          class="px-3 py-2 text-white bg-green-400 rounded-md shadow-sm hover:text-gray-600"
          target="__blank"
          :href="`${store.baseUrl}register#driver`"
          >{{ $t("landingpageSellerButton") }}</a
        >
      </div>
      <div class="flex items-center justify-center w-full lg:w-112">
        <img
          src="/img/delivery-rider.png"
          class="w-24 mx-auto md:w-32"
          alt=""
        />
      </div>
    </div>
  </div>

  <Download />
</template>

<script>

import axios from "axios";
import { useStorageStore } from "@/store/storage.js";
import Download from "@/components/Downloads.vue";
import { SearchIcon } from "@heroicons/vue/outline";
import { StarIcon } from "@heroicons/vue/solid";
export default {

  name: "Vendors",
  components: {
    SearchIcon,
    StarIcon,
    Download,
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
      vendors: null,
      settings: null,
      base_url: this.store.baseUrl,
      search: null,
      types: null,
    };
  },

  setup() {
    const store = useStorageStore();
    return { store };
  },

  mounted() {
    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => {
        this.settings = response.data;
      })
      .catch((error) => console.log(error));

    axios
      .get(this.base_url + "api/vendor/types")
      .then((response) => {
        this.vendors = response.data;
      })
      .catch((error) => console.log(error));
  },

  methods: {
    randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$^*()";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },

    // generate(entry) {
    //   let token = String(entry) + Math.random().toString(36);
    //   return token;
    // },
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
  },
}

</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";

h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
b,
small,
strong,
body,
button,
input,
optgroup,
select,
textarea {
  font-family: Lato !important;
}

.nav-active {
  background-color: #fff !important;
}

.service-anchor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.main-banner {
  width: 100%;
  min-height: 400px;
  background-color: #2f9e4f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  h1 {
    margin: 10px 0px;
    font-size: 35px;
    font-weight: bold;
  }
  p {
    margin: 5px 0px;
  }
  .searchbar {
    height: 50px;
    width: 600px;
    background-color: white;
    margin: 20px auto;
    border-radius: 6px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      height: 45px;
      width: calc(100% - 300px);
      input {
        height: 45px;
        width: 95%;
        border: none;
        font-size: 18px;
      }
      input::placeholder {
        color: lightgray;
      }
    }
    .search-btn {
      .btn {
        height: 40px;
        width: 120px;
        font-size: 16px;
        background-color: #2f9e4f;
        color: white;
        border: none;
        border-radius: 6px;
      }
    }
    .dropdown {
      width: 180px;
      height: 45px;
      position: relative;
      display: inline-block;
      span {
        display: flex;
        align-items: center;
        color: #2f9e4f;
        height: 45px;
        font-weight: 600;
        justify-content: center;
        .fa-bars {
          color: #2f9e4f;
          margin-right: 15px;
        }
        .fa-caret-down {
          color: #2f9e4f;
          margin-left: 15px;
        }
      }
    }

    .dropdown-content {
      display: none;
      position: absolute;
      top: 50px;
      color: black;
      background-color: #f5f5f5;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      .nav-link {
        padding: 12px 16px;
        a {
          color: black;
          text-decoration: none;
        }
      }
      .nav-link:hover {
        background-color: #2f9e4f;
        a {
          color: white !important;
        }
      }
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
  }
}
.center-heading {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 0px;
    margin-bottom: 8px;
    font-size: 40px;
  }
  .line {
    height: 4px;
    width: 130px;
    background-color: #64a87a;
  }
}

.max-w-6xl1 {
  max-width: 68rem;
  padding: 4rem 1rem;
  margin: auto;
}
.max-w-6xl2 {
  max-width: 74rem;
  padding: 4rem 1rem;
  margin: auto;
}
.max-w-6xl3 {
  max-width: 60rem;
  padding: 4rem 1rem;
  margin: auto;
}
.searvices-section {
  display: flex;
  padding-top: 40px;
  justify-content: space-between;
  .serv-card {
    cursor: pointer;
    min-height: 220px;
    border-radius: 20px;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 80px;
    }
    h4 {
      margin: 0px;
      color: white;
      font-weight: bold;
    }
    p {
      text-align: center;
      margin: 5px;
      font-size: 12px;
      color: white;
    }
  }
  .card0 {
    background-color: #8526c8;
    box-shadow: #8426c8aa 0px 4px 30px;
  }
  .card1 {
    background-color: #09a34b;
    box-shadow: #09a34caa 0px 4px 30px;
  }
  .card2 {
    background-color: #b3372d;
    box-shadow: #b3362da3 0px 4px 30px;
  }
  .card3 {
    background-color: #0d6ab0;
    box-shadow: #0d69b0a8 0px 4px 30px;
  }
  .card4 {
    background-color: #ebb306;
    box-shadow: #ebb206af 0px 4px 30px;
  }
  .card5 {
    background-color: #8526c8;
    box-shadow: #8526c8 0px 4px 30px;
  }
}

.top-services-section {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  .top-card {
    text-align: center;
    width: 30%;
    background-color: #e5e5e5;
    img {
      // height: 160px;
      width: 100%;
      object-fit: cover;
    }
    .text {
      width: 100%;
      padding: 15px 0px;
    }
    h4,
    p {
      margin: 0px;
    }
    h4 {
      font-weight: bold;
    }
  }
}
.how-to-work-section {
  display: flex;
  padding-top: 40px;
  justify-content: space-between;
  .work-card {
    width: 20%;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .user {
      height: 200px;
    }
    .arrow {
      position: relative;
      width: 100%;
    }
    h4 {
      margin: 5px;
      font-size: 18px;
    }
  }
}

@media only screen and (max-width: 991px) {
  .searvices-section .serv-card {
    width: 30%;
    margin-bottom: 30px;
  }
  .searvices-section {
    flex-wrap: wrap !important;
  }
}
@media only screen and (max-width: 768px) {
  .searvices-section .serv-card {
    width: 48%;
    margin-bottom: 30px;
  }
  .searvices-section .card5 {
    width: 100%;
  }
  .top-services-section .top-card {
    width: 100%;
    margin-bottom: 30px;
  }
  .how-to-work-section .work-card .arrow {
    display: none;
  }
  .how-to-work-section .work-card {
    width: 100%;
  }
  .how-to-work-section {
    flex-direction: column;
  }
  .how-to-work-section .work-card {
    min-height: auto;
    margin-bottom: 10px;
  }
  .main-banner .searchbar {
    width: 90%;
  }
  .main-banner p {
    font-size: 12px;
    padding: 0px 15px;
    text-align: center;
  }
  .main-banner h1 {
    font-size: 28px;
    padding: 0px 20px;
  }
  .main-banner .searchbar {
    flex-direction: column;
    height: 100%;
  }
  .main-banner .searchbar .dropdown {
    width: 100%;
    background-color: #2f9e4f40;
    border-radius: 5px;
  }
  .main-banner .searchbar .dropdown span {
    justify-content: flex-start;
    margin-left: 20px;
  }
  .main-banner .searchbar .search input {
    padding-left: 15px;
  }
  .search-btn {
    width: 100%;
    .btn {
      width: 100% !important;
    }
  }
  .main-banner .searchbar .search {
    width: 100%;
  }
  .top-services-section {
    flex-direction: column;
  }
}
</style>

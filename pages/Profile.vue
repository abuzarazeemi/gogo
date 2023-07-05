<template>
  <div class="container max-w-6xl p-5 mx-auto mt-10" v-show="isLoggedIn">
    <div class="mt-10 sm:mt-0" v-if="settings">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <!-- <p class="mb-5 text-3xl font-semibold text-black md:mb-16" v-if="user">Hello {{user.name}} 👋</p> -->
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-semibold leading-6 text-gray-600">
              {{ $t("profile.personalInformation") }}
            </h3>
            <p class="mt-1 text-sm font-light text-gray-600">
              {{ $t("profile.Hello") }} {{ user.name }} 👋
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-light text-gray-700"
                    >{{ $t("login.name") }}</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="first_name"
                    v-model="user.name"
                    class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email"
                    class="block text-sm font-light text-gray-700"
                    >{{ $t("login.email") }}</label
                  >
                  <input
                    type="email"
                    name="email"
                    v-model="user.email"
                    id="email"
                    class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email_address"
                    class="block text-sm font-light text-gray-700"
                    >{{ $t("login.phone") }}</label
                  >
                  <input
                    type="tel"
                    name="phone"
                    id="email_address"
                    v-model="user.phone"
                    class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                v-if="settings"
                @click="updateUser"
                :style="{ 'background-color': settings.colors.primaryColor }"
                class="inline-flex justify-center px-4 py-2 text-sm font-light text-white border border-transparent rounded-md shadow-sm hover:bg-green-700"
              >
                {{ $t("profile.updateProfile") }}
              </button>
            </div>
          </div>
        </div>
        <div class="mt-5 md:col-span-1">
          <!-- <p class="mb-5 text-3xl font-semibold text-black md:mb-16" v-if="user">Hello {{user.name}} 👋</p> -->
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-semibold leading-6 text-gray-600">
              {{ $t("profile.passwordChange") }}
            </h3>
            <p class="mt-1 text-sm font-light text-gray-600">
              <!-- Hello {{user.name}} 👋 -->
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="old_password"
                    class="block text-sm font-light text-gray-700"
                    >{{ $t("profile.oldPassword") }}</label
                  >
                  <input
                    type="text"
                    id="old_password"
                    v-model="old_password"
                    class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="new_password"
                    class="block text-sm font-light text-gray-700"
                    >{{ $t("profile.newPassword") }}</label
                  >
                  <input
                    type="new_password"
                    v-model="new_password"
                    id="email"
                    class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="password_confirmation"
                    class="block text-sm font-light text-gray-700"
                    >{{ $t("profile.confirmPassword") }}</label
                  >
                  <input
                    type="text"
                    id="password_confirmation"
                    v-model="password_confirmation"
                    class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                v-if="settings"
                @click="updatePassword"
                :style="{ 'background-color': settings.colors.primaryColor }"
                class="inline-flex justify-center px-4 py-2 text-sm font-light text-white border border-transparent rounded-md shadow-sm hover:bg-green-700"
              >
                {{ $t("profile.updatePassword") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:mt-20 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="mt-5 mb-5 text-lg font-semibold leading-6 text-gray-600">
              {{ $t("deliveryAddress") }}
            </h3>
            <button
              v-if="settings"
              class="px-5 py-2 text-sm font-light text-white rounded shadow-md"
              :style="{ 'background-color': settings.colors.primaryColor }"
              v-on:click="toggleModal()"
            >
              {{ $t("deliveryAddress") }}
            </button>
          </div>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
              <fieldset>
                <legend
                  class="text-base font-semibold text-gray-600"
                  v-if="addresses"
                >
                  {{ $t("profile.address") }}
                </legend>
                <div v-if="addresses">
                  <div v-if="addresses.length == 0">
                    <p class="mt-5 text-center">
                      {{ $t("profile.noAddress") }}
                    </p>
                  </div>
                  <div v-for="address in addresses" :key="address.id">
                    <div
                      class="relative w-full p-5 mt-4 border border-gray-100 rounded-md h-28"
                      v-if="settings"
                    >
                      <button
                        @click="destroy(address)"
                        class="absolute top-0 right-0 p-2 rounded-md shadow-md"
                        :style="{
                          'background-color': settings.colors.primaryColor,
                        }"
                      >
                        <TrashIcon
                          class="w-3 h-3 mt-1 text-white cursor-pointer md:w-6 md:h-6"
                          aria-hidden="true"
                        />
                      </button>
                      <div>
                        <p class="font-semibold text-gray-600">
                          {{ address.name }}
                        </p>
                        <p class="font-light text-gray-600">
                          {{ address.address }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 md:col-span-2">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <p class="text-white">
              gogo.com.np is the ultimate online shopping destination for
              Bangladesh offering completely hassle-free shopping experience
              through secure and trusted gateways. We offer you trendy and
              reliable shopping with all your favorite brands and more. Now
              shopping is easier, faster and always joyous. We help you make the
              right choice here. PriyoShop.com has been launched in February
              2013. PriyoShop.com showcases products from all categories such as
              clothing, footwear, jewelry, accessories, electronics, appliance,
              health care, beauty products, and still counting! Our collection
              combines the latest in fashion trends as well as the all-time
              favorites. Our products are exclusively selected for you. We, at
              PriyoShop, have all that you need under one umbrella. In tune with
              the vision Digital Bangladesh, PriyoShop.com opens the doorway for
              everybody to shop over the Internet. We constantly update with lot
              of new products, services and special offers. We provide on-time
              delivery of products and quick resolution of any concerns. We
              provide our customers with memorable online shopping experience.
              Our dedicated PriyoShop quality assurance team works round the
              clock to personally make sure the right packages reach on time.
              You can choose whatever you like. We deliver it right at your
              address across Bangladesh. Our services are at your doorsteps all
              the time. Get the best products with the best online shopping
              experience every time. You will enjoy online shopping here!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
  >
    <div class="relative w-auto max-w-6xl mx-auto my-6">
      <div
        class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"
      >
        <div
          class="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200"
        >
          <h3 class="text-3xl font-semibold">
            {{ $t("addAddress") }}
          </h3>
          <button
            class="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
            v-on:click="toggleModal()"
          >
            <span
              class="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none"
            >
              ×
            </span>
          </button>
        </div>

        <div class="relative flex-auto p-6">
          <div class="grid grid-cols-1 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="name"
                class="block text-sm font-light text-gray-600"
                >{{ $t("login.name") }}</label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="name"
                class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <span class="flex flex-row mb-2 space-x-4">
                <GMapAutocomplete
                  placeholder="search your location"
                  @place_changed="setPlace"
                  class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                </GMapAutocomplete>
                <button
                  class="px-4 text-base text-white bg-green-500 rounded-md"
                  @click="addMarker"
                >
                  find
                </button>
              </span>
              <GMapMap
                :center="center"
                :zoom="zoomset"
                map-type-id="roadmap"
                style="width: 500px; height: 300px"
              >
                <!-- <GMapCluster> -->
                <GMapMarker
                  @drag="handleMarkerDrag"
                  :position="markers.position"
                  :clickable="true"
                  :draggable="true"
                />
                <!-- </GMapCluster> -->
              </GMapMap>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="defaults"
                    v-model="is_default"
                    type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="offers" class="font-medium text-gray-700"
                    >Default</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between p-6 border-t border-solid rounded-b border-blueGray-200"
        >
          <button
            class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear bg-transparent outline-none hover:bg-red-500 hover:text-white active:bg-red-600 focus:outline-none"
            type="button"
            v-on:click="toggleModal()"
          >
            Close
          </button>
          <button
            @click="addressSave"
            class="px-6 py-2 mb-1 mr-1 text-sm font-bold text-green-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
            type="button"
            v-on:click="toggleModal()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
  <Download />
</template>

<script>
import axios from "axios";
import Download from "@/components/Downloads.vue";
import { notify } from "@kyvg/vue3-notification";
import { LocationMarkerIcon, TrashIcon } from "@heroicons/vue/solid";
import { useStorageStore } from "@/store/storage";

export default {
  components: {
    LocationMarkerIcon,
    TrashIcon,
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
      isLoggedIn: false,
      user: {
        name: "",
        email: "",
        phone: "",
        photo: "",
        id: null,
      },
      profile: null,
      showModal: false,
      addresses: null,
      AuthStr: null,
      name: "",
      is_default: "",
      old_password: null,
      new_password: null,
      password_confirmation: null,
      markers: [],
      center: { lat: 8.7832, lng: 34.5085 },
      autocomplete: null,
      map: null,
      places: [],
      currentPlace: null,
      zoomset: 1,
      settings: null,
      base_url: this.store.baseUrl,
    };
  },

  setup() {
    const store = useStorageStore();
    return { store };
  },

  mounted() {
    this.AuthStr = `Bearer ${
      !process.server ? localStorage.getItem("authToken") : null
    }`;

    this.store.setLoading(true);
    axios
      .get(this.base_url + "api/delivery/addresses", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.store.setLoading(false);
        this.addresses = response.data.data;
      })
      .catch((error) => console.log(error));

    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => (this.settings = response.data))
      .catch((error) => console.log(error));

    if (!process.server ? localStorage.getItem("authToken") : null) {
      this.isLoggedIn = true;
      this.user = JSON.parse(
        !process.server ? localStorage.getItem("user") : null
      );

      this.profile = JSON.parse(
        !process.server ? localStorage.getItem("user") : null
      );
    }

    if (this.isLoggedIn == false) {
      this.$router.push("/login");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.markers.position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  },
  methods: {
    toggleModal: function () {
      this.showModal = !this.showModal;
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };

        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.markers.position = marker;
        this.center = marker;
        this.zoomset = 18;
      }
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.markers.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.markers.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },

    destroy(address) {
      let deliveryAddress = this.addresses.find((a) => a.id == address.id);
      axios
        .delete(
          `${this.base_url}api/delivery/addresses/${deliveryAddress.id}`,
          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then(function (response) {
          console.log(response);
          notify({
            type: "success",
            title: "Delete",
            text: "Address deleted successfully",
          });
          window.location.href = "/profile";
        })
        .catch((error) => console.log(error));
    },

    updateUser() {
      axios
        .put(
          `${this.base_url}api/profile/update/`,
          {
            name: this.user.name,
            phone: this.user.phone,
            email: this.user.email,
            // photo: ''
          },
          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then((response) => {
          console.log(response);
          const profile = JSON.parse(
            !process.server ? localStorage.getItem("user") : null
          );
          // const index = profile.findIndex(({ id }) => id === this.profile.id);
          if (profile.id == this.user.id) {
            profile.name = this.user.name;
            profile.phone = this.user.phone;
            profile.email = this.user.email;
            !process.server
              ? localStorage.setItem("user", JSON.stringify(profile))
              : null;
          }
          notify({
            type: "success",
            title: "User",
            text: response.data.message,
          });
          window.location.href = "/profile";
        })
        .catch((error) => console.log(error));
    },

    updatePassword() {
      axios
        .put(
          `${this.base_url}api/profile/password/update/`,
          {
            password: this.old_password,
            new_password: this.new_password,
            new_password_confirmation: this.password_confirmation,
            // photo: ''
          },
          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then((response) => {
          notify({
            type: "success",
            title: "User",
            text: response.data.message,
          });
          window.location.href = "/profile";
        })
        .catch((error) => console.log(error));
    },

    addressSave() {
      let location = this.currentPlace.geometry.location;
      let long = location.lng();
      let lat = location.lat();
      let address = this.currentPlace.name;
      axios
        .post(
          `${this.base_url}api/delivery/addresses`,
          {
            name: this.name,
            is_default: this.is_default,
            longitude: long,
            latitude: lat,
            address: address,
          },

          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then(function (response) {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

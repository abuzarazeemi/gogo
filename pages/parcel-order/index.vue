<template>
  <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
    <div class="max-w-xl mx-auto mt-5 overflow-hidden shadow sm:rounded-md">
      <div class="">
        <!-- <form action="#" method="POST"> -->
        <div class="">
          <div class="px-4 py-5 bg-white sm:p-6" v-if="packageTypeView == true">
            <p class="font-bold">{{ $t('parcel.sendPackages') }}</p>
            <div class="flex justify-between">
              <p class="my-1 text-xs font-light text-gray-500">
                {{ $t('parcel.subHeader2') }}
              </p>
              <!-- <button @click="clearAll()" class="text-sm text-green-400">
                {{ $t('parcel.clearAll') }}
              </button> -->
            </div>

            <!-- <p class="text-xl font-extrabold">Package Type</p> -->
            <div class="flex flex-col mt-5">
              <div class="grid grid-cols-1 gap-2 md:grid-cols-1">
                <div
                  class="flex items-center justify-between w-full p-2 mb-3 border border-gray-100 rounded shadow focus:border-blue-400"
                  v-for="packageType in packageTypes" :key="packageType.id">
                  <img :src="packageType.photo" class="h-12" alt="">
                  <div class=" w-88">
                    <h5 class="text-sm text-gray-600">{{ packageType.name }}</h5>
                    <p class="text-xs text-gray-500 truncate">{{ packageType.description }}</p>
                  </div>
                  <input type="radio" v-model="selectedPackageType" :value="packageType"
                    class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </div>
              </div>
              <div v-if="selectedPackageType == null" class="w-24 p-2 text-center text-gray-500 bg-gray-300 rounded">
                Next</div>
              <button v-else @click="toAddress" class="w-24 p-2 text-white bg-green-300 rounded">Next</button>
            </div>

          </div>
          <div class="px-4 py-5 bg-white sm:p-6" v-if="packageTypeView == false && addressView == true">
            <p class="font-bold">{{ $t('parcel.deliveryInfo') }}</p>
            <!-- <div class="flex justify-between">
              <p class="my-1 text-xs font-light text-gray-500">
                {{ $t('parcel.subHeader2') }}
              </p>
            </div> -->
            <div class="flex flex-col">
              <div class="mb-3">
                <label for="from" class="space-x-2 text-xl font-medium text-gray-700">
                  <div class="flex justify-between">
                    <div class="flex space-x-2">
                      <TruckIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                      <span class="block mt-1 text-sm font-medium text-gray-700">{{ $t('parcel.pickupLocation') }}<span
                          class="text-red-500">*</span>
                      </span>
                    </div>
                    <a href="/profile" class="text-sm font-medium text-green-500 hover:underline">{{ $t('addAddress')
                    }}</a>
                  </div>
                </label>
                <div v-for="(selectedPickAddress, index) in pickups" :key="index"
                  class="flex items-center input wrapper">
                  <select id="to" v-model="selectedPickAddress.from"
                    class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="0">Select option</option>
                    <option v-for="from in addresses" :value="from" :key="from.id">
                      {{ from.name }} [{{ from.address }}]
                    </option>
                  </select>

                  <button @click="addField(selectedPickAddress, pickups)">
                    <PlusCircleIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                  </button>

                  <button v-show="pickups.length > 1" @click="removeField(index, pickups)">
                    <MinusCircleIcon class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6" aria-hidden="true" />
                  </button>

                </div>
                <input v-if="fromError" type="text" v-model="fromError" class="w-full text-red-500" />
                <input v-else type="text" v-model="fromSuccess" class="w-full text-green-500" />
                <!-- <input type="text" name="from" id="from" v-model="from" placeholder="Pickup" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /> -->
              </div>

              <div class="mb-5">
                <label for="to" class="block space-x-2 text-xl font-medium text-gray-700 sm:flex">
                  <LocationMarkerIcon class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6" aria-hidden="true" />
                  <span class="block mt-1 text-sm font-medium text-gray-700">{{ $t('parcel.dropoffLocation') }}<span
                      class="text-red-500">*</span>
                  </span>
                </label>

                <div v-for="(input, index) in dropOffs" :key="index" class="flex items-center input wrapper">
                  <select required id="to" v-model="input.to"
                    class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="0">Select option</option>
                    <option v-for="to in addresses" :value="to" :key="to.id">
                      {{ to.name }} [{{ to.address }}]
                    </option>
                  </select>

                  <button @click="addField(input, dropOffs)">
                    <PlusCircleIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                  </button>

                  <button v-show="dropOffs.length > 1" @click="removeField(index, dropOffs)">
                    <MinusCircleIcon class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6" aria-hidden="true" />
                  </button>

                </div>
                <input v-if="toError" type="text" v-model="toError" class="w-full text-red-500" />
                <input v-else type="text" v-model="toSuccess" class="w-full text-green-500" />
              </div>
            </div>
            <div class="flex justify-between">
              <button @click="backToPackageType" class="w-24 p-2 text-white bg-green-300 rounded">Previous</button>
              <div v-if="dropOffs[0]['to'] == '' || pickups[0]['from'] == ''"
                class="w-24 p-2 text-center text-gray-500 bg-gray-300 rounded">Next</div>
              <button v-else @click="toCourier" class="w-24 p-2 text-white bg-green-300 rounded">Next</button>
            </div>

          </div>
          <div class="px-4 py-5 bg-white sm:p-6"
            v-if="packageTypeView == false && addressView == false && courierView == true">
            <p class="font-bold">{{ $t('parcel.sendPackages') }}</p>
            <div class="flex justify-between">
              <p class="my-1 text-xs font-light text-gray-500">
                {{ $t('parcel.subHeader2') }}
              </p>
              <!-- <button @click="clearAll()" class="text-sm text-green-400">
                {{ $t('parcel.clearAll') }}
              </button> -->
            </div>

            <!-- <p class="text-xl font-extrabold">Package Type</p> -->
            <div class="flex flex-col mt-5">
              <div class="grid grid-cols-1 gap-2 md:grid-cols-1">
                <span class="" v-if="couriers.length > 0">
                  <div
                    class="flex items-center justify-between w-full p-2 mb-3 border border-gray-100 rounded shadow focus:border-blue-400"
                    v-for="courier in couriers" :key="courier.id">
                    <img :src="courier.feature_image" class="h-8" alt="">
                    <div class=" w-88">
                      <h5 class="text-sm text-gray-600">{{ courier.name }}</h5>
                      <p class="text-xs text-gray-500 truncate">{{ courier.description }}</p>
                    </div>
                    <input type="radio" v-model="selectedCourier" :value="courier"
                      class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  </div>
                </span>
                <p v-else class="text-sm font-light text-center text-gray-500">No Courier for this
                  location</p>
              </div>
              <div class="flex justify-between mt-5">
                <button @click="backToAddress" class="w-24 p-2 text-white bg-green-300 rounded">Previous</button>
                <div v-if="selectedCourier == null" class="w-24 p-2 text-center text-gray-500 bg-gray-300 rounded">
                  Next</div>
                <button v-else @click="toRecipients" class="w-24 p-2 text-white bg-green-300 rounded">Next</button>
              </div>
            </div>

          </div>
          <div class="px-4 py-5 bg-white sm:p-6"
            v-if="packageTypeView == false && addressView == false && courierView == false && recipientView == true">
            <p class="mb-1 text-3xl font-extrabold">{{ $t('parcel.recipients') }}</p>
            <p class="mb-5 text-xs font-light text-gray-500">{{ $t('parcel.recipientInfo') }}</p>

            <div class="flex flex-col">
              <p>{{ $t('parcel.contactInfo') }}({{ recipient.name }})</p>
              <div class="mb-3">
                <label for="name" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <UserIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                  <span>{{ $t('login.name') }} <span class="text-red-500">*</span></span>
                </label>
                <input type="text" name="name" v-model="recipient.name" placeholder="John Doe"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div class="mb-3">
                <label for="phone" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <PhoneIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                  <span>{{ $t('login.phone') }} <span class="text-red-500">*</span></span>
                </label>
                <input type="tel" name="phone" v-model="recipient.phone" id="phone" placeholder="08000000000"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div class="">
                <label for="note" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <AnnotationIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                  <span>{{ $t('parcel.notes') }}</span>
                </label>
                <textarea id="about" name="about" v-model="recipient.note" rows="3"
                  class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com" />
              </div>
              <!-- <p class="my-2 text-xs text-gray-500">By confirming I accept this order doesn’t contain illegal/resticted items, if illegal/restricted items are found by Dunzo Partner, they may report it to the law enforcement authorities. Terms and Conditions</p> -->
            </div>

            <div class="flex flex-col mt-5">
              <p>{{ $t('parcel.contactInfo') }} ({{ recipient.name1 }})</p>
              <div class="mb-3">
                <label for="name" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <UserIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                  <span>{{ $t('login.name') }} <span class="text-red-500">*</span></span>
                </label>
                <input type="text" name="name" v-model="recipient.name1" placeholder="John Doe"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div class="mb-3">
                <label for="phone" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <PhoneIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                  <span>{{ $t('login.phone') }} <span class="text-red-500">*</span></span>
                </label>
                <input type="tel" name="phone" v-model="recipient.phone1" id="phone" placeholder="08000000000"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div class="">
                <label for="note" class="block mt-1 space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <AnnotationIcon class="w-4 h-4 mt-1 text-green-500" aria-hidden="true" />
                  <span>{{ $t('parcel.notes') }}</span>
                </label>
                <textarea id="about" name="about" v-model="recipient.note1" rows="3"
                  class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com" />
              </div>
              <p class="my-2 text-xs text-gray-500" v-if="settings">{{ $t('parcel.disclaimer') }} {{ settings.app_name
              }}
                {{ $t('parcel.disclaimer2') }}</p>
            </div>

            <div class="flex justify-between mt-5">
              <button @click="backToCourier" class="w-24 p-2 text-white bg-green-300 rounded">Previous</button>
              <div
                v-if="recipient.name == '' && recipient.phone == '' && recipient.name1 == '' && recipient.phone1 == ''"
                class="w-24 p-2 text-center text-gray-500 bg-gray-300 rounded">Next</div>
              <button v-else @click="toParameters" class="w-24 p-2 text-white bg-green-300 rounded">Next</button>
            </div>

          </div>
          <div class="px-4 py-5 bg-white sm:p-6"
            v-if="packageTypeView == false && addressView == false && courierView == false && recipientView == false && parametersView == true">
            <p class="mb-1 text-3xl font-extrabold">{{ $t('parcel.packageParameters') }}</p>
            <p class="mb-5 text-xs font-light text-gray-500">{{ $t('parcel.subHeader3') }}</p>
            <div class="flex flex-col">
              <div class="mb-3">
                <label for="weight" class="block space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <span>{{ $t('parcel.weight') }}(kg) <span class="text-red-500">*</span></span>
                </label>
                <input type="number" v-model="parameters.weight" name="weight" id="weight" placeholder="10"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div class="mb-3">
                <label for="width" class="block space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <span>{{ $t('parcel.width') }}(cm)</span>
                </label>
                <input type="number" v-model="parameters.width" name="width" id="width" placeholder="10"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div class="mb-3">
                <label for="height" class="block space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  <span>{{ $t('parcel.height') }}(kg)</span>
                </label>
                <input type="number" v-model="parameters.height" name="height" id="height" placeholder="10"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div class="">
                <label for="plength" class="block space-x-2 text-sm font-medium text-gray-700 sm:flex">
                  {{ $t('parcel.length') }}(kg)
                </label>
                <input type="number" v-model="parameters.length" name="plength" id="plength" placeholder="10"
                  class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="flex justify-between mt-5">
              <button @click="backToCourier" class="w-24 p-2 text-white bg-green-300 rounded">Previous</button>
              <div
                v-if="parameters.weight == 0 && parameters.width == 0 && parameters.height == 0 && parameters.length == 0"
                class="w-24 p-2 text-center text-gray-500 bg-gray-300 rounded">Next</div>
              <button v-else @click="toSummary" class="w-24 p-2 text-white bg-green-300 rounded">Next</button>
            </div>

          </div>
          <div class="px-4 py-5 bg-white sm:p-6"
            v-if="packageTypeView == false && addressView == false && courierView == false && recipientView == false && parametersView == false && summaryView == true">
            <div class="px-4 py-5 bg-white sm:p-6">
              <p class="mb-5 text-2xl font-extrabold">{{ $t('cart.orderSummary') }}</p>
              <div class="flex flex-col">
                <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.packageTypes') }}</p>
                <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                  <div class="flex flex-row space-x-2" v-if="selectedPackage">
                    <img :src="selectedPackage.photo" class="w-8 h-8">
                    <div>
                      <p class="text-xs font-medium text-gray-500">{{ selectedPackage.name }}</p>
                      <p class="text-xs font-light text-gray-500">{{ selectedPackage.description }}</p>
                    </div>
                  </div>
                </div>
                <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.courierVendors') }}</p>
                <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                  <div class="flex flex-row space-x-2" v-if="selectedPackageCourier">
                    <img :src="selectedPackageCourier.logo" class="w-8 h-8">
                    <div>
                      <p class="text-xs font-medium text-gray-500">{{ selectedPackageCourier.name }}</p>
                      <p class="text-sm font-light text-gray-500">{{ selectedPackageCourier.description }}</p>
                    </div>
                  </div>
                </div>
                <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.deliveryDetails') }}</p>
                <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                  <div class="grid gap-2 md:grid-cols-2">

                    <div v-for="pick in selectedPickAddress" :key="pick.id">
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.pickup') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ pick.from.address }}</p>
                    </div>
                    <div v-for="drop in selectedDestAddress" :key="drop.id">
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.dropoffs') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ drop.to.address }}</p>
                    </div>
                  </div>

                  <!-- <div class="grid gap-2 mt-3 md:grid-cols-2">
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.date') }}</p>
                      <p class="text-xs font-normal text-gray-500" v-if="date">{{ date }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.time') }}</p>
                      <p class="text-xs font-normal text-gray-500" v-if="time">{{ time }}</p>
                    </div>
                  </div> -->
                </div>
                <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.recipientInfo') }}</p>
                <div class="p-5 border-2 border-green-500 rounded-md shadow-md" v-if="selectedRecipientsObj">
                  <div class="flex justify-between">
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('login.name') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedRecipientsObj.name }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('login.phone') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedRecipientsObj.phone }}</p>
                    </div>
                  </div>
                  <p class="text-xs font-bold text-gray-700">{{ $t('parcel.notes') }}</p>
                  <p class="text-xs font-normal text-gray-500">{{ selectedRecipientsObj.note }}</p>
                </div>
                <div class="p-5 mt-5 mb-1 border-2 border-green-500 rounded-md shadow-md" v-if="selectedRecipientsObj">
                  <div class="flex justify-between">
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('login.name') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedRecipientsObj.name1 }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('login.phone') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedRecipientsObj.phone1 }}</p>
                    </div>
                  </div>
                  <p class="text-xs font-bold text-gray-700">{{ $t('parcel.notes') }}</p>
                  <p class="text-xs font-normal text-gray-500">{{ selectedRecipientsObj.note1 }}</p>
                </div>
                <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.packageParameters') }}</p>
                <div class="p-5 border-2 border-green-500 rounded-md shadow-md" v-if="selectedPackageParameters">
                  <div class="flex justify-between">
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.weight') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedPackageParameters.weight }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.length') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedPackageParameters.length }}</p>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.width') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedPackageParameters.width }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-gray-700">{{ $t('parcel.height') }}</p>
                      <p class="text-xs font-normal text-gray-500">{{ selectedPackageParameters.height }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-5">
                <button @click="backToPackageParameters"
                  class="w-24 p-2 text-white bg-green-300 rounded">Previous</button>

                <button @click="toPayment" class="w-24 p-2 text-white bg-green-300 rounded">Next</button>
              </div>
            </div>
          </div>
          <div class="px-4 py-5 bg-white sm:p-6"
            v-if="packageTypeView == false && addressView == false && courierView == false && recipientView == false && parametersView == false && summaryView == false && paymentView == true">
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
                <p class="text-xl">Who to pay?</p>
                <div class="grid gap-2 md:grid-cols-2">
                  <div class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-60 rounded-xl">
                    <div class="flex justify-between">

                      <div class="self-center px-2">
                        <div class="self-center text-xs text-gray-600 md:text-sm">
                          Sender
                        </div>
                      </div>
                      <label class="self-center md:items-start md:justify-start md:flex">
                        <div
                          class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                          <input type="radio" class="absolute opacity-0" v-model="payer" value="1" />
                          <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                            viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        </div>
                        <!-- <div class="text-sm font-medium text-black md:text-base">{{ paymentMethod.name }}</div> -->
                      </label>
                    </div>
                  </div>
                  <div class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-60 rounded-xl">
                    <div class="flex justify-between">

                      <div class="self-center px-2">
                        <div class="self-center text-xs text-gray-600 md:text-sm">
                          Receiver
                        </div>
                      </div>
                      <label class="self-center md:items-start md:justify-start md:flex">
                        <div
                          class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                          <input type="radio" class="absolute opacity-0" v-model="payer" value="0" />
                          <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                            viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        </div>
                        <!-- <div class="text-sm font-medium text-black md:text-base">{{ paymentMethod.name }}</div> -->
                      </label>
                    </div>
                  </div>
                </div>

                <p class="mt-5 text-base" v-if="user">{{ $t('paymentMethods') }}</p>
                <div class="grid gap-2 md:grid-cols-2">
                  <div class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-60 rounded-xl"
                    v-for="(method, index) in methods" :key="index">
                    <div class="flex justify-between">
                      <div class="flex-shrink-0">
                        <img class="self-center object-cover w-8 h-8" v-if="method" v-bind:src="method.photo"
                          alt="Man looking at item at a store" />
                      </div>
                      <div class="self-center px-2">
                        <div class="self-center text-xs text-gray-600 md:text-sm">
                          {{ method.name }}
                        </div>
                      </div>
                      <label class="self-center md:items-start md:justify-start md:flex">
                        <div
                          class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                          <input type="radio" class="absolute opacity-0" v-model="paymentMethod" :value="method" />
                          <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                            viewBox="0 0 20 20">
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
            <div class="flex justify-between mt-5">
              <button @click="backToSummary" class="w-24 p-2 text-white bg-green-300 rounded">Previous</button>

              <button @click="makePayment" class="w-24 p-2 text-white bg-green-300 rounded">Pay</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <Download />
</template>
<script>
import axios from "axios";
import {
  TruckIcon,
  ClockIcon,
  CalendarIcon,
  PlusSmIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  UserIcon, PhoneIcon, AnnotationIcon
} from "@heroicons/vue/outline";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import Navigation from '@/components/parcel/Navigation.vue';
import Download from "@/components/Downloads.vue";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {useStorageStore} from '@/store/storage.js';

export default {
  components: {
    LocationMarkerIcon,
    TruckIcon,
    ClockIcon,
    CalendarIcon,
    PlusSmIcon,
    PlusCircleIcon,
    MinusCircleIcon,
    Download,
    Navigation,
    UserIcon,
    PhoneIcon,
    AnnotationIcon
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
      packageTypeView: false,
      addressView: false,
      courierView: false,
      parametersView: false,
      recipientView: false,
      summaryView: false,
      paymentView: false,
      packageTypes: [],
      couriers: [],
      packageType: 0,
      courier: 0,
      payer: '',
      parameters: {
        weight: 0,
        width: 0,
        height: 0,
        length: 0
      },
      recipient: {
        name: "",
        phone: "",
        note: "",
        name1: "",
        phone1: "",
        note1: "",
      },

      selectedPackageType: null,
      selectedCourier: null,
      isLoggedIn: false,
      user: null,
      addresses: null,
      showModal: false,
      addAddress: false,
      fromError: "",
      toError: "",
      from: "",
      to: "",
      dropOffs: [{ to: "" }],
      pickups: [{ from: "" }],
      date: "",
      time: "",
      AuthStr: "",
      base_url: this.store.baseUrl,
      pickup1: null,
      pickup: null,
      fromSuccess: "",
      toSuccess: "",
      settings: null,
      selectedPackage: null,
      selectedPickAddress: null,
      selectedDestAddress: null,
      selectedPackageCourier: null,
      selectedRecipientsObj: null,
      selectedParameters: null,
      settings: null,
      currency: "",
      methods: [],
      summary: null,
      paymentMethod: null,
      stateView: null,
      cityView: null
    };
  },

  setup() {
    const store = useStorageStore();
    return { store };
  },

  mounted() {

    this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`


    this.store.fetchSettings(this.items).then(() => {
      this.settings = this.store.settings;
      this.currency = this.settings.strings.currency
    })


    axios
      .get(this.base_url + "api/delivery/addresses", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.addresses = response.data.data
      })
      .catch((error) => console.log(error));



    if (!process.server ? localStorage.getItem("authToken") : null) {
      this.isLoggedIn = true;
      this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null);
    }

    if (this.isLoggedIn == false) {
      this.$router.push("/login");
    }

    this.getPackageTypes();

    // this.getCouriers();

    // if (this.$route.query.packageType) {
    //   this.packageType = this.$route.query.packageType;
    // }

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


    this.selectedPackage = JSON.parse(!process.server ? localStorage.getItem("packageType") : null);
    this.selectedPickAddress = JSON.parse(!process.server ? localStorage.getItem("pickups") : null);
    this.selectedDestAddress = JSON.parse(!process.server ? localStorage.getItem("destinations") : null);
    this.selectedPackageCourier = JSON.parse(!process.server ? localStorage.getItem("courier") : null);
    let selectedRecipients = !process.server ? localStorage.getItem("recipients") : null;
    this.selectedRecipientsObj = JSON.parse(selectedRecipients);
    let parameters = !process.server ? localStorage.getItem("parameters") : null;
    this.selectedPackageParameters = JSON.parse(parameters);
    if (this.selectedPackage != null) {
      this.packageTypeView = false;
      this.addressView = true;
    } if (this.selectedPickAddress != null && this.selectedDestAddress != null) {
      this.addressView = false;
      this.courierView = true;
      this.packageTypeView = false;
    } if (this.selectedPackageCourier != null) {
      this.addressView = false;
      this.courierView = false;
      this.packageTypeView = false;
      this.recipientView = true;
    } if (this.selectedRecipientsObj != null) {
      this.addressView = false;
      this.courierView = false;
      this.packageTypeView = false;
      this.recipientView = false;
      this.parametersView = true;
    } if (this.selectedPackageParameters != null) {
      this.addressView = false;
      this.courierView = false;
      this.packageTypeView = false;
      this.recipientView = false;
      this.parametersView = false;
      this.summaryView = true;
    } else {
      this.packageTypeView = true;
    }
  },

  methods: {
    toAddress() {
      !process.server ? localStorage.setItem("packageType", JSON.stringify(this.selectedPackageType)) : null;
      this.packageTypeView = false;
      this.addressView = true;
    },

    toCourier() {

      !process.server ? localStorage.setItem("pickups", JSON.stringify(this.pickups)) : null;
      !process.server ? localStorage.setItem("destinations", JSON.stringify(this.dropOffs)) : null;
      // window.location.reload();
      let vendor = JSON.parse(!process.server ? localStorage.getItem("packageType") : null);

      if (vendor != null) {
        this.store.setLoading(true)
        axios.get(this.base_url + "api/vendors?type=package", {
          params: {
            package_type_id: vendor.id,
            vendor_type_id: vendor.id,
          },
          headers: { Authorization: this.AuthStr }
        }).then(function (response) {
          this.couriers = response.data.data;
          console.log("courier", this.couriers)
          this.store.setLoading(false)

        }.bind(this)).catch(function (error) {
          console.log(error);
        }.bind(this));
      }

      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = true;
    },

    toRecipients() {
      !process.server ? localStorage.setItem("courier", JSON.stringify(this.selectedCourier)) : null;
      let getPickups = JSON.parse(!process.server ? localStorage.getItem("pickups") : null);
      let getDestinations = JSON.parse(!process.server ? localStorage.getItem("destinations") : null);
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;


      let countrires = this.selectedCourier.countries
      let cities = this.selectedCourier.cities
      let states = this.selectedCourier.states

      for (let country of countrires) {
        if (country.name === getPickups[0].from.country && country.name === getDestinations[0].to.country) {
          this.courierView = false;
          this.recipientView = true;
          for (let city of cities) {
            this.cityView = city
          }
          break
        } else if (this.cityView) {
          if (this.cityView.name === getPickups[0].from.city && this.cityView.name === getDestinations[0].to.city) {
            this.courierView = false;
            this.recipientView = true;
            for (let state of states) {
              this.stateView = state
            }
            break
          }
        } else if (this.stateView) {
          if (this.stateView.name === getPickups[0].from.state && this.stateView.name === getDestinations[0].to.state) {
          this.courierView = false;
          this.recipientView = true;
          break
          }
        } else {
          this.courierView = true;
          this.recipientView = false;
          if (country.name !== getPickups[0].from.country) {
            notify({
              type: "error",
              title: "Courier",
              text: 'Vendor Does not service this location',
            })
          }

        }
      }
    },

    toParameters() {
      !process.server ? localStorage.setItem("recipients", JSON.stringify(this.recipient)) : null;
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;
      this.recipientView = false;
      this.parametersView = true;
    },

    toSummary() {
      window.location.reload();
      !process.server ? localStorage.setItem("parameters", JSON.stringify(this.parameters)) : null;
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;
      this.recipientView = false;
      this.parametersView = false;
      this.summaryView = true;
    },

    toPayment() {
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;
      this.recipientView = false;
      this.parametersView = false;
      this.summaryView = false;
      this.paymentView = true;
      axios
        .get(this.base_url + "api/payment/methods", {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => (this.methods = response.data.data))
        .catch((error) => console.log(error));

      // order summary method
      axios
        .get(this.base_url + "api/package/order/summary",
          {
            params: {
              vendor_id: this.selectedPackageCourier.id,
              package_type_id: this.selectedPackage.id,
              pickup_location_id: this.selectedPickAddress[0].from.id,
              dropoff_location_id: this.selectedDestAddress[0].to.id,
              weight: this.selectedPackageParameters.weight,
            },
            headers: { Authorization: this.AuthStr },
          })
        .then((response) => {
          this.summary = response.data;
        })
        .catch((error) => console.log(error));
    },

    makePayment() {
      if (this.paymentMethod == null) {
        notify({
          type: "error",
          title: "Order Checkout",
          text: 'select a payment method',
        })
      } else {
        if (this.user)
          this.store.setLoading(true)
        let total_price = this.summary.total
        axios.post(this.base_url + 'api/orders',
          {
            total: total_price,
            sub_total: this.summary.sub_total,
            tax: this.summary.tax,
            note: this.note,
            discount: this.summary.discount ? this.summary.discount : 0,
            vendor_id: this.selectedPackageCourier.id,
            payment_method_id: this.paymentMethod.id,
            delivery_fee: this.summary.delivery_fee,
            type: "package",
            package_type_id: this.selectedPackage.id,
            // pickup_date: this.pickup_date,
            // pickup_time: this.pickup_time,
            recipient_name: this.selectedRecipientsObj.name,
            recipient_phone: this.selectedRecipientsObj.phone,
            pickup_location: this.selectedPickAddress.id,
            weight: this.parameters.weight,
            width: this.parameters.width,
            length: this.parameters.length,
            height: this.parameters.height,
            payer: this.payer,
            // stops: [
            //   {
            //     id: this.selectedDestAddress
            //   }
            // ],
          },
          { 'headers': { 'Authorization': this.AuthStr } }
        )
          .then((response) => {
            this.store.setLoading(false)
            if (this.paymentMethod.is_cash == 1) {
              Swal.fire({
                title: 'Order Successful',
                text: "Please pay rider" + " " + total_price.toFixed(2) + " " + " on delivery",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/'
                }
              })
            } else {
              notify({
                type: "success",
                title: "Order Checkout",
                text: response.data.message,
              });
              window.location.href = response.data.link
            }
            !process.server ? localStorage.removeItem('packageType') : null


          })
          .catch(error => console.log(error))

      }
    },


    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },

    backToPackageType() {
      this.packageTypeView = true;
      this.addressView = false;
    },

    backToAddress() {
      this.packageTypeView = false;
      this.addressView = true;
    },

    backToCourier() {
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = true;
    },

    backToRecipients() {
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;
      this.recipientView = true;
    },

    backToPackageParameters() {
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;
      this.recipientView = false;
      this.parametersView = true;
    },

    backToSummary() {
      this.packageTypeView = false;
      this.addressView = false;
      this.courierView = false;
      this.recipientView = false;
      this.parametersView = false;
      this.summaryView = true;
    },

    getPackageTypes() {
      this.store.setLoading(true)
      axios
        .get(this.base_url + "api/package/types", {
          headers: { Authorization: this.AuthStr },
        })
        .then(
          function (response) {
            this.store.setLoading(false)
            this.packageTypes = response.data;
          }.bind(this)
        );
    },



    fromValidation() {
      axios.get(this.base_url + "api/vendors/" + this.courier, {
        headers: { Authorization: this.AuthStr }
      }).then(
        function (response) {
          let cour = response.data;
        }
      );
      axios
        .get(this.base_url + "api/delivery/addresses/" + this.from, {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.pickup = response.data.data;

          for (let loopedCourier of this.couriers) {
            for (let i = 0; i < loopedCourier.countries.length; i++) {
              if (loopedCourier.countries[i].name == this.pickup.country) {
                this.loopedCountry = loopedCourier.countries[i].name;
                this.loopedCity = loopedCourier.cities[i].name;
                this.loopedState = loopedCourier.states[i].name;
              }
            }
          }
          if (this.pickup.country == this.loopedCountry || this.pickup.city == this.loopedCity || this.pickup.state == this.loopedState) {
            this.fromSuccess = "success";
          } else {
            this.fromError = "Vendor does not deliver to this location";
          }

        })
        .catch((error) => console.log(error));
    },

    clearAll() {
      !process.server ? localStorage.removeItem("packageType") : null;
      !process.server ? localStorage.removeItem("courier") : null;
      !process.server ? localStorage.removeItem("from") : null;
      !process.server ? localStorage.removeItem("to") : null;
      !process.server ? localStorage.removeItem("date") : null;
      !process.server ? localStorage.removeItem("time") : null;
      // this.$router.go();
      this.packageType = "";
      this.courier = "";
      this.from = "";
      this.to = "";
      this.date = "";
      this.time = "";
      this.fromSuccess = "";
      this.fromError = "";
      this.toSuccess = "";
      this.toError = "";
    },

    toValidation() {
      axios
        .get(this.base_url + "api/delivery/addresses/" + this.to, {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.pickup1 = response.data.data;
          for (let loopedCourier of this.couriers) {
            for (let country of loopedCourier.countries) {
              this.loopedCountry1 = country.name;
              if (this.pickup1.country == this.loopedCountry1) {
                if (
                  this.pickup1.country != null &&
                  this.loopedCountry1 != null
                ) {
                  this.toSuccess = "all set";
                  for (let state of loopedCourier.states) {
                    this.loopedState1 = state.name;
                  }
                  break;
                } else {
                  this.toError = "Vendor does not deliver to this location";
                }
              } else if (this.loopedState1 == this.pickup1.state) {
                if (this.pickup1.state != null && this.loopedState1 != null) {
                  this.toSuccess = "all set";
                  for (let city of loopedCourier.cities) {
                    this.loopedCity1 = city.name;
                  }
                  break;
                } else {
                  this.toError = "Vendor does not deliver to this location";
                }
              } else if (this.loopedCity1 == this.pickup1.city) {
                if (this.loopedCity1 != null && this.pickup1.city != null) {
                  this.toSuccess = "all set";
                  break;
                } else {
                  this.toError = "Vendor does not deliver to this location";
                }
                break;
              } else if (
                this.loopedCountry1 != this.pickup1.country ||
                this.loopedState1 != this.pickup1.state ||
                this.loopedCity1 != this.pickup1.city
              ) {
                this.toError = "Vendor does not deliver to this location";
              }
            }
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

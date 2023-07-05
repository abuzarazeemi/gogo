<template>
    <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
        <div class="max-w-xl mx-auto overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <p class="mb-5 text-2xl font-extrabold">{{ $t('cart.orderSummary') }}</p>
                <div class="flex flex-col">
                    <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.packageTypes') }}</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex flex-row space-x-2" v-if="sumPackage">
                            <img :src="sumPackage.photo" class="w-8 h-8">
                            <div>
                                <p class="text-xs font-medium text-gray-500">{{ sumPackage.name }}</p>
                                <p class="text-xs font-light text-gray-500">{{ sumPackage.description }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.courierVendors') }}</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex flex-row space-x-2" v-if="sumCourier">
                            <img :src="sumCourier.logo" class="w-8 h-8">
                            <div>
                                <p class="text-xs font-medium text-gray-500">{{ sumCourier.name }}</p>
                                <p class="text-sm font-light text-gray-500">{{ sumCourier.description }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.deliveryDetails') }}</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="grid gap-2 md:grid-cols-2">
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.pickup') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="from">{{ from.address }}</p>

                                <!-- <p class="text-xs font-bold text-gray-700">Stops</p>
                                <p class="text-xs font-normal text-gray-500" v-if="sumTo">{{ sumTo.name }}</p> -->
                            </div>
                            <div>
                                <!-- <p class="text-xs font-bold text-gray-700">From</p>
                                <p class="text-xs font-normal text-gray-500" v-if="sumFrom">{{ sumFrom.name }}</p> -->

                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.dropoffs') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="to">{{ to.address }}</p>
                            </div>
                        </div>
                        
                        <div class="grid gap-2 mt-3 md:grid-cols-2">
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.date') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="date">{{ date }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.time') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="time">{{ time }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.recipientInfo') }}</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('login.name') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="fullname">{{ fullname }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('login.phone') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="phone">{{ phone }}</p>
                            </div>
                        </div>
                        <p class="text-xs font-bold text-gray-700">{{ $t('parcel.notes') }}</p>
                        <p class="text-xs font-normal text-gray-500" v-if="note">{{ note }}</p>
                    </div>
                    <div class="p-5 mt-5 mb-1 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('login.name') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="fullname1">{{ fullname1 }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('login.phone') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="phone">{{ phone1 }}</p>
                            </div>
                        </div>
                        <p class="text-xs font-bold text-gray-700">{{ $t('parcel.notes') }}</p>
                        <p class="text-xs font-normal text-gray-500" v-if="note">{{ note1 }}</p>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">{{ $t('parcel.packageParameters') }}</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.weight') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="weight">{{ weight }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.length') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="length">{{ length }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.width') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="width">{{ width }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">{{ $t('parcel.height') }}</p>
                                <p class="text-xs font-normal text-gray-500" v-if="height">{{ height }}</p>
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
import Navigation from '../components/parcel/Navigation.vue'
import {useStorageStore} from '@/store/storage.js'
import axios from 'axios'
export default {
    components: {
        Navigation
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
            base_url: this.store.baseUrl,
            isLoggedIn: false,
            user: null,
            fullname: null,
            sumPackage: null,
            sumPackages: null,
            sumCourier: null,
            sumCouriers: null,
            AuthStr: "",
            from: null,
            sumFrom: null,
            to: null,
            sumTo: null,
            fullname: null,
            phone: null,
            note: null,
            weight: null,
            width: null,
            height: null,
            length: null,
            date: null,
            time: null,
            fullname1: null,
            phone1: null,
            note1: null,
        }
    },
    setup() { 
    const store = useStorageStore();
    return {store}
  },
    mounted() {
        this.AuthStr = 'Bearer ' + !process.server ? localStorage.getItem('authToken') : null
        this.fullname = !process.server ? localStorage.getItem('fullname') : null
        this.fullname1 = !process.server ? localStorage.getItem('fullname1') : null
        this.date = !process.server ? localStorage.getItem('date') : null
        this.time = !process.server ? localStorage.getItem('time') : null
        this.phone = !process.server ? localStorage.getItem('phone') : null
        this.phone1 = !process.server ? localStorage.getItem('phone1') : null
        this.note = !process.server ? localStorage.getItem('note') : null
        this.note1 = !process.server ? localStorage.getItem('note1') : null
        this.height = !process.server ? localStorage.getItem('height') : null
        this.width = !process.server ? localStorage.getItem('width') : null
        this.length = !process.server ? localStorage.getItem('plength') : null
        this.weight = !process.server ? localStorage.getItem('weight') : null
        let package_id = !process.server ? localStorage.getItem('packageType') : null
        let courier_id = !process.server ? localStorage.getItem('courier') : null
        let fromId = !process.server ? localStorage.getItem('from') : null
        let toId = !process.server ? localStorage.getItem('to') : null

        if (!process.server ? localStorage.getItem("authToken") : null) {
            this.isLoggedIn = true;
            this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null)
        }

        if(this.isLoggedIn == false) {
            this.$router.push("/login");
        }

        if(!process.server ? localStorage.getItem('packageType') : null){
            this.store.setLoading(true)
            axios.get(this.base_url+'api/package/types' )
            .then((response)=> {
                this.store.setLoading(false)
                this.sumPackages = response.data;
                let package_id = !process.server ? localStorage.getItem('packageType') : null
                this.sumPackage = this.sumPackages.find(p => p.id == package_id)
                // console.log(this.sumPackage)
            })
            .catch(error => console.log(error))

        }

        
        axios.get(this.base_url+'api/vendors?type=package&package_type_id='+package_id, 
        { headers: { Authorization: this.AuthStr }})
        .then((response)=> {
            this.sumCouriers = response.data.data
            let courier_id = !process.server ? localStorage.getItem('courier') : null
            this.sumCourier = this.sumCouriers.find(c => c.id == courier_id)
        })
        .catch(error => console.log(error))
        

        
        axios.get(this.base_url+'api/delivery/addresses/'+ fromId, 
        { headers: { Authorization: this.AuthStr }})
        .then((response) => {
            this.from = response.data.data
        })
        .catch(error => console.log(error))


        axios.get(this.base_url+'api/delivery/addresses/'+ toId, 
        { headers: { Authorization: this.AuthStr }})
        .then((response) => {
            this.to = response.data.data
        })
        .catch(error => console.log(error))

        

    },  
}
</script>
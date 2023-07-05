<template>
   <div class="flex justify-between">
     <span v-if="this.$route.name === 'payment' | this.$route.name === 'recipientInfo' | this.$route.name === 'packageparameter' | this.$route.name === 'summary'">
     <button class="px-4 py-2 mr-5 text-green-500 uppercase border border-gray-300 rounded" @click="navigatePrevious" v-show="!isFirst()">
       {{ $t('parcel.previous') }}
     </button>
     </span>

     <button class="px-4 py-2 text-white uppercase bg-green-500 rounded" @click="navigateNext">
       {{ nextButtonText() }}
     </button>
   </div>
</template>
<script>
import axios from "axios"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { notify } from "@kyvg/vue3-notification"
import {useStorageStore} from '@/store/storage.js'

export default {
  data() {
    return {
      AuthStr: "",
      base_url : this.store.baseUrl,
      package_id: !process.server ? localStorage.getItem('packageType') : null,
      from_id: !process.server ? localStorage.getItem('from') : null,
      courier: null,
      pickup: null,
      summary: null,
      dropoff_location_id: null,
      pickup_location_id: null,
      address_id: null,
      courier_id: null,
      packageType: null,
      pickup_date: null,
      pickup_time: null,
      recipient_name: null,
      recipient_phone: null,
      weight: null,
      width: null,
      height: null,
      length: null,
      note: null,
      pickup: null,
    };
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },

  mounted(){
    this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`
    this.dropoff_location_id  = !process.server ? localStorage.getItem('to') : null
    this.pickup_location_id = !process.server ? localStorage.getItem('from') : null
    this.address_id = !process.server ? localStorage.getItem('to') : null;
    this.courier_id = !process.server ? localStorage.getItem('courier') : null;
    this.packageType = !process.server ? localStorage.getItem('packageType') : null;
    this.pickup_date = !process.server ? localStorage.getItem('date') : null;
    this.pickup_time = !process.server ? localStorage.getItem('time') : null;
    this.recipient_name = !process.server ? localStorage.getItem('fullname') : null;
    this.recipient_phone = !process.server ? localStorage.getItem('phone') : null;
    this.recipient_name2 = !process.server ? localStorage.getItem('fullname1') : null;
    this.recipient_phone2 = !process.server ? localStorage.getItem('phone1') : null;
    this.weight = !process.server ? localStorage.getItem('weight') : null;
    this.width = !process.server ? localStorage.getItem('width') : null;
    this.height = !process.server ? localStorage.getItem('height') : null;
    this.length = !process.server ? localStorage.getItem('length') : null;
    this.note = !process.server ? localStorage.getItem('note') : null;

    if(this.courier_id != null && this.packageType != null  && this.weight != null && this.pickup_location_id != null && this.dropoff_location_id != null ) {
      axios.get(this.base_url+'api/package/order/summary?vendor_id='+this.courier_id+
          '&package_type_id='+this.packageType+
          '&pickup_location_id='+this.pickup_location_id+
          '&dropoff_location_id='+this.dropoff_location_id+
          // '&stops='+stops+
          '&weight='+this.weight,
          { headers: { Authorization: this.AuthStr }}
      )
      .then((response) => {
        this.summary = response.data
      })
      .catch(error => console.log(error))
    }
    // if(this.packageType) {
      axios.get(this.base_url + "api/vendors?type=package&package_type_id=" + this.packageType, 
        {headers: { Authorization: this.AuthStr },}
      )
      .then((response) => {
          this.courier = response.data.data;
      })
      .catch(error => console.log(error))

      let from_id = !process.server ? localStorage.getItem('from') : null
      axios.get(this.base_url+'api/delivery/addresses/'+ from_id, 
        { headers: { Authorization: this.AuthStr }}
      )
      .then((response) => {
        this.pickup = response.data.data
      })
    // }
    
  },

  methods: {
    nextButtonText()
    {
      if (
        this.$route.name === 'payment' && !this.store.PaymentStep
        )
      {
        return 'Place Order';
      }
      return 'Next';
    },

    isFirst()
    {
      return this.$route.name === 'Packagetype'
    },

    navigateNext()
    {
      if(this.$route.name === 'payment' && !this.store.PaymentStep)
      {
        let paymentId = !process.server ? localStorage.getItem('paymentId') : null
        let cash = !process.server ? localStorage.getItem('cash') : null
        if(paymentId == null)
        {
            notify({
                type: "error",
                title: "Order Checkout",
                text:  'select a payment method',
            })
        }else {
            
            let total_price = this.summary.total
            axios.post(this.base_url+'api/orders', 
                { 
                  total: total_price,
                  sub_total: this.summary.sub_total,
                  tax: this.summary.tax,
                  note: this.note,
                  discount: this.summary.discount ? this.summary.discount : 0,
                  vendor_id: this.courier_id,
                  payment_method_id: paymentId,
                  delivery_fee: this.summary.delivery_fee,
                  type: "package",
                  package_type_id: this.packageType,
                  pickup_date: this.pickup_date,
                  pickup_time: this.pickup_time,
                  recipient_name: this.recipient_name,
                  recipient_phone: this.recipient_phone,
                  pickup_location: this.pickup_location_id,
                  weight: this.weight,
                  width: this.width,
                  length: this.length,
                  height: this.height,
                  payer: this.payer,
                  stops:[
                    {
                        id: this.address_id
                    }
                  ],
                }, 
                { 'headers': { 'Authorization': this.AuthStr } }
            )
            .then(function (response) {
                if (cash == 1) {
                    Swal.fire({
                        title: 'Order Successful',
                        text: "Please pay rider" + " "+ total_price.toFixed(2) +" " +" on delivery",
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
                !process.server ? localStorage.removeItem('packageType') : null
                !process.server ? localStorage.removeItem('from') : null
                !process.server ? localStorage.removeItem('to') : null;
                !process.server ? localStorage.removeItem('courier') : null;
                !process.server ? localStorage.removeItem('date') : null;
                !process.server ? localStorage.removeItem('time') : null;
                !process.server ? localStorage.removeItem('fullname') : null;
                !process.server ? localStorage.removeItem('phone') : null;
                !process.server ? localStorage.removeItem('fullname1') : null;
                !process.server ? localStorage.removeItem('phone1') : null;
                !process.server ? localStorage.removeItem('weight') : null;
                !process.server ? localStorage.removeItem('width') : null;
                !process.server ? localStorage.removeItem('height') : null;
                !process.server ? localStorage.removeItem('length') : null;
                !process.server ? localStorage.removeItem('note') : null;
                !process.server ? localStorage.removeItem('paymentId') : null;
                !process.server ? localStorage.removeItem('cash') : null;
                !process.server ? localStorage.removeItem('total') : null;
                !process.server ? localStorage.removeItem('sub_total') : null;
                !process.server ? localStorage.removeItem('tax') : null;
                !process.server ? localStorage.removeItem('discount') : null;
                !process.server ? localStorage.removeItem('delivery_fee') : null;
                
            })
            .catch(error => console.log(error))
            
        }
        
      }
      if (this.$route.name === 'ParcelOrder')
      {
          // for(let loopedCourier of this.courier)
          // {
          //   for(let loopedCountry of loopedCourier.countries)
          //   {
          //     if(this.pickup.country === loopedCountry.name){
          //       this.$router.push({ name: 'recipientInfo' });
          //     }else{
          //       for(let loopedCity of loopedCourier.cities){
          //         if(this.pickup.city === loopedCity.name){
          //           this.$router.push({ name: 'recipientInfo' });
          //         }else{
          //           for(let loopedState of loopedCourier.states){
          //             if(this.pickup.state === loopedState.name){
          //               this.$router.push({ name: 'recipientInfo' });
          //             }else{
          //               notify({
          //                 type: "error",
          //                 title: "Error",
          //                 text:  "Vendor does not service pickup location",
          //               });
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
          this.$router.push({ name: 'recipientInfo' });
        
      } else if(this.$route.name === 'recipientInfo'){

          this.$router.push('/package-parameters');

      }else if(this.$route.name === 'packageparameter'){
       
          this.$router.push('/summary');
         
      }else if(this.$route.name === 'summary'){

        this.$router.push('/payments');

      }
    },

    navigatePrevious()
    {
      if (this.$route.name === 'payment')
      {
        this.$router.push('/summary');
        
      } else if(this.$route.name === 'summary')
      {
        this.$router.push('/package-parameters');

      }else if(this.$route.name === 'packageparameter')
      {

        this.$router.push('/recipient');

      }else if(this.$route.name === 'recipientInfo')
      {
        this.$router.push('/parcel-order');
      }
    },
  
  }
}
</script>

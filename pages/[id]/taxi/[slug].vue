<template>
    
    <div class="container flex flex-col items-center justify-center p-5 mx-auto my-10 md:my-72">
         <p class="text-3xl font-semibold md:text-6xl">Coming Soon</p>
        <p class="pt-3">Sorry for the inconvenience</p>
        <a class="underline" href="/">Home</a>
    </div>
   
 <Download/> 
</template>
<script>
import Download from '@/components/Downloads.vue'
export default {
    components: {
        Download
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
}
</script>
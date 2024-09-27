<script setup>
import { ref } from 'vue';
import OrderCard from '@/components/OrderCard.vue'

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const pendingList = ref([
  { id: 'ORD00000', status: 'COMPLETED', member: 'MCD00000'},
]);
</script>

<template>
  <div class="myContent">
    <h2>Hi, {{ userRole }}</h2>
    <h4>The following orders are ready for collection.</h4>
    <p>Your Order No: -</p>
    <div style="display:block">
      <div v-for="ord in pendingList"
        :key="ord.id"
        style="margin-top:0.5rem;"
      >
        <OrderCard 
          :order="ord.id"
          :status="ord.status"
          :member="ord.member"
        />
      </div>
    </div>
  </div>
</template>
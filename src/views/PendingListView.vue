<script setup>
import { ref } from 'vue';
import OrderCard from '@/components/OrderCard.vue'

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const pendingList = ref([
  { id: 'ORD00001', status: 'PACKING', member: 'MCD00001'},
  { id: 'ORD00003', status: 'PACKING', member: 'MCD00002'},
  { id: 'ORD00002', status: 'WAITING', member: '-'},
]);
</script>

<template>
  <div class="myContent">
    <h2>Hi, {{ userRole }}</h2>
    <h4>The following orders are in preparation.</h4>
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
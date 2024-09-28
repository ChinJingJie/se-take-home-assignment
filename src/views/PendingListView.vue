<script setup>
import { ref } from 'vue';
import OrderCard from '@/components/OrderCard.vue'

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const pendingList = ref(JSON.parse(localStorage.getItem('pendingList')) || []);
const orderIds = ref(localStorage.getItem('orderIds') || '');
</script>

<template>
  <div class="myContent">
    <h2>Hi, {{ userRole }}</h2>
    <h4>The following orders are in preparation.</h4>
    <p>Your Order No: {{ orderIds }}</p>
    <div style="display:block">
      <div v-for="ord in pendingList"
        :key="ord.id"
        style="margin-top:0.5rem;"
      >
        <OrderCard 
          :order="ord.id"
          :status="ord.status"
          :member="ord.member"
          :datetime="ord.datetime"
        />
      </div>
    </div>
  </div>
</template>
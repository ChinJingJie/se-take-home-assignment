<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import OrderCard from '@/components/OrderCard.vue'

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const completeList = ref(JSON.parse(localStorage.getItem('completeList')) || []);
const orderIds = ref(localStorage.getItem('orderIds') || '');

// Function to refresh completeList from localStorage
const refreshCompleteList = () => {
  completeList.value = JSON.parse(localStorage.getItem('completeList')) || [];
};

// Event handler for storage event
const handleStorageChange = (event) => {
  if (event.key === 'completeList') {
    refreshCompleteList();
  }
};

// Set up event listener on component mount
onMounted(() => {
  window.addEventListener('storage', handleStorageChange);
});

// Clean up event listener on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorageChange);
});
</script>

<template>
  <div class="myContent">
    <h2>Hi, {{ userRole }}</h2>
    <h4>The following orders are ready for collection.</h4>
    <p>Your Order No: {{ orderIds }}</p>
    <div style="display:block">
      <div v-for="ord in completeList"
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
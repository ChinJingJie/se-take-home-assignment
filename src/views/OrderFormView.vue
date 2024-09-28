<script setup>
import router from '@/router';
import { ref } from 'vue';

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const btnLabel = ref(userRole.value === 'guest' ? '+ New Normal Order' : '+ New VIP Order');
const userId = ref(localStorage.getItem('userId') || '-');
const orderIds = ref(localStorage.getItem('orderIds') || '');
const pendingList = ref([]);

const now = new Date();
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
};

const getNextOrderId = () => {
  let seq = parseInt(localStorage.getItem('orderSeq')) || 0;
  seq += 1;
  localStorage.setItem('orderSeq', seq);

  const formattedSeq = String(seq).padStart(5, '0');
  const prefix = userRole.value === 'vip' ? 'V' : 'C';
  return `${prefix}${formattedSeq}`;
};

const newOrder = () => {
  const storedList = JSON.parse(localStorage.getItem('pendingList')) || [];
  pendingList.value = storedList;

  const newId = getNextOrderId();

  let orderObj = { 
    id: newId, 
    status: 'PENDING', 
    member: userId.value, 
    datetime: now.toLocaleString('en-US', options)
  };

  pendingList.value = [...pendingList.value, orderObj];
  pendingList.value = pendingList.value.sort((a, b) => {
    const aStartsWithV = a.id.startsWith('V');
    const bStartsWithV = b.id.startsWith('V');

    if (aStartsWithV && bStartsWithV) {
      return new Date(a.datetime) - new Date(b.datetime); // Both start with 'V', sort by datetime
    }
    if (aStartsWithV) {
      return -1; // 'a' comes first
    }
    if (bStartsWithV) {
      return 1; // 'b' comes first
    }
    return 0; // No change in order
  });

  orderIds.value = orderIds.value.length > 0 ? orderIds.value + ',' + newId : newId;
  localStorage.setItem('orderIds', orderIds.value);
  localStorage.setItem('pendingList', JSON.stringify(pendingList.value));

  router.push('/pending');
}
</script>

<template>
  <div class="myContent">
    <h2>Hi, {{ userRole }}</h2>
    <div style="display:block">
      <button
        class="button"
        @click="newOrder()"
      >
        {{ btnLabel }}
    </button>
    </div>
  </div>
</template>
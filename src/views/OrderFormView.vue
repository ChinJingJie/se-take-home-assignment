<script setup>
import { ref } from 'vue';

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const btnLabel = ref(userRole.value === 'guest' ? '+ New Normal Order' : '+ New VIP Order');
</script>

<template>
  <div class="myContent">
    <h2>Hi, {{ userRole }}</h2>
    <div style="display:block">
      <button
        class="button"
      >
        {{ btnLabel }}
    </button>
    </div>
  </div>
</template>
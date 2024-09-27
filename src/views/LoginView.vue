<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const buttonList = ref([
  { label: 'Guest', path: '/form', role: 'guest'},
  { label: 'VIP Member', path: '/vipform', role: 'vip'},
  { label: 'Staff', path: '/bot', role: 'staff'},
]);
</script>

<template>
  <div class="myContent">
    <h2>I am a ...</h2>
    <div style="display:block">
      <RouterLink
        v-for="btn in buttonList"
        :key="btn.role"
        :to="btn.path"
        class="button"
      >
        {{ btn.label }}
      </RouterLink>
    </div>
  </div>
</template>
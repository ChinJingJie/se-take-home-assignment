<script setup>
import { ref, computed, watch } from 'vue';
import { RouterView, useRoute } from "vue-router";

function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
}

const userRole = ref(localStorage.getItem('userRole') || 'visitor');
const userId = ref(localStorage.getItem('userId') || '-');

const sectionList = ref([
  { label: 'Login', path: '/', id: 'login', roles: ['visitor'] },
  { label: 'Order Form', path: '/form', id: 'form', roles: ['guest'] },
  { label: 'Order Form', path: '/vipform', id: 'vipform', roles: ['vip'] },
  { label: 'Pending Orders', path: '/pending', id: 'pending', roles: ['guest', 'vip'] },
  { label: 'Complete Orders', path: '/complete', id: 'complete', roles: ['guest', 'vip'] },
  { label: 'Bot List', path: '/bot', id:'bot', roles: ['staff'] },
  { label: 'Logout', path: '/logout', id:'logout', roles: ['guest', 'vip', 'staff'] },
]);

const filteredSections = computed(() => {
  return sectionList.value.filter(section => section.roles.includes(userRole.value));
});

const generateUniqueId = (prefix) => {
  const randomPart = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
  return `${prefix}${randomPart}`;
};

const route = useRoute();
watch(route, (newRoute) => {
    if (newRoute.path === '/logout') {
        userRole.value = 'visitor'; 
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('orderIds');
    }
    else if (newRoute.path === '/form') {
        userRole.value = 'guest'; 
        localStorage.setItem('userRole',userRole.value);
        userId.value = '-'; 
        localStorage.setItem("userId",'-');
    }
    else if (newRoute.path === '/vipform') {
        userRole.value = 'vip'; 
        localStorage.setItem('userRole',userRole.value);

        const myId = generateUniqueId('VIP');
        userId.value = myId; 
        localStorage.setItem("userId",userId.value)
    }
    else if (newRoute.path === '/bot') {
        userRole.value = 'staff'; 
        localStorage.setItem('userRole',userRole.value);
        
        const myId = generateUniqueId('MCD');
        userId.value = myId; 
        localStorage.setItem("userId",userId.value)
    }
});

watch(() => {
  userId.value = localStorage.getItem('userId') || '-';
});
</script>

<template>
  <header class="header">
    <h1 class="title">McDonald</h1>
    <p v-if="userRole !== 'guest' && userRole !== 'visitor'">
      {{ userRole === 'vip' ? 'Member ID: ' : 'Staff ID: ' }}{{ userId }}
    </p>

    <nav class="nav-container">
      <button v-for="section in filteredSections" :key="section" @click="scrollToSection(section.id)" class="nav-button">
        <RouterLink :to=section.path class="nav-link" :class="{ 'active-link': route.path === section.path || (route.path === '/logout' && section.path === '/')}">{{ section.label }}</RouterLink>
      </button>
    </nav>
  </header>
  <RouterView></RouterView>
</template>
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

const route = useRoute();
watch(route, (newRoute) => {
    if (newRoute.path === '/logout') {
        userRole.value = 'visitor'; 
        localStorage.removeItem('userRole');
    }
    else if (newRoute.path === '/form') {
        userRole.value = 'guest'; 
        localStorage.setItem('userRole',userRole.value);
    }
    else if (newRoute.path === '/vipform') {
        userRole.value = 'vip'; 
        localStorage.setItem('userRole',userRole.value);
    }
    else if (newRoute.path === '/bot') {
        userRole.value = 'staff'; 
        localStorage.setItem('userRole',userRole.value);
    }
});
</script>

<template>
  <header class="header">
    <h1 class="title">McDonald</h1>

    <nav class="nav-container">
      <button v-for="section in filteredSections" :key="section" @click="scrollToSection(section.id)" class="nav-button">
        <RouterLink :to=section.path class="nav-link" :class="{ 'active-link': route.path === section.path || (route.path === '/logout' && section.path === '/')}">{{ section.label }}</RouterLink>
      </button>
    </nav>
  </header>
  <RouterView></RouterView>
</template>
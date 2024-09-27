<script setup>
import { ref } from 'vue';
import BotCard from '@/components/BotCard.vue'

const botList = ref([
  { id: 'BOT00001', status: 'BUZY', order: 'ORD00002'},
  { id: 'BOT00002', status: 'BUZY', order: 'ORD00001'},
  { id: 'BOT00003', status: 'IDLE', order: '-'},
]);
</script>

<template>
  <div class="myContent">
    <h2>Hi, Staff</h2>
    <div style="display: flex; justify-content: space-between;">
      <button
        class="button"
        style="width:50%"
      >
        + Bot
      </button>
      <button
        class="button"
        style="width:50%"
      >
        - Bot
      </button>
    </div>
    <div style="display:block">
      <h4>The following bots are currently available.</h4>
      <div v-for="bot in botList"
        :key="bot.id"
        style="margin-top:0.5rem;"
      >
        <BotCard 
          :bot="bot.id"
          :status="bot.status"
          :order="bot.order"
        />
      </div>
    </div>
  </div>
</template>
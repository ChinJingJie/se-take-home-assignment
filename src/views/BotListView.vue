<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BotCard from '@/components/BotCard.vue'

const botList = ref(JSON.parse(localStorage.getItem('botList')) || []);
const pendingList = ref([]);
const completeList = ref([]);
let isProcessing = false; // Lock variable
let now = new Date();
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
};

const orderUpdateAlert = () => {
  pendingList.value = JSON.parse(localStorage.getItem('pendingList')) || [];
  let filteredList = pendingList.value.filter( e => e.status === "PENDING");

  if (filteredList.length !== 0) {
    const idleBotIds = botList.value
      .filter(e => e.status === 'IDLE')
      .map(e => e.id);

      idleBotIds.forEach(botId => {
        startProcessingOrder(botId);
      });
  }
};

// Event handler for storage event
const handleStorageChange = (event) => {
  if (event.key === 'pendingList') {
    orderUpdateAlert();
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

const getNextBotId = () => {
  let seq = parseInt(localStorage.getItem('botSeq')) || 0;
  seq += 1;
  localStorage.setItem('botSeq', seq);

  const formattedSeq = String(seq).padStart(5, '0');
  return `BOT${formattedSeq}`;
};

const updateBotStatus = (botId, status, order) => {
  botList.value = botList.value.map(e => e.id === botId ? { ...e, status, order } : e);
  localStorage.setItem('botList', JSON.stringify(botList.value));
};

const updateOrderStatus = (orderId, status, datetime) => {
  pendingList.value = pendingList.value.map(e => e.id === orderId ? { ...e, status, datetime } : e);
  localStorage.setItem('pendingList', JSON.stringify(pendingList.value));
};

const startProcessingOrder = (bot) => {
  if (isProcessing) return;
  
  isProcessing = true;
  const storedList = JSON.parse(localStorage.getItem('pendingList')) || [];
  pendingList.value = storedList;

  let tempList = pendingList.value.filter( e => e.status === "PENDING");
  let selectedId = "";

  if (tempList.length === 0) {
    updateBotStatus(bot, 'IDLE','-');
    isProcessing = false;
  }
  else {
    selectedId = tempList[0].id;
    now = new Date();
    updateOrderStatus(selectedId,'COOKING', now.toLocaleString('en-US', options));
    updateBotStatus(bot, 'BUZY',selectedId);
    isProcessing = false;

    setTimeout(() => {
      let currentOrder = pendingList.value.filter(e => e.id === selectedId);

      if (currentOrder[0] !== undefined && currentOrder[0].status === 'COOKING') {
        const storedList2 = JSON.parse(localStorage.getItem('completeList')) || [];
        completeList.value = storedList2;
        now = new Date();
        completeList.value.unshift({ ...currentOrder[0], status: 'READY', datetime: now.toLocaleString('en-US', options) });
        localStorage.setItem('completeList', JSON.stringify(completeList.value));

        // Use splice to remove the order from pendingList
        const index = pendingList.value.findIndex(e => e.id === selectedId);
        if (index !== -1) {
          pendingList.value.splice(index, 1);
          localStorage.setItem('pendingList', JSON.stringify(pendingList.value));
        }

        // Trigger UI reactivity for pendingList
        pendingList.value = [...pendingList.value]; 

        // Update bot status back to IDLE
        updateBotStatus(bot, 'IDLE', '-');

        // Check if there are still pending orders
        const updatedPendingList = JSON.parse(localStorage.getItem('pendingList')) || [];
        if (updatedPendingList.length > 0) {
          startProcessingOrder(bot); // Recursively call to process next order
        }
      }
    }, 10000); // 10 seconds
  }
};

const tryProcessingOrder = (botId) => {
  if (isProcessing) {
    setTimeout(() => tryProcessingOrder(botId), 2000);
  } else {
    startProcessingOrder(botId);
  }
};

const createBot = () => {
  const storedList = JSON.parse(localStorage.getItem('botList')) || [];
  botList.value = storedList;

  const newId = getNextBotId();

  let botObj = { 
    id: newId, 
    status: 'IDLE', 
    order: '-'
  };

  botList.value = [...botList.value, botObj];
  localStorage.setItem('botList', JSON.stringify(botList.value));

  tryProcessingOrder(newId);
}

const destroyBot = () => {
  const storedList = JSON.parse(localStorage.getItem('botList')) || [];
  botList.value = storedList;

  // at here my need add handling to check order processing by this bot and update back to pending
  let seq = parseInt(localStorage.getItem('botSeq')) || 0;
  const formattedSeq = String(seq).padStart(5, '0');
  const lastBotId = `BOT${formattedSeq}`;

  seq -= 1;
  if (seq < 0) seq = 0;
  localStorage.setItem('botSeq', seq);

  const botToRemove = botList.value.find(bot => bot.id === lastBotId);
  if (botToRemove && botToRemove.order !== '-') {
    // revert order status
    now = new Date();
    updateOrderStatus(botToRemove.order, 'PENDING', now.toLocaleString('en-US', options));
  }

  botList.value = botList.value.filter(bot => bot.id !== lastBotId);
  localStorage.setItem('botList', JSON.stringify(botList.value));
}
</script>

<template>
  <div class="myContent">
    <h2>Hi, Staff</h2>
    <div style="display: flex; justify-content: space-between;">
      <button
        class="button"
        style="width:50%"
        @click="createBot()"
      >
        + Bot
      </button>
      <button
        class="button"
        style="width:50%"
        @click="destroyBot()"
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
<script setup>
import { ref } from 'vue';
import BotCard from '@/components/BotCard.vue'

const botList = ref([]);
const getNextBotId = () => {
  let seq = parseInt(localStorage.getItem('botSeq')) || 0;
  seq += 1;
  localStorage.setItem('botSeq', seq);

  const formattedSeq = String(seq).padStart(5, '0');
  return `BOT${formattedSeq}`;
};

const createBot = () => {
  const storedList = JSON.parse(localStorage.getItem('botList')) || [];
  botList.value = storedList;

  const newId = getNextBotId();
  // at here my need add handling to check pending order and start processing

  let botObj = { 
    id: newId, 
    status: 'IDLE', 
    order: '-'
  };

  botList.value.push(botObj);
  localStorage.setItem('botList', JSON.stringify(botList.value));
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

  botList.value = botList.value
    .filter(bot => bot.id !== lastBotId);

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
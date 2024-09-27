<script setup>
defineProps({
  bot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  order: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div class="card">
    <div class="info">
      <div class="label">Bot No.:</div>
      <span>{{ bot }}</span>
    </div>
    <div class="info">
      <div class="label">Status:</div>
      <span>{{ status }}</span>
    </div>
    <div class="info">
      <div class="label">Processing:</div>
      <span>{{ order }}</span>
    </div>
  </div>
</template>
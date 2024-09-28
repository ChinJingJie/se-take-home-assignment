<script setup>
defineProps({
  order: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  member: {
    type: String,
    required: true
  },
  datetime: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div class="card">
    <div class="info">
      <div class="label">Order No.:</div>
      <span>{{ order }}</span>
    </div>
    <div class="info">
      <div class="label">Status:</div>
      <span>{{ status }}</span>
    </div>
    <div class="info">
      <div class="label">Member ID:</div>
      <span>{{ member }}</span>
    </div>
    <div class="info">
      <div class="label">Updated Time:</div>
      <span>{{ datetime }}</span>
    </div>
  </div>
</template>
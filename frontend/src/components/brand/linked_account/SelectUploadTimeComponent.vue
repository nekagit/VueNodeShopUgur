<script setup lang="ts">
import { ref } from "vue";
import { CronLight } from '@vue-js-cron/light';
const value = ref("");
const error = ref("");
</script>


<template>
  <cron-light v-model="value" @error="error=$event"></cron-light>
  <div class="text-lightest pt-2">cron expression: {{value}}</div>

  {{ error }}
</template>
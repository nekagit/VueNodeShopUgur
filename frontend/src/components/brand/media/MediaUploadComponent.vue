<script setup lang="ts">
import {ref} from "vue";
const props = defineProps(["brand"]);
import { CronLight } from '@vue-js-cron/light';
const value = ref("");
const error = ref("");
</script>

<template>
  <h3>Upload Media Settings</h3>
  {{ brand }}

  <div>
    <cron-light v-model="value" @error="error=$event"></cron-light>
    <div class="text-lightest pt-2">cron expression: {{value}}</div>

    {{ error }}
  </div>
</template>
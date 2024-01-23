<script setup lang="ts">
import AddLinkedAccountComponent from "@/components/brand/linked_account/AddLinkedAccountComponent.vue";
import LinkedAccountTableComponent from "@/components/brand/linked_account/LinkedAccountTableComponent.vue";
const props = defineProps(['brand']);
</script>

<template>
  <div id="brand-linked-accounts-view" v-if="brand">
    <AddLinkedAccountComponent :brand="brand"></AddLinkedAccountComponent>
    <LinkedAccountTableComponent :accounts="brand.linked_accounts"></LinkedAccountTableComponent>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import TopnavComponent from "@/components/nav/main/TopnavComponent.vue";
</script>

<template>
  <div id="main-layout">
    <TopnavComponent></TopnavComponent>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
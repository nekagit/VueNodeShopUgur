<script setup lang="ts">
import BrandTableComponent from "@/components/brand/table/BrandTableComponent.vue";
import NewBrandComponent from "@/components/brand/new/NewBrandComponent.vue";
</script>

<template>
  <div class="grid gap-4">
    <NewBrandComponent class="w-full"></NewBrandComponent>
    <BrandTableComponent class="w-full"></BrandTableComponent>
  </div>
</template>

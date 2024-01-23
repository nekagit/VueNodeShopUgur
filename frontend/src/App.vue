<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import Toaster from "@/components/ui/toast/Toaster.vue";

const app = useAppStore();
onBeforeMount( () => {
  app.init();
})
</script>

<template>
  <RouterView name="authed" />
  <Toaster />
</template>


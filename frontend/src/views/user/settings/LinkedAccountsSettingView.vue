<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";

const userStore = useUserStore();
import SelectProviderDialogComponent from "@/components/settings/SelectProviderDialogComponent.vue";
import LinkedAccountsListComponent from "@/components/settings/LinkedAccountsListComponent.vue";

onMounted( async () => {
  await userStore.loadLinkedAccounts();
})
</script>

<template>
  <div id="linked-accounts-setting-view" class="relative w-full grid gap-4">
    <div>
      <SelectProviderDialogComponent></SelectProviderDialogComponent>
    </div>
    <LinkedAccountsListComponent></LinkedAccountsListComponent>

  </div>
</template>

<style scoped></style>
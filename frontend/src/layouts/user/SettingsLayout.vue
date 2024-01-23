<script setup lang="ts">
import UserSettingsRoutesComponent from "@/components/nav/user/UserSettingsRoutesComponent.vue";
</script>

<template>
  <div id="settings-layout" class="w-full">
    <div class="space-y-6 w-full">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight"> Settings </h2>
        <p class="text-muted-foreground"> Manage your account settings and set e-mail preferences. </p>
      </div>
      <div data-orientation="horizontal" role="separator" class="shrink-0 bg-secondary my-6 h-px w-full"></div>
      <div class="flex flex-wrap gap-4">
        <aside class="lg:w-1/5 w-full">
          <UserSettingsRoutesComponent class="w-full"></UserSettingsRoutesComponent>
        </aside>
        <div id="settings-view" class="w-full">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#settings-view{
  flex: 1 1 400px;
}
</style>
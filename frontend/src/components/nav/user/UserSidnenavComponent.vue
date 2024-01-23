<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import Button from "@/components/ui/button/Button.vue";
import LogoComponent from "@/components/logo/LogoComponent.vue";
const route = ref(useRoute())
import { useUserStore } from "@/stores/userStore";
import DashboardSvgIcon from "@/assets/icons/DashboardSvgIcon.vue";
import BrandSvgIcon from "@/assets/icons/BrandSvgIcon.vue";
import SettingsSvgIcon from "@/assets/icons/SettingsSvgIcon.vue";
const user = useUserStore();

</script>

<template>
  <div id="user-sidenav-component" class="p-6 flex flex-col justify-between h-full sticky top-0">
    <div class="grid gap-4">
      <LogoComponent class="text-center"></LogoComponent>
      <div class="grid gap-4 place-items-center">
      <span data-state="closed">
        <img style="height: 170px; width: 170px" src="https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&amp;dpr=2&amp;q=80" alt="Thinking Components" width="150" height="150" class="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square rounded-3xl">
      </span>
        <div class="space-y-1 text-sm">
          <h3 class="font-medium leading-none">Thinking Components</h3>
          <p class="text-xs text-muted-foreground">Lena Logic</p>
        </div>
      </div>

      <nav class="grid gap-2 w-64">
        <router-link
            to="/"
            class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-full text-left justify-start hover:bg-muted"
            :class="{ 'bg-accent': route.path === '/' }"
            exact
        >
          <DashboardSvgIcon class="w-5 h-5"></DashboardSvgIcon>
          Dashboard
        </router-link>
        <router-link
            to="/brands"
            class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-full text-left justify-start hover:bg-muted"
            :class="{ 'bg-accent': route.path === '/brands' }"
            exact
        >
          <BrandSvgIcon class="w-5 h5"></BrandSvgIcon>
          Brands
        </router-link>
      </nav>
    </div>
    <nav class="grid gap-2">
      <router-link
          to="/settings"
          class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-full text-left justify-start hover:bg-muted"
          :class="{ 'bg-accent': route.path.includes('/settings') }"
          exact
      >
        <SettingsSvgIcon class="w-5 h-5"></SettingsSvgIcon>
        Settings
      </router-link>
      <Button @click="user.signout()" variant="outline" class="w-full"> Logout </Button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import LinkedSvgIcon from "@/assets/icons/LinkedSvgIcon.vue";
const route = ref(useRoute())
</script>

<template>
  <nav class="flex flex-col gap-1">
    <router-link
        to="/settings/profile"
        :class="{ 'bg-accent': route.path.includes('profile') }"
        class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      Profile
    </router-link>
    <router-link
        to="/settings/linked-accounts"
        :class="{ 'bg-accent': route.path.includes('linked-accounts') }"
        class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <LinkedSvgIcon class="w-4 h-4"></LinkedSvgIcon>
      Linked Accounts
    </router-link>
    <router-link to="/settings/account" :class="{ 'bg-accent': route.path.includes('/account') }" class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start w-full text-left justify-start" href="/examples/forms/account">Account</router-link>
    <router-link to="/settings/appearance" :class="{ 'bg-accent': route.path.includes('appearance') }" class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start w-full text-left justify-start" href="/examples/forms/appearance">Appearance</router-link>
    <router-link to="/settings/notifications" :class="{ 'bg-accent': route.path.includes('notifications') }" class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start w-full text-left justify-start" href="/examples/forms/notifications">Notifications</router-link>
    <router-link to="/settings/display" :class="{ 'bg-accent': route.path.includes('display') }" class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start w-full text-left justify-start" href="/examples/forms/display">Display</router-link>
  </nav>
</template>
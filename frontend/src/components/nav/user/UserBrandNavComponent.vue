<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
const route = ref(useRoute())
import LookSvgIcon from "@/assets/icons/LookSvgIcon.vue";
import SettingsSvgIcon from "@/assets/icons/SettingsSvgIcon.vue";
import KeysSvgIcon from "@/assets/icons/KeysSvgIcon.vue";
import LinkedSvgIcon from "@/assets/icons/LinkedSvgIcon.vue";
import MultimediaSvgIcon from "@/assets/icons/MultimediaSvgIcon.vue";
</script>

<template>
  <nav class="sticky flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <router-link
        :to="'/brand/'+route.params.id"
        :class="{ 'bg-accent': route.path === '/brand/'+route.params.id }"
        class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <LookSvgIcon class="w-4"></LookSvgIcon>
      Overview
    </router-link>

    <router-link
        :to="'/brand/'+route.params.id+'/laccounts'"
        :class="{ 'bg-accent': route.path.includes('laccounts') }"
        class="flex place-items-center gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <LinkedSvgIcon class="w-4 h-4"></LinkedSvgIcon>
      Linked Accounts
    </router-link>

    <router-link
        :to="'/brand/'+route.params.id+'/media'"
        :class="{ 'bg-accent': route.path.includes('media') }"
        class="flex place-items-center gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <MultimediaSvgIcon class="w-4 h-4"></MultimediaSvgIcon>
      Media
    </router-link>

    <!--
    <router-link
        :to="'/brand/'+route.params.id+'/configs'"
        :class="{ 'bg-accent': route.path.includes('configs') }"
        class="flex place-items-center gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <SettingsSvgIcon class="w-4 h-4"></SettingsSvgIcon>
      Configuration
    </router-link>
    -->
    <!--
    <router-link
        :to="'/brand/'+route.params.id+'/linked-accounts'"
        :class="{ 'bg-accent': route.path.includes('linked-accounts') }"
        class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <LinkedSvgIcon class="w-4 h-4"></LinkedSvgIcon>
      Linked Accounts
    </router-link>
    -->

    <!--
    <router-link
        :to="'/brand/'+route.params.id+'/keys'"
        :class="{ 'bg-accent': route.path.includes('keys') }"
        class="inline-flex gap-2 items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted"
    >
      <KeysSvgIcon class="w-4 h-4"></KeysSvgIcon>
      Keys
    </router-link>
    -->
  </nav>
</template>


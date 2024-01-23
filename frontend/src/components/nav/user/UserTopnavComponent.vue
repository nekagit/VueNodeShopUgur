<script setup lang="ts">

import LogoComponent from "@/components/logo/LogoComponent.vue";
import UserTopnavProfileComponent from "@/components/nav/user/UserTopnavProfileComponent.vue";
</script>

<template>
  <div id="user-topnav-component" class="z-1000 backdrop-blur-lg flex place-items-center justify-between px-4">
    <div id="logo">
      <LogoComponent></LogoComponent>
    </div>
    <div class="flex place-items-center gap-4">
      <div id="routes" class="flex gap-2">
        <router-link to="/">Home</router-link>
      </div>
      <div id="profile">
        <UserTopnavProfileComponent></UserTopnavProfileComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
#user-topnav-component{
  height: 100%;
  width: 100%;
}



</style>

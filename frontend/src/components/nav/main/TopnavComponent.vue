<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import router from "@/router";
import Button from "@/components/ui/button/Button.vue";
import SunSvgIcon from "@/assets/icons/SunSvgIcon.vue";
import MoonSvgIcon from "@/assets/icons/MoonSvgIcon.vue";

const app = useAppStore();
</script>

<template>
  <div id="topnav-component">
    <div class="container">
      <div class="flex gap-4 place-items-center">
        <div id="logo" @click="router.push({name:'Home'})">Viral Sync</div>
      </div>
      <div class="flex gap-4 place-items-center">
        <Button variant="secondary" @click="router.push('/sign-up')">Sing Up</Button>
        <Button @click="router.push('/sign-in')">Sing In</Button>
        <button @click="app.toggleTheme()">
          <SunSvgIcon v-if="app.theme === 'dark'"></SunSvgIcon>
          <MoonSvgIcon v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#topnav-component{
  height: 100px;
  display: flex;
  place-items: center;
}

.container{
  display: flex;
  justify-content: space-between;
}

#logo{
  font-weight: bold;
  font-size: 24px;
}

svg{
  height: 22px;
  width: 22px;
}
</style>
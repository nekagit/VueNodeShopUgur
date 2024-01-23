<template>
  <div id="sign-in-view">
    <SignInFormComponent></SignInFormComponent>
  </div>
</template>

<script setup lang="ts">
import SignInFormComponent from "@/components/user/SignInFormComponent.vue";
</script>

<style scoped>
#sign-in-view{
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
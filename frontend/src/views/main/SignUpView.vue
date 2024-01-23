<template>
  <div id="sign-up-view">
    <SignUpFormComponent></SignUpFormComponent>
  </div>
</template>
<script setup lang="ts">
import SignUpFormComponent from "@/components/user/SignUpFormComponent.vue";
</script>

<style scoped>
#sign-up-view{
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
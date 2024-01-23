<script setup lang="ts">
import { useTiktokStore } from "@/stores/tiktokStore";
import {onMounted, ref} from "vue";
const tiktokStore = useTiktokStore();
const authorized = ref<boolean>(false);
const authDone = ref<boolean>(false);
import {useRoute} from "vue-router";
import Button from "@/components/ui/button/Button.vue";
const route = ref(useRoute())
const code = ref<any>(null)
onMounted( async () =>{
  try{
    console.log(route.value.query)
    if(route.value.query && route.value.query.code){
      code.value = route.value.query.code;
      await tiktokStore.oauth(code.value);
      authorized.value = true;
    }
    authDone.value = true;
  }catch (e) {
    console.log(e);
    authDone.value = true;
  }
})
</script>

<template>
  <div id="brand-view">
    {{ authDone }} | {{ authorized }} <br>
    {{ code }}

    <div class="flex justify-center" id="status">
      <div v-if="!authDone && !authorized">
        <p class="text-3xl font-bold">Trying to authorize code with tiktok ...</p>
      </div>
      <div v-else-if="authDone && authorized">
        <div class="flex  place-items-center gap-2">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
          <p class="text-3xl font-bold">TikTok Authorization success</p>
        </div>
      </div>
      <div v-else>
        <p>Tiktok Authorization failed.</p>
      </div>
    </div>

    <div v-if="authDone" id="options" class="grid gap-2 justify-center">
      <Button variant="secondary">Back to account settings</Button>
      <Button variant="secondary">Go to main page</Button>
      <Button variant="secondary">Go to main page</Button>
    </div>

  </div>
</template>

<style scoped>
.checkmark__circle{
  stroke-dasharray: 66;
  stroke-dashoffset: 66;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
}

.checkmark{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0 0 0 #7ac142;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check{
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
}

@keyframes stroke{
  100%{
    stroke-dashoffset: 0
  }
}
@keyframes scale{
  0%, 100%{
    transform: none
  }
  50%{
    transform: scale3d(1.1, 1.1, 1)
  }
}

@keyframes fill{
  100%{
    box-shadow: inset 0 0 0 30px #7ac142
  }
}
</style>

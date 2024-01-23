<script setup lang="ts">
import { useBrandStore } from "@/stores/brandStore";
import Input from "@/components/ui/input/Input.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
const brandStore = useBrandStore();
const props = defineProps(['brand']);

const handleInputSource = async function (inputSource:any){
  console.log(inputSource)
  inputSource.value = !inputSource.value
}

</script>

<template>
  <div class="grid gap-4" id="brand-configuration-view">
    <h3> Select Brand Input Source </h3>
    <div id="input-source-list" class="grid gap-2">
      <div v-for="(inputSource, index) in brandStore.getInputSources">
        <div class="items-top flex gap-x-2">
          <Checkbox @click="handleInputSource(inputSource)" :id="'terms1'+index" v-model="inputSource.value" :checked="inputSource.value" />
          <div class="grid gap-1.5 leading-none">
            <label
                for="terms1"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ inputSource.name }}
            </label>
            <p class="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
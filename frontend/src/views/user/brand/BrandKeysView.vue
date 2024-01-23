<script setup lang="ts">
import {onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import { useBrandStore } from "@/stores/brandStore";
import Card from "@/components/ui/card/Card.vue";
import Button from "@/components/ui/button/Button.vue";
import TrashSvgIcon from "@/assets/icons/TrashSvgIcon.vue";
import KeysSvgIcon from "@/assets/icons/KeysSvgIcon.vue";
import CopySvgIcon from "@/assets/icons/CopySvgIcon.vue";
import LookSvgIcon from "@/assets/icons/LookSvgIcon.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
const brandStore = useBrandStore();

const brandKeys = ref([]);
const props = defineProps(['brand']);

onUpdated( async () => {
  brandKeys.value = await brandStore.getBrandKeys(props.brand?._id);
})

</script>

<template>
  <div id="brand-keys-view" v-if="brand" class="grid gap-2">
    <h3> Brand Keys: {{brand.keys.length}} </h3>
    <div id="key-list" class="grid gap-2" v-if="brand && brand.keys">
      <Card v-for="key in brand.keys">
        <CardHeader class="flex justify-between flex-row">
          <div class="flex place-items-center gap-4">
            <KeysSvgIcon class="w-5 h-5"></KeysSvgIcon>
            <div class="flex gap-2 place-items-center">
              <p class="font-bold">Name</p>
              <div>{{ key.name }}</div>
            </div>
            <div class="flex gap-2 place-items-center">
              <p class="font-bold">Token</p>
              <div>{{ key.token }}</div>
            </div>
          </div>
          <div class="options flex gap-2">
            <Button class="flex place-items-center justify-center" variant="ghost" @click="key.show = !key.show">
              <LookSvgIcon class="h-4 w-4"></LookSvgIcon>
            </Button>
            <Button class="flex place-items-center justify-center" variant="outline">
              <CopySvgIcon class="h-4 w-4"></CopySvgIcon>
            </Button>
          </div>
        </CardHeader>
        <CardContent v-if="key.show">
          <pre>
            <code>
              {{key}}
            </code>
          </pre>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
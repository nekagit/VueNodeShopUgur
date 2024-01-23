<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useBrandStore} from "@/stores/brandStore";
const props = defineProps(["linkedAccount", "brandId"]);
const loadedLinkedAccount = ref(null);

onMounted( async () => {
  loadedLinkedAccount.value =  await useBrandStore().getLinkedAccount(props.linkedAccount.id, props.brandId);
})
</script>
<template>
  <div class="h-full w-full overflow-auto">
    <div v-if="loadedLinkedAccount" class="w-full h-full overflow-x-auto">
      <pre class="w-full overflow-auto">
        <code class="w-full overflow-auto h-full">
          {{ loadedLinkedAccount }}
        </code>
      </pre>
    </div>
  </div>
</template>
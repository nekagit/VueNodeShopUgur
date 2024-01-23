<script setup lang="ts">
import { useBrandStore } from "@/stores/brandStore";
import Card from "@/components/ui/card/Card.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import Label from "@/components/ui/label/Label.vue";
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import Button from "@/components/ui/button/Button.vue";

const brandStore = useBrandStore();
const props = defineProps(['brand']);

const brandConfig = computed<any>( () => {
  return ref(props.brand?.config || null);
})

const brandConfig2 = ref<any>(null);

const handleChange = function (value: any, name: string){
  console.log(value, name)

}

watch(brandConfig,async (newVal, oldVal) => {
  brandConfig2.value = newVal;
})

</script>

<template>
  <div class="grid gap-4" id="brand-configuration-view">
    <h3> Brand Configuration </h3>
    {{ brandConfig }}
    <div class="flex flex-col gap-2">
      <Card v-if="brand && brand.config">
        <CardHeader>
          <CardTitle> Media downloads</CardTitle>
          <div class="flex gap-2">
            <Checkbox
                :checked="brand.config.media_download_web"
                @update:checked="value => handleChange(value, 'media_download_web')"
                name="media_download_web"
            />
            {{ brandConfig2 }}
            <div class="space-y-1 leading-none">
              <p>Use different settings for my mobile devices</p>
              <Label>
                You can manage your mobile notifications in the
                <a href="/examples/forms">mobile settings</a> page.
              </Label>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div>
        <Button @click="brandStore.updateConfig(brand._id, brandConfig)"> Save Configurations </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBrandStore } from "@/stores/brandStore";
import UserBrandNavComponent from "@/components/nav/user/UserBrandNavComponent.vue";
import Button from "@/components/ui/button/Button.vue";

const route = ref(useRoute());
const brandStore = useBrandStore();

const currentBrand = computed(() => {
  const brandList = ref(brandStore.getList);
  if (brandList.value && Array.isArray(brandList.value) && brandList.value.length > 0) {
    const currentBrandArray = brandList.value.filter(brand => brand._id === route.value.params.id.toString());
    if (currentBrandArray.length > 0) {
      return currentBrandArray[0];
    }
  }
  return null;
});

onMounted(async () => {
  await brandStore.getBrands();
});
</script>


<template>
  <div id="brand-layout">
    <div class="space-y-6">
      <div class="space-y-0.5 flex justify-between">
        <div class="">
          <h2 class="text-2xl font-bold tracking-tight"> Brand "<span v-if="currentBrand">{{currentBrand.name}}</span>"</h2>
          <p class="text-muted-foreground"> Manage your brand settings and set preferences. </p>
        </div>
        <Button variant="secondary">Save</Button>
      </div>
      <div data-orientation="horizontal" role="separator" class="shrink-0 bg-secondary my-6 h-px w-full"></div>
      <div class="flex flex-wrap gap-6">
        <div class="top-0 lg:w-1/5">
          <UserBrandNavComponent></UserBrandNavComponent>
        </div>
        <div id="brand-view" class="flex-1 w-full">
          <!-- Pass brand reference to child components -->
          <RouterView :brand="currentBrand"></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */

#brand-view{
  flex: 1 1 400px;
}
</style>

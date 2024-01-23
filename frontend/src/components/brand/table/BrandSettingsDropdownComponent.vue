<script setup lang="ts">
import SunSvgIcon from "@/assets/icons/SunSvgIcon.vue";

const props = defineProps(['brand'])


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useBrandStore } from "@/stores/brandStore";
import SettingsSvgIcon from "@/assets/icons/SettingsSvgIcon.vue";
import DeleteBrandDialogComponent from "@/components/brand/table/DeleteBrandDialogComponent.vue";
import {DropdownMenuPortal} from "radix-vue";
import router from "@/router";
import MenuPointsSvg from "@/assets/icons/MenuPointsSvg.vue";
import LookSvgIcon from "@/assets/icons/LookSvgIcon.vue";
const brand = useBrandStore();

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <MenuPointsSvg class="w-5 h-5" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div class="px-4 py-2">Brand "{{props.brand.name}}"</div>
      <DropdownMenuSeparator />

      <DropdownMenuItem class="w-full px-4 py-3 flex justify-between" @click="router.push('brand/'+props.brand._id)">
        View
        <LookSvgIcon class="w-4"></LookSvgIcon>
      </DropdownMenuItem>
      <DeleteBrandDialogComponent :brand="props.brand"></DeleteBrandDialogComponent>

    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
img{
  height: 24px;
  width: 24px;
}
</style>
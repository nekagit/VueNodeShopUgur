<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useUserStore } from "@/stores/userStore";
const user = useUserStore();

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex place-items-center">
      <div class="dummy">
        <img alt="profile" src="https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&amp;dpr=2&amp;q=80">
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="m-5">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem @click="user.signout();">Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
.dummy{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: rebeccapurple;
  overflow: hidden;
}
</style>
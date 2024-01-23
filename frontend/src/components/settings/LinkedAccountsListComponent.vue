<script setup lang="ts">
import LookSvgIcon from "@/assets/icons/LookSvgIcon.vue";
import Card from "@/components/ui/card/Card.vue";
import DeleteLinkedAccountComponent from "@/components/settings/DeleteLinkedAccountComponent.vue";
import Button from "@/components/ui/button/Button.vue";

import { useUserStore } from "@/stores/userStore";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import router from "@/router";
import DeleteBrandDialogComponent from "@/components/brand/table/DeleteBrandDialogComponent.vue";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import MenuPointsSvg from "@/assets/icons/MenuPointsSvg.vue";
import TrashSvgIcon from "@/assets/icons/TrashSvgIcon.vue";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
const userStore = useUserStore();


</script>

<template>
  <div class="w-full overflow-x-auto grid gap-2">
    <h4><span class="font-bold">Linked Accounts</span> - {{userStore.getLinkedAccounts.length}}</h4>
    <Table>
      <TableCaption>A list of your Linked Accounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            Provider
          </TableHead>
          <TableHead>
            Username
          </TableHead>
          <!-- <TableHead>Platform</TableHead> -->
          <TableHead class="">ID</TableHead>
          <TableHead class="text-right">
            Options
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="linkedAccount in userStore.getLinkedAccounts" :key="linkedAccount._id">
          <TableCell class="font-medium">
            {{ linkedAccount.provider }}
          </TableCell>
          <TableCell class="font-medium">
            {{ linkedAccount.user_info.display_name }}
          </TableCell>
          <TableCell>{{ linkedAccount._id }}</TableCell>
          <TableCell class="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuPointsSvg class="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent class="min-w-[200px]">
                <div class="px-4 py-2 text-center grid gap-2 text-sm">{{ linkedAccount.user_info.display_name }}
                  <hr>
                  <div class="font-bold">
                    {{ linkedAccount.provider}}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Dialog>
                  <DialogTrigger class="w-full">
                    <Button variant="ghost"  class="w-full flex justify-between py-1">
                      View
                      <LookSvgIcon class="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div class="overflow-x-scroll">
                      <pre>
                        <code>
                          {{ linkedAccount }}
                        </code>
                      </pre>
                    </div>
                    <DialogFooter>
                      Save changes
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DeleteLinkedAccountComponent :identifier="linkedAccount._id"></DeleteLinkedAccountComponent>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>
#test{
  min-width: 1200px !important;
}
</style>

<script setup lang="ts">
const props = defineProps(['identifier'])

import TrashSvgIcon from "@/assets/icons/TrashSvgIcon.vue";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

</script>

<template>
  <div id="delete-linked-account-component">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="ghost" class="h-8 w-full flex justify-between">
          Delete
          <TrashSvgIcon class="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove the linked account?</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="sm:justify-start">
          <DialogClose as-child>
            <Button type="button" variant="secondary">
              Close
            </Button>
            <Button @click="userStore.deleteLinkedAccount(identifier)" type="button" variant="destructive">
              delete
            </Button>

          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import PlusSvgIcon from "@/assets/icons/PlusSvgIcon.vue";

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
import FacebookSvgIcon from "@/assets/icons/FacebookSvgIcon.vue";
import InstagramSvgIcon from "@/assets/icons/InstagramSvgIcon.vue";
import TiktokSvgIcon from "@/assets/icons/TiktokSvgIcon.vue";
import {useTiktokStore} from "@/stores/tiktokStore";
import LinkedSvgIcon from "@/assets/icons/LinkedSvgIcon.vue";
const userStore = useUserStore();
const tiktokStore = useTiktokStore();

</script>

<template>
  <div id="select-provider-dialog-component">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" class="gap-2">
          <PlusSvgIcon class="w-6 h-6"></PlusSvgIcon>
          Add new linked account
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle class="flex place-items-center gap-2 justify-center ">
            <LinkedSvgIcon class="h-10"></LinkedSvgIcon>
            <p style="max-width: 200px">Choose a provider</p>
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-2">
          <Button @click="tiktokStore.auth()" class="gap-2" variant="outline">
            <TiktokSvgIcon class="w-5"></TiktokSvgIcon>
            <p class="w-16 text-left">TikTok</p>
          </Button>
          <Button class="gap-2" variant="outline">
            <InstagramSvgIcon class="w-5"></InstagramSvgIcon>
            <p class="w-16">Instagram</p>
          </Button>
          <Button class="gap-2" variant="outline">
            <FacebookSvgIcon class="w-5"></FacebookSvgIcon>
            <p class="w-16">Facebook</p>
          </Button>
        </div>
        <DialogFooter class="sm:justify-start">
          <DialogClose as-child>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
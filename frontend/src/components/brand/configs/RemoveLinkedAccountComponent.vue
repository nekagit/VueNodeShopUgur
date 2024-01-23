<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps(['linkedAccountId', 'brand'])

import { useBrandStore } from "@/stores/brandStore";
const brandStore = useBrandStore();

const inputName = ref("");

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TrashSvgIcon from "@/assets/icons/TrashSvgIcon.vue";

onMounted(() => {
  inputName.value = props.linkedAccountId;
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        <TrashSvgIcon class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Are you sure you want to remove the Linked Account {{linkedAccountId}} from your brand?</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            Close
          </Button>
          <Button @click="brandStore.removeLinkedAccount(linkedAccountId, brand._id)" type="button" variant="destructive">
            delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
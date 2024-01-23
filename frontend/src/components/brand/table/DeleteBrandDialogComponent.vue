<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps(['brand'])

import { useBrandStore } from "@/stores/brandStore";
const brandStore = useBrandStore();

const inputName = ref("");
import { Copy } from 'lucide-vue-next'
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
  inputName.value = props.brand?.name
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost"  class="w-full flex justify-between py-1">
        Delete
        <TrashSvgIcon class="h-3 w-3" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Are you sure you want to remove the brand?</DialogTitle>
        <DialogDescription>
          To be on the safe side, please write the current brand name "{{props.brand.name}}" you want to remove
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Label html-for="link" class="sr-only">
            Link
          </Label>
          <Input
              id="link"
              default-value="https://shadcn-vue.com/docs/installation"
              read-only
              v-model="inputName"
          />
        </div>
        <!--
        <Button type="submit" size="sm" class="px-3">
          <span class="sr-only">Copy</span>
          <Copy class="w-4 h-4" />
        </Button>
        -->
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="ghost">
            Close
          </Button>
          <Button @click="brandStore.deleteBrand(brand._id)" type="button" :variant="brand.name === inputName ? 'destructive' : null" :disabled="brand.name !== inputName">
            delete
          </Button>

        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";

const props = defineProps(["brand"])
import { ref } from "vue";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Checkbox } from '@/components/ui/checkbox'
import Button from "@/components/ui/button/Button.vue";

const downloadByProfileUrl = ref(true);
const downloadByProfileUrlInput = ref('');

const onDownloadByProfileUrl = function (value:boolean) {
  props.brand.media.download.byProfileUrls = value
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

</script>

<template>
  <Card>
    <CardHeader>
      <div class=" text-sm flex place-items-center gap-2">
          <Checkbox :checked="brand.media.download.byProfileUrls" id="terms1" @update:checked="onDownloadByProfileUrl" />
          <div class="grid gap-1.5 leading-none font-bold">
            <label
                for="terms1"
                class="text-2md"
            >
              Download By Profile
            </label>
        </div>
      </div>
    </CardHeader>
    <CardContent v-if="brand.media.download.byProfileUrls" class="grid gap-2">
      <div class="flex gap-2">
        <Input type="text" v-model="downloadByProfileUrlInput" placeholder="Enter profile URL here..."></Input>
        <Button
            variant="outline"
            :disabled="downloadByProfileUrlInput === ''"
            @click="brand.media.download.profile_urls.push({ url: downloadByProfileUrlInput, platform: 'platform'})"
        >Add</Button>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                Platform
              </TableHead>
              <!-- <TableHead>Platform</TableHead> -->
              <TableHead class="">URL</TableHead>
              <TableHead class="text-right">
                Downloads
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="invoice in brand.media.download.profile_urls" :key="invoice.invoice">
              <TableCell class="font-medium">
                {{ invoice.platform }}
              </TableCell>
              <TableCell>{{ invoice.url }}</TableCell>
              <TableCell class="text-right">
                0
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</template>
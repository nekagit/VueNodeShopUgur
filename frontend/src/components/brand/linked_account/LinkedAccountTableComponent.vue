<script setup lang="ts">
const props = defineProps(['accounts']);

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
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          ID
        </TableHead>
        <!--
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
        -->
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(account, index) in accounts" :key="'account'+index">
        <TableCell class="font-medium">
          {{ account }}
        </TableCell>
        <!--
        <TableCell>{{ invoice.paymentStatus }}</TableCell>
        <TableCell>{{ invoice.paymentMethod }}</TableCell>
        <TableCell class="text-right">
          {{ invoice.totalAmount }}
        </TableCell>
        -->
      </TableRow>
    </TableBody>
  </Table>
</template>
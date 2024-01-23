<script setup lang="ts">
import { onMounted } from 'vue';
import { useBrandStore } from "@/stores/brandStore";
import Table from "@/components/ui/table/Table.vue";
import Card from "@/components/ui/card/Card.vue";
import BrandSettingsDropdownComponent from "@/components/brand/table/BrandSettingsDropdownComponent.vue";
import { CardTitle } from "@/components/ui/card";
import CardContent from "@/components/ui/card/CardContent.vue";
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CardHeader from "@/components/ui/card/CardHeader.vue";
const brand = useBrandStore();
import router from "@/router";

onMounted(async () => {
  await brand.getBrands();
});
</script>

<template>
  <div class="">
    <Card>
      <CardHeader>
        <CardTitle>
          Brands Table - {{ brand.list.length }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                Name
              </TableHead>
              <TableHead class="hidden sm:table-cell">Key</TableHead>
              <TableHead class="text-right">
                Linked Accounts
              </TableHead>
              <TableHead class="text-right">
                Options
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="invoice in brand.list" :key="invoice._id" @dblclick="router.push('brand/' + invoice._id)">
              <TableCell class="font-medium">
                {{ invoice.name }}
              </TableCell>
              <TableCell class="hidden sm:table-cell">
                {{ invoice.key }}
              </TableCell>
              <TableCell class="text-right">
                {{ invoice.linked_accounts.length }}
              </TableCell>
              <TableCell class="flex place-items-center justify-end gap-1 text-right">
                <BrandSettingsDropdownComponent :brand="invoice"></BrandSettingsDropdownComponent>
                <!-- <DeleteBrandDialogComponent :brand="invoice"></DeleteBrandDialogComponent> -->
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>

</style>

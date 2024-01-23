<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import Button from "@/components/ui/button/Button.vue";
import LinkedSvgIcon from "@/assets/icons/LinkedSvgIcon.vue";
import TrashSvgIcon from "@/assets/icons/TrashSvgIcon.vue";
import RemoveLinkedAccountComponent from "@/components/brand/configs/RemoveLinkedAccountComponent.vue";
import LookSvgIcon from "@/assets/icons/LookSvgIcon.vue";
import {ref, computed, onUpdated, onBeforeUpdate} from "vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import {useUserStore} from "@/stores/userStore";
import {useBrandStore} from "@/stores/brandStore";
import CardContentComponent from "@/components/brand/linked_account/CardContentComponent.vue";

const props = defineProps(["brand"]);

const linkedAccounts = computed(() => {
  return props.brand?.linked_accounts.map((lAccount: string) => ({
    id: lAccount,
    content: ref(null),
    show: ref(false),
  })) || [];
});

const fetchLinkedAccount =  async (lAccountId: string) => {
  const result = await useBrandStore().getLinkedAccount(lAccountId, props.brand._id);
  console.log(result)
  return result
};

onBeforeUpdate( () => {
  console.log("lol")
})
</script>

<template>
  <div id="brand-linked-accounts-component" class="w-full relative h-full">
    <div v-if="brand" id="linked-accounts" class="grid gap-2">
      <div>
        <p class="text-sm"> Connected Linked Accounts - {{ brand.linked_accounts.length }}</p>
      </div>

      <Card v-for="lAccount in linkedAccounts" class="p-2 w-full text-sm overflow-auto" :key="lAccount.id">
        <CardHeader class="flex-row justify-between">
          <div class="identifier flex place-items-center gap-2">
            <LinkedSvgIcon class="h-6"></LinkedSvgIcon>
            <p>ID:</p>
            <div>{{ lAccount.id }}</div>
          </div>
          <div class="options flex gap-2">
            <Button
                :variant=" lAccount.show.value ? 'secondary' : 'ghost'"
                @click="lAccount.show.value = !lAccount.show.value">
              <LookSvgIcon class="h-4"></LookSvgIcon>
            </Button>
            <RemoveLinkedAccountComponent :linkedAccountId="lAccount.id" :brand="brand" />
          </div>
        </CardHeader>
        <CardContent v-if="lAccount.show.value" >
          <CardContentComponent class="h-full" :linked-account="lAccount" :brand-id="brand._id"></CardContentComponent>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

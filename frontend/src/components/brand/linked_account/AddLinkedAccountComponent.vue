<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
const props = defineProps(['brand']);

const selectedLinkedAccount = ref<any | null>(null);

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'

import { useUserStore } from "@/stores/userStore";
import PlusSvgIcon from "@/assets/icons/PlusSvgIcon.vue";
import Button from "@/components/ui/button/Button.vue";
const userStore = useUserStore();

onMounted(async () =>{
  await userStore.loadLinkedAccounts();
})


const availableLinkedAccounts = computed<any[]>(() => {
  let filteredArray: any[] = [];
  userStore.getLinkedAccounts.forEach((linked_account: any) => {
    let alreadyExist = props.brand?.linked_accounts.some((brand_linked_account: string) =>
        linked_account._id.toString() === brand_linked_account.toString()
    );
    if (!alreadyExist) filteredArray.push(linked_account);
  });
  return filteredArray;
});

</script>


<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex gap-1">
        <!-- <PlusSvgIcon class="w-5"></PlusSvgIcon> -->
        Add Linked Account
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-1" v-if="availableLinkedAccounts && (availableLinkedAccounts.length > 0)">
        <span>Select an Linked Account of {{ availableLinkedAccounts.length }}</span>
        <Select v-model="selectedLinkedAccount">
          <SelectTrigger>
            <SelectValue placeholder="Select an linked_account to connect with Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="linked_account in availableLinkedAccounts" :value="linked_account._id">
                <span v-if="linked_account && linked_account.user_info">
                  {{ linked_account.provider }} - {{ linked_account.user_info.display_name }}
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div v-else>
        There are no available Linked Account to connect with you brand. <br>
        You can manage linked-accounts in your
        <router-link class="underline" to="/settings/linked-accounts">settings</router-link>.
      </div>
      <div v-if="selectedLinkedAccount">
        {{ selectedLinkedAccount }}
      </div>

      <div v-if="selectedLinkedAccount">
        <div v-if="selectedLinkedAccount.provider === 'Tiktok' ">
          <div class="content">
            TikTok Linked Account Brand Settings
            <div>

            </div>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button
          @click="brand.linked_accounts.push(selectedLinkedAccount) && (selectedLinkedAccount = null)"
          variant="secondary"
          :disabled="!selectedLinkedAccount"
      > Add Linked Account</Button>
    </CardFooter>
  </Card>
  <div class="grid gap-1">

  </div>
</template>
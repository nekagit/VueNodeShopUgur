<script setup lang="ts">
import { h, ref, onMounted, reactive, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useBrandStore } from "@/stores/brandStore";
const brandStore = useBrandStore();

import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

onMounted(async () =>{
  await userStore.loadLinkedAccounts();
})

const props = defineProps(['brand']);

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/toast'
import LinkedSvgIcon from "@/assets/icons/LinkedSvgIcon.vue";

const formSchema = toTypedSchema(z.object({
  linked_account_id: z
      .string({
        required_error: 'Please select an linked_account to connect with brand.',
      })
      .min(2),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
  await brandStore.addLinkedAccount(props.brand?._id, values.linked_account_id);
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
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="linked_account_id">
      <FormItem>
        <FormLabel>Available Linked Accounts - {{availableLinkedAccounts.length}}</FormLabel>

        <div class="flex gap-2" v-if="availableLinkedAccounts.length > 0">
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an linked_account to connect with Brand" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="linked_account in availableLinkedAccounts" :value="linked_account._id">
                <span v-if="linked_account && linked_account.user_info">
                  {{ linked_account.provider }} - {{ linked_account.user_info.display_name}}
                </span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" class="gap-2">
            <LinkedSvgIcon class="w-4 h-4"></LinkedSvgIcon>
            Connect
          </Button>
        </div>
        <FormDescription>
          You can manage linked-accounts in your
          <router-link class="underline" to="/settings/linked-accounts">settings</router-link>.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
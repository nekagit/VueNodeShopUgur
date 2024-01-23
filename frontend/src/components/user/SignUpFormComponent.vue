<template>
  <div id="sign-up-form-component">
    <form @submit.prevent="onSubmit">
      <Card>
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid grid-cols-2 gap-6">
            <Button variant="outline" type="button" class="flex gap-2">
              <GithubSvgIcon />
              Github
            </Button>
            <Button variant="outline" type="button" class="flex gap-2">
              <GoogleSvgIcon />
              Google
            </Button>
          </div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
            </div>
          </div>

          <!-- USERNAME INPUT -->
          <FormField class="grid gap-2" v-slot="{ componentField }" name="username">
            <FormItem>
              <div class="flex gap-2">
                <FormLabel>Username </FormLabel> <FormMessage />
              </div>
              <FormControl>
                <Input id="email" type="text" placeholder="" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

          <!-- EMAIL INPUT -->
          <FormField class="grid gap-2" v-slot="{ componentField }" name="email">
            <FormItem>
              <div class="flex gap-2">
                <FormLabel>Email </FormLabel> <FormMessage />
              </div>
              <FormControl>
                <Input id="email" type="email" placeholder="m@example.com" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

          <!-- PASSWORD INPUT -->
          <FormField class="grid gap-2" v-slot="{ componentField }" name="password">
            <FormItem>
              <div class="flex gap-2">
                <FormLabel>Password </FormLabel> <FormMessage />
              </div>
              <FormControl>
                <Input id="password" type="password" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

        </CardContent>
        <CardFooter class="space-y-2">
          <Button v-if="!loading" variant="secondary" type="submit" class="w-full">
            Create account
          </Button>
          <Button class="w-full gap-2" v-else disabled>
            <Loader2 class="animate-spin" />
            Please wait
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>



<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Button} from "@/components/ui/button";

import GoogleSvgIcon from "@/assets/icons/GoogleSvgIcon.vue";
import GithubSvgIcon from "@/assets/icons/GithubSvgIcon.vue";


import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from "@/components/ui/form";


import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { useUserStore } from "@/stores/userStore";

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast();


const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
}))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try{
    loading.value = true;
    const response = await useUserStore().signup(values);
    loading.value = false;
    console.log(response);
  }catch (e:any) {
    loading.value = false;
    toast({
      title: "Error signup!",
      description: e.message,
      variant: 'destructive',
    })
    console.log(e);
  }
})
</script>


<style scoped>
#sign-up-form-component{
  max-width: 400px;
  width: 100%;
}
svg{
  height: 22px;
  width: 22px;
}
</style>
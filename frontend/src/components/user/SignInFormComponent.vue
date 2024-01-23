<template>
  <div id="sign-up-form-component">
    <form @submit.prevent="onSubmit">
      <Card>
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl">
            Sign In
          </CardTitle>
          <CardDescription>
            Enter your email below to Signin
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
          <div class="grid grid-cols-2 gap-6">
            <Button @click="tiktokAuth" variant="outline" type="button" class="flex gap-2">
              <TiktokSvgIcon />
              TikTok
            </Button>
            <Button variant="outline" type="button" class="flex gap-2">
              <!-- <GoogleSvgIcon /> -->
              Instagram
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
          <FormField class="grid gap-2" v-slot="{ componentField }" name="identifier">
            <FormItem>
              <div class="flex gap-2">
                <FormLabel>Username </FormLabel> <FormMessage />
              </div>
              <FormControl>
                <Input id="identifier" type="text" placeholder="or Email" v-bind="componentField" />
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
            Sign In
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
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'

import {Input} from '@/components/ui/input'
import {Button} from "@/components/ui/button";

import GoogleSvgIcon from "@/assets/icons/GoogleSvgIcon.vue";
import GithubSvgIcon from "@/assets/icons/GithubSvgIcon.vue";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import TiktokSvgIcon from "@/assets/icons/TiktokSvgIcon.vue"

import * as z from 'zod'
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate'

import {useUserStore} from "@/stores/userStore";
import {useToast} from '@/components/ui/toast/use-toast'

import {Loader2} from 'lucide-vue-next'
import {ref} from 'vue'

const userStore = useUserStore();
const loading = ref(false);

const formSchema = toTypedSchema(z.object({
  identifier: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
}))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})



const tiktokAuth = async function (){
  try{
    return await userStore.tiktokAuth();
  }catch (e) {
    console.log(e);
  }
}

const onSubmit = handleSubmit(async (values:any) => {
  const { toast } = useToast();
  try{
    loading.value = true;
    const response:any = await userStore.signin({
      username: values.identifier,
      password: values.password
    });
    loading.value = false;
    toast({
      title: "Success signin",
      description: response.data.message,
    })
    console.log(response);
  }catch (e:any) {
    loading.value = false;
    toast({
      title: "Error signin",
      description: e.message,
      variant: 'destructive',
    })
    console.log(e.message);
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
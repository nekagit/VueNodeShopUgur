<script setup lang="ts">

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-vue-next";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import { ref } from "vue";
const loading = ref(false);


import { useBrandStore } from "@/stores/brandStore";
const brand = useBrandStore();

import { useForm } from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";


const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
}))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const newBrandName = ref("");

const createNewBrand = async function (){
  try{
    loading.value = true;
    const result:any = await brand.newBrand({
      name: newBrandName.value,
    });
    loading.value = false;
    console.log(result);
  }catch (e:any) {
    console.log(e);
    loading.value = false;

  }
}

</script>
<template>
  <div id="new-brand-component" class="">
    <Card>
      <CardHeader>
        <CardTitle>
          Create Brand
        </CardTitle>
        <CardDescription>
          Description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2">
          <Input v-model="newBrandName" type="text" placeholder="Enter your brand name here ..."/>
          <Button variant="secondary" @click="createNewBrand" class="w-1/4 ml-auto" :disabled="loading">
            <span v-if="!loading">Create</span>
            <span v-else class="flex gap-2">
            <Loader2 class="animate-spin" />
            Please wait
          </span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  </div>
</template>
<style scoped></style>
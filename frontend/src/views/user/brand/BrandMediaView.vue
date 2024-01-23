<script setup lang="ts">
import MediaEditComponent from "@/components/brand/media/MediaEditComponent.vue";

const props = defineProps(["brand"]);

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import MediaDownloadComponent from "@/components/brand/media/MediaDownloadComponent.vue";
import MediaUploadComponent from "@/components/brand/media/MediaUploadComponent.vue";
</script>

<template>
  <div id="brand-media-view">
    <Tabs default-value="download" class="">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="download">
          Download
        </TabsTrigger>
        <TabsTrigger value="edit">
          Edit
        </TabsTrigger>
        <TabsTrigger value="upload">
          Upload
        </TabsTrigger>
      </TabsList>

      <TabsContent value="download">
        <MediaDownloadComponent v-if="brand" :brand="brand"></MediaDownloadComponent>
      </TabsContent>
      <TabsContent value="edit">
        <MediaEditComponent v-if="brand" :brand="brand"></MediaEditComponent>
      </TabsContent>
      <TabsContent value="upload">
        <MediaUploadComponent v-if="brand" :brand="brand"></MediaUploadComponent>
      </TabsContent>
    </Tabs>
  </div>
</template>
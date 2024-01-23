<script setup lang="ts">
const props = defineProps(['brand']);

</script>

<template>
  <div id="brand-linked-accounts-view">
    <h3> Brand Overview </h3>
    <pre>
      <code>
        {{ brand }}
      </code>
    </pre>

  </div>
</template>


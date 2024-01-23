<script setup lang="ts">

import UserTopnavComponent from "@/components/nav/user/UserTopnavComponent.vue";
import UserSidnenavComponent from "@/components/nav/user/UserSidnenavComponent.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";
</script>

<template>
  <div id="user-layout">
    <div id="topnav" class="border-b-2">
      <UserTopnavComponent></UserTopnavComponent>
    </div>
    <div id="view-layout">
      <div id="sidenav" class="border-r-2">
        <UserSidnenavComponent></UserSidnenavComponent>
      </div>
      <div id="view" class="w-full">
        <div class="container w-full content py-10">
          <RouterView></RouterView>
        </div>
        <div id="footer-layout" class="border-t-2">
          <FooterComponent></FooterComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#user-layout{

}

#topnav{
  position: sticky;
  top: 0;
  height: 70px;
  z-index: 10;
}

#view-layout{
  display: flex;
  position: relative;
}

#sidenav{
  position: sticky;
  top: 70px;
  left: 0;
  height: calc(100vh - 70px);
  width: 300px;
}

#view{
  flex-direction: column;
}

#view .content{
  min-height: 100vh;
}

@media (max-width: 768px) {
  #sidenav{
    display: none;
  }
}
</style>
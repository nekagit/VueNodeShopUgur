import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import MainLayout from "@/layouts/MainLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";

// Main Views
import HomeView from '@/views/main/HomeView.vue'
import SignUpView from "@/views/main/SignUpView.vue";
import SignInView from "@/views/main/SignInView.vue";
import NotFoundView from "@/views/main/NotFoundView.vue";

// User Views
import DashboardView from "@/views/user/DashboardView.vue";

import { useUserStore } from '@/stores/userStore';
import SettingsLayout from "@/layouts/user/SettingsLayout.vue";
import UserProfileSetting from "@/views/user/settings/UserProfileSetting.vue";
import UserAccountSetting from "@/views/user/settings/UserAccountSetting.vue";
import UserAppearanceSetting from "@/views/user/settings/UserAppearanceSetting.vue";
import UserNotificationsSetting from "@/views/user/settings/UserNotificationsSetting.vue";
import UserDisplaySetting from "@/views/user/settings/UserDisplaySetting.vue";
import BrandsView from "@/views/user/BrandsView.vue";
import BrandLayout from "@/layouts/user/BrandLayout.vue";
import BrandOverview from "@/views/user/brand/BrandOverview.vue";

import BrandConfigurationView from "@/views/user/brand/BrandConfigView.vue";
import BrandKeysView from "@/views/user/brand/BrandKeysView.vue";
import TiktokRedirectView from "@/views/user/tiktok/TiktokRedirectView.vue";
import LinkedAccountsSettingView from "@/views/user/settings/LinkedAccountsSettingView.vue";
import BrandMediaView from "@/views/user/brand/BrandMediaView.vue";
import BrandLinkedAccountsView from "@/views/user/brand/BrandLinkedAccountsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      components: {
        main: MainLayout,
        authed: UserLayout
      },
      children: [
        {
          name: "Home",
          path: "",
          component: HomeView
        },
        {
          name: "Dashboard",
          path: "/",
          component: DashboardView,
          meta: {
            requiresAuth: true
          },
        },
        {
          name: "Brands",
          path: "/brands",
          component: BrandsView,
          meta: {
            requiresAuth: true
          },
        },
        {
          name: "Brand",
          path: "/brand/:id",
          component: BrandLayout,
          meta: {
            requiresAuth: true
          },
          children: [
            { name: "Overview", path: '', component: BrandOverview },
            { name: "Media", path: 'media', component: BrandMediaView },
            { name: "LinkedAccounts", path: 'laccounts', component: BrandLinkedAccountsView },
            { name: "Configurations", path: 'configs', component: BrandConfigurationView },
            { name: "Keys", path: 'keys', component: BrandKeysView },
          ]
        },
        {
          name: "Settings",
          path: "settings",
          component: SettingsLayout,
          meta: {
            requiresAuth: true
          },
          children: [
            { name: "SettingsProfileSetting", path: "profile", component: UserProfileSetting },
            { name: "SettingsLinkedAccounts", path: 'linked-accounts', component: LinkedAccountsSettingView },
            { name: "AccountSetting", path: "account", component: UserAccountSetting },
            { name: "AppearanceSetting", path: "appearance", component: UserAppearanceSetting },
            { name: "NotificationsSetting", path: "notifications", component: UserNotificationsSetting },
            { name: "DisplaySetting", path: "display", component: UserDisplaySetting },
          ]
        },
        {
          name: "TiktokRedirect",
          path: "/tiktok/redirect",
          component: TiktokRedirectView
        },
        {
          path: '/sign-up',
          name: 'SignUp',
          component: SignUpView,
        },
        {
          path: '/sign-in',
          name: 'SignIn',
          component: SignInView,
        },

      ]
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
  ]
})

router.beforeEach(async (to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userStore = useUserStore();
  const toPath = to.fullPath.toString();
  //console.log(from, to);


  /*
    if(toPath.includes('/?code=') && toPath.includes('&scopes=user.info.basic&state=')){
      if(to.query && to.query.code){

        console.log("Check: ", to.query.code)
        try{
          await useTiktokStore().auth(to.query.code.toString())
          next({name: 'Home'})
          //return null;
        }catch(e){
          console.log(e);
          return;
        }
      }
    }
    */


  if(requiresAuth || localStorage.getItem('auth-token')){
    try{
      await userStore.auth();
    }catch (e){
      next({name:'SignIn'})
      return;
    }
  }

  if(to.name === 'Home' && userStore.isAuthed){
    next({ name: 'Dashboard' });
  }

  else if (requiresAuth && !userStore.isAuthed) {
    next({ name: 'SignIn' });
  }else{
    next()
  }
});

export default router

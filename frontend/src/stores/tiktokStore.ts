import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxiosStore } from "@/stores/axiosStore";
import { useToast } from "@/components/ui/toast";
import {useUserStore} from "@/stores/userStore";

export const useTiktokStore = defineStore({
    id: 'tiktok',
    state: () => {
        return {
            tokens: ref<any>([]),
        }
    },
    getters: {},
    actions: {
        // verify vs. authorize
        async auth():Promise<any>{
            try{
                const response = await useAxiosStore().get('/tiktok/auth');
                if(response.status === 200) {
                    window.location.href = response.data;
                }
            }catch (e) {
                console.log(e);
            }
        },
        async oauth(code:string):Promise<any>{
            return new Promise( async (resolve, reject) => {
                try {
                    /*
                    const path = route.fullPath.toString();
                    const regex = /^\/\?code=[a-zA-Z0-9_.!*-]+&scopes=user\.info\.basic&state=[a-zA-Z0-9_\-]+$/;
                    const match = regex.test(path);


                     */
                    let req = {
                        url: '/tiktok/oauth',
                        body: {
                            code: code,
                            user_id: useUserStore().user,
                        },
                    };
                    const response = await useAxiosStore().post(req);
                    if (response && response.status === 200) {

                        useToast().toast({
                            title: response.data.error ? 'Tiktok oauth error' : 'Tiktok oauth success',
                            description: response.data.error ? response.data.error_description : JSON.stringify(response.data),
                            variant: response.data.error ? 'destructive' : 'default',
                        })

                        if(response.data && !response.data.error){
                            resolve(response.data);
                        }else{
                            reject(response.data);
                            return null;
                        }
                        reject("Fatal tiktok auth error");
                    }
                    return response;
                } catch (e) {
                    console.log(e);
                    reject(e);
                }
            })
        },
        async getUserInfo(access_token: string){
            try {

            }catch (e) {
                console.log(e);
            }
        }
    }
});
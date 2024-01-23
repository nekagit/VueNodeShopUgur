import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosStore } from "@/stores/axiosStore";
import router from "@/router";

export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            user: ref(null),
            token: ref(""),
            authed: ref(false),
            linked_accounts: ref([]),
        }
    },
    getters: {
        isAuthed: (state:any): boolean => state.authed,
        getUser: (state: any): string => state.user,
        getLinkedAccounts: (state: any): Array<{
            _id: string,
            provider: string,
            user_info: any,
            token: string,
            display: boolean,
        }> => state.linked_accounts,
    },
    actions: {
        async auth() {
            try {
                const req = {
                    body: {
                        token: localStorage.getItem('auth-token'),
                    },
                    url: '/user/auth',
                };
                const auth = await useAxiosStore().post(req);
                this.user = auth.data;
                this.authed = true;
            }catch (e) {
                console.log(e)
                this.authed = false;
                localStorage.removeItem('auth-token');
                throw e;
            }
        },
        async signup(user:any){
            return new Promise( async (resolve, reject) => {
                try{
                    let req = {
                        url: '/user/signup',
                        body: user
                    }
                    const res = await useAxiosStore().post(req);
                    resolve(res);
                }catch (e){
                    reject(e);
                }
            })
        },
        async signin(user:any){
            return new Promise( async (resolve, reject) => {
                try{
                    let req = {
                        url: '/user/signin',
                        body: user
                    }
                    const response = await useAxiosStore().post(req);
                    if(response.status === 200){
                        this.token = <string>response.data;
                        console.log(this.token)
                        localStorage.setItem('auth-token', this.token);
                        await router.push({name:"Dashboard"});
                    }
                    resolve(response);
                }catch (e){
                    reject(e);
                }
            })
        },
        async signout(){
            try{
                localStorage.removeItem('auth-token');
                this.authed = false;
                await router.push('/');
            }catch (e){
                console.log(e);
            }
        },
        // function to navigate TikTok auth page
        async tiktokAuth(){
            try {
                // edit - check if tiktok auth data exist
                const response = await useAxiosStore().get('/user/auth/tiktok');
                if(response.status === 200) {
                    window.location.href = response.data;
                }
            }catch (e){
                console.log(e);
            }
        },
        async loadLinkedAccounts(){
            try{
                const res = await useAxiosStore().get('/user/'+this.getUser+'/linked-account/');
                if(res.status === 200){
                    this.linked_accounts = res.data;
                    return this.linked_accounts;
                }
                console.log(res);
                return null;
            }catch (e) {
                console.log(e);
                return null;
            }
        },
        async getData(){
            try{
                const res = await useAxiosStore().get('/user/' + this.user );
                if(res.status === 200){
                    return res.data;
                }
                console.log(res);
                return null;
            }catch (e) {
                console.log(e);
                return null;
            }
        },
        async deleteLinkedAccount(id:string){
            try{
                const res = await useAxiosStore().delete('/user/'+this.getUser+'/linked-account/'+id);
                if(res.status === 200){
                    await this.loadLinkedAccounts();
                    return res.data;
                }
                console.log(res);
                return null;
            }catch (e) {
                console.log(e);
                return null;
            }
        }
    },
})
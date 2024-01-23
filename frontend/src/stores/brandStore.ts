import { useAxiosStore } from "@/stores/axiosStore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import type { Brand } from "@/types";

export const useBrandStore = defineStore({
    id: 'brand',
    state: () => {
        return {
            list: ref<Brand[]>([]), // Use the Brand type here
            current: ref<Brand | null>(null), // Use the Brand type here
            inputSources: ref([
                { name: 'telegram', value: false },
                { name: 'profile-list', value: true }
            ])
        }
    },
    getters: {
        getList(): Brand[] {
            return this.list;
        },
        getCurrent():any{
            return this.current;
        },
        getInputSources():any {
            return this.inputSources;
        }
    },
    actions: {

        async newBrand(payload: any){
            try{
                const payloadBrand = {
                    name: payload.name,
                    user_id: useUserStore().getUser,
                }
                const axios = useAxiosStore();
                const reqPayload = {
                    url: '/brand/' + useUserStore().getUser,
                    body: {
                        brand: payloadBrand,
                    }
                }
                const result = await axios.post(reqPayload);
                await this.getBrands();
                return result;
            }catch (e) {
                console.log(e);
            }
        },
        async getBrands():Promise<[]>{
            try{
                const axios = useAxiosStore();
                const user = useUserStore();

                const result = await axios.get('/brand/user/' + user.getUser);
                this.list = result.data;
                return result.data;
            }catch (e) {
                console.log(e);
                return [];
            }
        },
        async getById(id:string):Promise<any>{
            try{
                const axios = useAxiosStore();
                const user = useUserStore();

                const response = await axios.get('/brand/' + id + '/user/' + user.getUser );
                if(response.status === 200){
                    return response.data;
                }
                return null;
            }catch (e) {
                console.log(e);
                return null;
            }
        },
        async getBrandKeys(brandId:string):Promise<[]>{
            try{
                const axios = useAxiosStore();

                const result = await axios.get('/brand/' + brandId + '/keys');
                if(result.status === 200){
                    return result.data;
                }else{
                    return [];
                }
            }catch (e) {
                console.log(e);
                return [];
            }
        },
        async deleteBrand(id:string):Promise<string>{
            try{
                const axios = useAxiosStore();
                const result = await axios.delete('/brand/' + id);
                await this.getBrands();
                return result.data.toString();

            }catch (e:any) {
                console.log(e);
                return e.toString();
            }
        },
        async addLinkedAccount(brandId:string, linkedId:string):Promise<any>{
            try{
                let req = {
                    url: '/brand/' + brandId + '/linked-account/' + linkedId,
                }
                const result = await useAxiosStore().post(req)
                await this.getBrands();
                console.log(result);
            }catch (e) {
                console.log(e);
            }
        },
        async removeLinkedAccount(linkedAccountId: string, brandId: string):Promise<any>{
            try {
                const response = await useAxiosStore().delete('/brand/'+ brandId +'/linked-account/'+linkedAccountId);
                if(response.status === 200){
                    await this.getBrands();
                    return response.data;
                }
                return null;
            }catch (e) {
                console.log(e);
                return null;
            }
        },

        async getLinkedAccount(lAccountId: string, brandId: string):Promise<any>{
            try{
                const response = await useAxiosStore().get('/brand/'+ brandId +'/linked-account/'+lAccountId);
                if(response.status === 200){
                    return response.data;
                }
                return null;
            }catch (e) {

            }
        },
        async updateConfig(brandId:string, config: any){
            try{
                const response = await useAxiosStore().post({
                    url: '/brand/'+brandId+'/config',
                    body: {
                        config: config
                    },
                })
                if(response.status === 200){
                    await this.getBrands();
                    console.log("hää")
                    return response.data;
                }
                console.log(response);
            }catch (e) {
                console.log(e);
            }
        }
    },
});
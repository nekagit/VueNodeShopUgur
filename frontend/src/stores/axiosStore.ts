import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast();

// Axios Configurations
function setBaseUrl(){
    axios.defaults.baseURL = 'http://localhost:4000/api';
}

function setToken (){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth-token');
}
//axios.defaults.headers.post['Content-Type'] = 'application/json';

// Pinia Store Configurations
export const useAxiosStore = defineStore({
    id: 'axios',
    state: () => {
        return {}
    },
    getters: {},
    actions: {
        async get(path: string):Promise<any> {
            return new Promise( async (resolve, reject) => {
                setToken();
                setBaseUrl();
                try{
                    const response = await axios.get('' + path);
                    resolve(response);
                }catch (e:any) {
                    if(e.response && e.response.data){
                        toast({
                            title: 'Axios Error',
                            description: e.response.data.message,
                            variant: 'destructive',
                        })
                        reject(e.response.data);
                    }
                    else {
                        toast({
                            title: 'Axios Error',
                            description: e.message,
                            variant: 'destructive',
                        })
                        reject(e)
                    }
                }
            })
        },

        async post(req: any):Promise<any> {
            return new Promise( async (resolve, reject):Promise<any> => {
                setToken();
                setBaseUrl();
                try{
                    const response = await axios.post('' + req.url, req.body);
                    resolve(response);
                }catch (e:any) {
                    if(e.response && e.response.data){
                        toast({
                            title: 'Axios Error',
                            description: e.response.data.message,
                            variant: 'destructive',
                        })
                        reject(e.response.data);
                    }
                    else {
                        toast({
                            title: 'Axios Error',
                            description: e.message,
                            variant: 'destructive',
                        })
                        reject(e)
                    }
                }
            })
        },

        async delete(path: string):Promise<any> {
            return new Promise( async (resolve, reject) => {
                setToken();
                setBaseUrl();
                try{
                    const response = await axios.delete('' + path);
                    resolve(response);
                }catch (e:any) {
                    if(e.response && e.response.data){
                        toast({
                            title: 'Axios Error',
                            description: e.response.data.message,
                            variant: 'destructive',
                        })
                        reject(e.response.data);
                    }
                    else {
                        toast({
                            title: 'Axios Error',
                            description: e.message,
                            variant: 'destructive',
                        })
                        reject(e)
                    }
                }
            })
        },
    },
})
import { defineStore } from "pinia";

export const useAppStore = defineStore({
    id: 'app',
    state: () => {
        return {
            theme: 'light',
        }
    },
    getters: {},
    actions: {
        init(){
            let appTheme = localStorage.getItem('app-theme');
            if(appTheme && appTheme === 'dark'){
                const body = document.querySelector('body');
                if(body) {
                    this.theme = 'dark';
                    body.classList.add(this.theme)
                }
            }
        },
        toggleTheme(){
            let isDark = document.querySelector('body')?.classList.contains('dark');
            const body = document.querySelector('body');
            isDark = body?.classList.contains('dark');
            isDark ? body?.classList.remove('dark') : body?.classList.add('dark');
            isDark ? localStorage.removeItem('app-theme') : localStorage.setItem('app-theme', 'dark');
            isDark ? this.theme = 'light' : this.theme = 'dark';
        },
        setTheme(theme:string){
            this.theme = theme;
            const body = document.querySelector('body');

            if(theme === 'dark'){
                body?.classList.remove('light');
                body?.classList.remove('dark');
            }else{
                body?.classList.remove('dark');
                body?.classList.add('light');
            }
            body?.classList.add(this.theme)
            localStorage.setItem('app-theme', this.theme);
        }
    },
});
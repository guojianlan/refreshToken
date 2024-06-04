/**
 * src/services/index.ts
 */
import {onwFetch} from "@/services/ownFetch";


export const loginService = (username:string,password:string)=>{
    return onwFetch('/auth/login',{
        method:'post',
        body:JSON.stringify({
            username,
            password
        }),
        headers:{
            'content-type':"application/json",
        },
    })
}
export const getListService = ()=>{
    return onwFetch<{data:string}>('/')
}
export const getTestListService = ()=>{
    return onwFetch<{list:string[]}>('/test')
}

export const refreshTokenAction:{
    refreshTokenServiceInstance:Promise<boolean> | undefined
    refreshTokenService:()=>Promise<boolean>
    retryIndex:number
    maxRetry:number
} = {
    refreshTokenServiceInstance:undefined,
    retryIndex:0,
    maxRetry:10,
    refreshTokenService:function(){
        if(this.refreshTokenServiceInstance){
            return this.refreshTokenServiceInstance
        }
        this.refreshTokenServiceInstance = new Promise((resolve)=>{
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken && window.location.pathname !== '/login') {
                window.location.href = '/login';
                return;
            }
            onwFetch<{success:boolean}>('/auth/refreshToken',{
                headers:{
                    'refresh-token': refreshToken || ''
                }
            }).finally(()=>{
                this.refreshTokenServiceInstance = undefined
            }).then(async res=>{
                const json = await res.json()
                if(json.data.success){
                    this.retryIndex=0
                    resolve(true)
                }else{
                    if(this.retryIndex<this.maxRetry){
                        this.retryIndex++;
                        // 添加重试次数
                        setTimeout(()=>{
                            resolve(true)
                        },this.retryIndex*60)
                    }else{
                        this.retryIndex=0
                        resolve(false)
                    }

                }
            }).catch(e=>{
                this.retryIndex++;
                resolve(false)
            })

        })
        return this.refreshTokenServiceInstance
    }
}
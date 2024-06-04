/**
 * src/services/ownFetch.ts
 */
import {isBrowser} from "@/lib/utils";
import {refreshTokenAction} from "@/services/index";
export const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3001'
export const onwFetch  = <T>(url: string, config: ApiManager.TResponse = {}) => {
    // @ts-ignore
    return new Promise<ApiManager.IActionResponse<T>>(async (resolve, reject) => {
        try {
            let _url = new URL(url, baseUrl);
            if (config.queryCache === undefined || config.queryCache) {
                _url.searchParams.append('__T', Date.now() + '');
                delete config.queryCache;
            }
            if (isBrowser()) {
                const token = localStorage.getItem('accessToken') || '';
                config.headers = config.headers || {};
                if (token) {
                    // @ts-ignore
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            }
            const _config = {...config}
            // config.headers. 为了sse 做的预留
            const isStream = config.fetchEventStream ?? false;
            if (isStream) {
                delete config.fetchEventStream;
            }
            const res = await fetch(_url, {
                ...config
            });
            // 200的情况
            if (res.ok) {
                const accessToken = res.headers.get('access-token') || ''
                const refreshToken = res.headers.get('refresh-token') || ''
                if(accessToken){
                    window.localStorage.setItem('accessToken',accessToken)
                }
                if(refreshToken){
                    window.localStorage.setItem('refreshToken',refreshToken)
                }
                resolve(res);
                return;
            }
            if(res.status===401){
                // 尝试登录
                if(await refreshTokenAction.refreshTokenService()){
                    _config.headers = _config.headers || {};
                    const token = localStorage.getItem('access-token') ||'';
                       if(token){
                           // @ts-ignore
                           _config.headers['Authorization'] = `Bearer ${token}`;
                       }
                       resolve(await onwFetch(_url as  unknown as  string,{..._config}) as any)
                }

            }
            //非200的情况
            const data = (await res.json()) as any;

            if (!isStream) {
                resolve({
                    response: res,
                    error: true,
                    json: async () => {
                        return data;
                    }
                } as any);
                return;
            }
            reject(res);
        } catch (e) {
            reject(e);
        }
    });
};

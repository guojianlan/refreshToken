'use client'
/**
 * stc/_home/homePageView.tsx
 */
import {useEffect, useState} from "react";
import {getListService, getTestListService} from "@/services";

export const HomePageView = ()=>{
    const [data, setData] = useState<{data:string}>()
    const [testData, setTestData] = useState<{list:string[]}>()
    const [fetch, setFetch] = useState<string | ''>('')
    useEffect(() => {
        if(fetch === '') return
        async function  getList (){
            const res = await  getListService();
            const json = await res.json();
            setData(json.data)
        }
        async function getTestList (){
            const res = await getTestListService();
            const json = await res.json();
            setTestData(json.data)
        }
        void getList();
        void getTestList();
    }, [fetch]);
    return <div>
        <div onClick={()=>{
            setFetch(new Date()+"")
        }}>测试接口</div>
        <div>{JSON.stringify(data)}</div>
        <div>{JSON.stringify(testData)}</div>
    </div>
}
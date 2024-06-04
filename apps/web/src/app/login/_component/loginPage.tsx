'use client'
/**
 * src/login/_component/loginPage.tsx
 */
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import React, {useTransition} from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage,
} from "@/components/ui/form"
const formSchema = z.object({
    username: z.string().email({
        message: "请填写正确的邮箱",
    }),
    password:z.string().min(1,{
        message:"请输入密码"
    }).min(6,{
        message:"密码长度应为6-18个字符"
    }).max(18,{
        message:"密码长度应为6-18个字符"
    })
})
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {loginService} from "@/services";
import {useRouter} from "next/navigation";

export const LoginFormPage = () =>{
    const router =  useRouter()
    const [isPending,startTransition] = useTransition();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    const onSubmit = (values:z.infer<typeof formSchema>)=>{
        startTransition(()=>{
            loginService(values.username,values.password).then(async res=>{
                console.log(await res.json())
                 router.push('/')
            }).catch(e=>{
                console.log(e)
            })
        })

    }
    return (<Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    <FormField control={form.control} render={({field})=>{
                        return <FormItem className={'grid gap-2 relative'}>
                            <FormLabel>邮箱</FormLabel>
                            <FormControl>
                                <Input placeholder={'请输入邮箱'} {...field} />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    }} name={'username'} />
                    <FormField control={form.control} render={({field})=>{
                        return <FormItem  className={'grid gap-2'}>
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                                <Input placeholder={'请输入邮箱'} {...field} />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    }} name={'password'} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                    Sign up
                </Link>
            </div>
        </CardContent>
    </Card>)
}

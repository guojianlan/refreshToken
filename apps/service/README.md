# 步骤
# 先添加auth控制器。
## 然后添加全局的拦截器
TransformDataInterceptor
    实现NestInterceptor里面的方法，这里面涉及了Rxjs的一些操作
## 添加全局错误监听
AllExceptionsFilter
## 创建自定义错误
   
## 添加guard拦截

## 添加@nestjs/jwt 包做登录
    pnpm install  @nestjs/jwt --filter service
## 在公共返回那里添加根据返回headers来增加响应头
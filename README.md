# Talks
这是一个交友网站.


## 声明
有2年的时间没有动过这个项目了。这次刚好要用koa2和angular4做项目实践。所以就把它给整出来了。网站风格和样子可能改变了，希望你会喜欢，原来的代码我打了tag1.0.0。

## koa2 + angular4 + mongodb
项目因为使用的技术都比较新，所以对开发环境和运行环境都有要求。

环境要求：
1. Node.js 7.6+
2. TypeScript 2.2+
3. koa2
4. mongodb
5. webpack2

## run
如何把这个项目运行起来呢。

1. 执行 `sudo mongod || mongod.exe` 命令把mongodb跑起来。
2. 执行 `npm install` 和 `npm install -g webpack` 命令，保证依赖的安装包都安装进来了。
3. 执行 `webpack`命令打包前端代码。
4. 执行 `npm start` 启动node.js。

这样一切么问题了，就可以访问了。

地址是 `127.0.0.1:3000`. 假如`npm start `报错.你就要去看看是不是 `app.listen`里面的ip是不是错误的。

其实我很喜欢用手机访问，毕竟它是一个手机端的网站。


假如你对 koa2 + angular4 +TypeScript 感兴趣。我也写了一个小demo. 放在了 [koa-angular4-demo](https://github.com/Yi-love/koa-angular4-demo)这个项目了。
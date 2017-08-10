==引言==：Electron是目前非常流行的一种开发框架，它可以让你使用纯JS调用丰富的原生APIs来创造桌面应用。你可以把它看作是专注于桌面应用而不是web服务器。这不意味着 Electron是绑定了GUI库JavaScript。相反，Electron使用web页面作为它的GUI，所以你能把它看作成一个被JavaScript控制的，精简版的Chromium浏览器。

- 一、搭建跨平台应用
- 二、调用第三方DLL库
- 三、打包Electron应用


#### 一、搭建跨平台应用
##### 1、环境安装
- 安装Node.JS，地址：[http://nodejs.cn/download/](http://note.youdao.com/)，下载最新版本，默认集成npm命令。
- 安装electron
    ```
    npm install -g electron（全局安装）/npm install electron（局部安装）
    ```
    推荐全局安装。
- 安装nrm，此模块主要的功能可以切换镜像源地址
    ```
    npm install -g nrm
    ```
    - 查询目前可用镜像源地址
    
    ```
    nrm ls
    ```
    - 打印如下
    
    ```
    npm ---- https://registry.npmjs.org/
    cnpm --- http://r.cnpmjs.org/
    taobao - https://registry.npm.taobao.org/
    *nj ----- https://registry.nodejitsu.com/
    rednpm - http://registry.mirror.cqupt.edu.cn/
    npmMirror  https://skimdb.npmjs.com/registry/
    edunpm - http://registry.enpmjs.org/
    ```
    - 切换镜像源
    
    ```
    nrm use taobao
    ```
#### 2、创建第一个Electron应用程序
- 目录结构：
    ```
    --- your-app/
        |- packager.json
        |- main.js
        |- index.html
    ```
    - package.json的格式和Node的完全一致，并且那个被main字段声明的脚本文件是你的应用的启动脚本，它运行在主进程上。你应用里的package.json看起来应该像：
    
    ```
    {
      "name"    : "your-app",
      "version" : "0.1.0",
      "main"    : "main.js"
    }
    ```
     ++   注意：如果 main 字段没有在 package.json 声明，Electron会优先加载 index.js。++
    - main.js 应该用于创建窗口和处理系统事件，一个典型的例子如下：
    
    ```
    const {app, BrowserWindow} = require('electron')
    const path = require('path')
    const url = require('url')
    
    // 保持一个对于 window 对象的全局引用，如果你不这样做，
    // 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
    let win
    
    function createWindow () {
      // 创建浏览器窗口。
      win = new BrowserWindow({width: 800, height: 600})
    
      // 加载应用的 index.html。
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
    
      // 打开开发者工具。
      win.webContents.openDevTools()
    
      // 当 window 被关闭，这个事件会被触发。
      win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
      })
    }
    
    // Electron 会在初始化后并准备
    // 创建浏览器窗口时，调用这个函数。
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('ready', createWindow)
    
    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
      // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
      // 否则绝大部分应用及其菜单栏会保持激活。
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    
    app.on('activate', () => {
      // 在这文件，你可以续写应用剩下主进程代码。
      // 也可以拆分成几个文件，然后用 require 导入。
      if (win === null) {
        createWindow()
      }
    })
    
    // 在这文件，你可以续写应用剩下主进程代码。
    // 也可以拆分成几个文件，然后用 require 导入。
    ```

- 最后，你想展示的 index.html：
    ```
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Hello World!</title>
      </head>
      <body>
        <h1>Hello World!</h1>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
      </body>
    </html>
    ```
- 运行应用程序
    - window
    
    ```
    electron .
    ```
#### 二、electron通过nodejs native addon调用第三方dll
在node.js官方文档中，有提到node.js调用第三方DLL，Electron完全基于node.js框架，所以第一步，我们先去实现node.js的编译。

- 首先，创建一个简单的C++动态库，这里不再赘述，直接下载的DEMO[https://github.com/Tukezuan/ElectronDemo.git](http://note.youdao.com/)，下载以后结构：
    ```
    --- C++/
        |- binding.gyp
        |- EllaBookProxy.cc
        |- EllaBookProxy.dll
        |- EllabookProxy.h
        |- EllaBookProxy.js
        |- EllaBookProxy.lib
        |- package.json
    ```
    - binding.gyp
    
    ```
    {
      "targets": [
        {
         "target_name": "EllaBookProxy",
          "sources":[ "EllaBookProxy.cc" ],
          "libraries": [],
           "conditions": [
            [
              "OS=='win'",
              {
                "link_settings": {
                  "libraries": [
                    "-l../EllaBookProxy.lib"
                   ]
                }
              }
            ]
          ]
        }
      ]
    }
    ```
    - packager.json
    
    ```
    {
      "name": "EllaBookProxy",
      "version": "1.0.0",
      "description": "",
      "main": "EllaBookProxy.js",
      "dependencies": {
        "bindings": "^1.2.1"
      },
      "devDependencies": {},
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "install": "node-gyp rebuild"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "gypfile": true
    }

    ```

    - 创建一个cc文件，然后将需要集成的C++接口用V8的引擎进行编译集成，方便Node.JS调用。
        - EllaBookProxy.cc
        
        ```
        #include <node.h>
        #include <v8.h>
        #include "EllaBookProxy.h"
        
        using namespace v8;
        #pragma comment(lib, "EllaBookProxy.lib")
        
        
        //获取可移动磁盘列表
        void GetRemoveableDisk(const v8::FunctionCallbackInfo<Value>& args) {
          Isolate* isolate = Isolate::GetCurrent();
          HandleScope scope(isolate);
          
          std::string Str(getRemoveableDisk());
          Local<String> value = String::NewFromUtf8(isolate, Str.c_str());
          args.GetReturnValue().Set(value);
        }
        
        
        
        void Init(Handle<Object> exports) {
          Isolate* isolate = Isolate::GetCurrent();
        
          //获取磁盘列表
          exports->Set(String::NewFromUtf8(isolate, "GetRemoveableDisk"),
              FunctionTemplate::New(isolate, GetRemoveableDisk)->GetFunction());
        }
        
        NODE_MODULE(EllaAuth, Init)
        ```
        - EllaBookProxy.js
        
        ```
        var ellaDisk = require("./build/Release/EllaBookProxy");
        var fs = require("fs");
        
        //获取移动磁盘列表
        exports.GetRemoveableDisk = function () {
            var disk = ellaDisk.GetRemoveableDisk();
        	console.log(disk);
            return disk;
        }

        ```
        - 编译
        
        ```
        node-gyp congfigure build //需要安装python
        //编译完成就完成了
        
        ```
    - 这个时候node.js已经可以调用这个C++库了，但是Electron调用还是会报错，这里需要对Electron单独编译，使用以下命令：

    ```
    node-gyp rebuild –target=1.6.6 –arch=win32 –dist-url=https://atom.io/download/atom-shell
    ```
     - –target=1.6.6可以指定Electron版本
     
     这里就OK了
    
#### 三、打包Electron应用程序
- 需要修改package.json，如下：
    ```
    {
      "name": "demo",
      "version": "1.0.3r4",
      "description": "测试软件",
      "main": "app/main.js",
      "author": "XX公司",
      "license": "ISC",
      "devDependencies": {
        "electron-packager": "^8.6.0",
        "electron": "^1.6.6",
        "gulp": "^3.9.1"
      },
      "scripts": {
        "test": "start",
        "start": "electron .",
        "packager": "electron-packager ./app EllaManager --all --out ./OutApp --version 1.6.6 --overwrite --ignore=node_modules --icon=./app/img/icon.ico"
      }
    }
    
    ```

- 采用packager进行打包

    ```
    npm install packager -g 
    ```
- 打包命令：
    
    ```
    npm run-script packager
    ```
- 打包结束以后，目录如下：

![image](C:\Users\TKZ\Desktop\1.png)

- 加密源码，需要安装个asar插件：

```
npm install -g asar
```
安装以后，使用以下命令进行加密：

```
asar pack ./app app.asar
```

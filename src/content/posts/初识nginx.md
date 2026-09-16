---
title: 初识 Nginx
date: 2026-09-17
description: Nginx的简单介绍和配置。
category: 技术
---
## 介绍
Nginx 官方解释：一款高性能的 Web 服务器和反向代理服务器。
主要用途有：
1. web服务器：
直接把网页、图片等文件返回给浏览器。
比如用户访问 <https://example.com/logo.png>，图片就由Nginx返回。
2. 反向代理：
请求先来到Nginx，然后Nginx再把请求转发给各种后端服务。
```
用户
↓
Nginx 
↓ 
Java 服务
```
3. 负载均衡
比如一个后端服务访问量太大，需要部署多个后台服务，这时候Nginx可以做负载均衡。

## 安装
以linux系统为例，安装Nginx:
```bash
sudo apt update
sudo apt install nginx
# 安装完成后，查看版本
nginx -v
# 启动nginx
sudo systemctl start nginx
# 查看运行状态
sudo systemctl status nginx
# 停止
sudo systemctl stop nginx
# 重新加载
sudo systemctl reload nginx
# 重启
sudo systemctl restart nginx
```

Nginx默认监听80端口，启动后，打开浏览器访问：http://localhost 正常情况下可以看到默认欢迎页面。

## 配置文件
配置文件结构
```
/etc/nginx/
│
├── nginx.conf
│
├── conf.d/
│   └── xxx.conf
│
├── sites-available/
│   └── default
│
└── sites-enabled/
    └── default -> /etc/nginx/sites-available/default
```
### nginx.conf
`/etc/nginx/`通常存放配置文件。
最重要的是：
`/etc/nginx/nginx.conf`
一个简化的nginx.conf文件：
```
# Nginx 启动多少个 worker 进程,auto 表示根据 CPU 核心数自动决定
worker_processes auto;


# 事件模块
# 主要配置连接相关参数
events {

    # 每个 worker 进程最多可以处理的连接数
    worker_connections 1024;
}


# HTTP 模块
# 网站、反向代理等配置基本都写在这里
http {

    # 定义返回给浏览器的文件类型
    include /etc/nginx/mime.types;

    # 默认文件类型
    default_type application/octet-stream;

    # 访问日志
    access_log /var/log/nginx/access.log;

    # 开启高效文件传输
    sendfile on;


    # 一个 server 可以理解成一个网站
    server {

        # 监听 80 端口
        listen 80;

        # 网站域名
        server_name localhost;


        # 匹配 /
        # 例如访问 http://localhost/
        location / {

            # 网站文件存放目录
            root /var/www/html;

            # 默认首页
            index index.html;
        }
    }
}
```
比如
```
server {
    listen 80;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```
意思就是：有人访问我的 80 端口，并且访问 /，那就去 /var/www/html 目录里找网页，默认先找 index.html

一般来说，修改配置后，先检查配置：
`nginx -t`
没有问题后再重新加载：
`nginx -s reload`
### sites-enabled/default
通常有如下配置：
```
server {

    # 监听 IPv4 80 端口，作为默认站点
    listen 80 default_server;

    # 监听 IPv6 80 端口
    listen [::]:80 default_server;

    # 网站根目录
    root /var/www/html;

    # 默认首页
    index index.html index.htm;

    # 默认域名匹配
    server_name _;

    # 匹配所有请求
    location / {

        # 文件或目录不存在就返回 404
        try_files $uri $uri/ =404;
    }
}
```
简单理解：
```
监听 80 端口
    ↓
去 /var/www/html 找文件
    ↓
默认找 index.html
    ↓
找不到就返回 404
```
## 使用案例
最近把我的博客从github pages迁移到购买的服务器上，就是用Nginx展示了博客。
已知我的博客是通过astro构建，构建后的网页在dist目录下。
我的Nginx配置：
`/etc/nginx/sites-enabled# vim default`
```
server {

    # 监听 IPv4 的 80 端口，作为默认站点
    listen 80 default_server;

    # 监听 IPv6 的 80 端口
    listen [::]:80 default_server;

    # 网站静态文件所在目录
    root /root/s0meb0dy3.github.io/dist;

    # 默认首页文件，按顺序查找
    index index.html index.htm index.nginx-debian.html;
}
```
然后重载 Nginx：`sudo systemctl reload nginx`，在浏览器输入云服务器 IP 即可访问。
## 常见问题
Nginx 的 worker 进程通常会以 www-data 用户身份去读取文件。
如果目录没有权限，只有`root`能进去而`www-data`进不去，则Nginx可能报错： `403 forbidden`。
我的博客仓库放在`/root`下，默认`700`权限，正属这种情况，执行：
`sudo chmod o+x /root /root/s0meb0dy3.github.io`
`o+x` 给"其他用户"加上进入目录的权限，`www-data` 能穿过目录读到 `dist` 里的文件，问题解决。

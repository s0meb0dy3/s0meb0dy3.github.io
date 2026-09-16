# 博客更新流程

站点有两处：GitHub Pages（push 自动部署）+ 自己的服务器（手动 pull 构建）。

## 本地写文章

1. 在 `src/content/posts/` 新建 Markdown 文件（文件名即 URL）：

   ```markdown
   ---
   title: 标题
   date: 2026-09-15
   description: 摘要。
   category: 随想        # 观影 / 随想 / 投资 / 技术，也可新建
   ---

   正文……
   ```

2. 本地预览：`npm run dev`，打开 http://localhost:4321
3. 提交推送：

   ```sh
   git add -A && git commit -m "new post: 标题" && git push origin main
   ```

推送后 GitHub Pages 自动构建发布（Actions 跑 `npm test` + 部署，约 1 分钟），无需其他操作。

## 服务器更新（nginx 那份）

ssh 到服务器后：

```sh
cd ~/s0meb0dy3.github.io
git pull
npm run build
```

完成。nginx 直接指向项目内的 `dist/`，构建完即刻生效，无需 reload nginx。

可存成 `~/update-blog.sh` 一键执行（首次需 `chmod +x ~/update-blog.sh`）：

```sh
#!/bin/sh
set -e
cd ~/s0meb0dy3.github.io
git pull
npm run build
echo "博客已更新 $(date)"
```

## 地址

- GitHub Pages：https://s0meb0dy3.github.io/
- 服务器：http://8.163.15.243/

# mongodb 实例
运行环境（其它没试过）
```bash
$ node -v
v20.10.0

$ npm -v
10.2.3
```

# 配置文件
1. 复制config-template.yaml粘贴，重命名成config.yaml
2. 修改config.yaml里面的数据库连接信息

# 运行
```bash
# 安装依赖模块 只用执行一次
npm i

# 3选1 

# 1. 不编译，直接运行src/index.ts
npm run dev
# 2. only build, output js file to dist folder
npm rum build
# 3. build and run, output js file to dist folder, then node dist/index.js
npm run start

```
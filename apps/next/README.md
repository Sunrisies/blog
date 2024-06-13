用于说明git commit的类别，只允许使用下面的标识。

feat：新功能（feature）。

fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
docs：文档（documentation）。

style：格式（不影响代码运行的变动）。

refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

perf：优化相关，比如提升性能、体验。

test：增加测试。

chore：构建过程或辅助工具的变动。

revert：回滚到上一个版本。

merge：代码合并。

sync：同步主线或分支的Bug。

docker build .
    "preDockerBuildMac": "docker rmi next || docker buildx build --platform linux/amd64 -t next:1 .",



    发布流程： 
        `必须是使用yarn install 安装依赖，不能使用pnpm install 要不然在打包的时候会报错，开发的时候可以使用pnpm install 安装依赖` 
       npm run build 如果上传到七牛云报错，手动上传
       npm run Push  如果sh文件没有执行，就手动执行


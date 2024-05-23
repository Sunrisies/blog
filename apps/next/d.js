const { exec, execSync } = require('child_process');
const path = require('path');
const async = require('async');
const config = require('./config.json')
const chalk = require('chalk');
const { spawn } = require('cross-spawn');
const open = `docker run -d --restart=always --name ${config.dockerName} -p 9000:3000 ${config.dockerName}:${config.dockerTag}`


// 定义执行前置Docker构建步骤的函数
// function preDockerBuild() {
//   const command = "docker rmi next:1 || docker build -t next:1 .";
//   executeCommand(command, postDockerBuild);
// }

// 定义执行Docker构建和运行的函数
// function DockerBuild() {
//   const command = "docker run -d --restart=always --name next -p 9000:3000 next:1 || exit";
//   executeCommand(command,() => {});
// }

// 定义执行后置Docker构建步骤的函数
// function postDockerBuild() {
//   // 首先，启动Node.js应用
//   const nodeIndexCommand = "node index.js";
//   executeCommand(nodeIndexCommand, () => {
//     // 然后，复制Docker容器内的文件到本地目录
//     const dockerCpCommand = `docker cp next:/app/.next/static ${path.resolve(__dirname, 'qiniu/_next')}`;
//     executeCommand(dockerCpCommand, () => {
//       // 最后，上传文件到七牛云存储（或其他服务）
//       const uploadCommand = "node upload.js";
//       executeCommand(uploadCommand, () => {
//         console.log('所有Docker构建和部署步骤完成');
//       });
//     });
//   });s
// }
const build = `docker build -t ${config.dockerImage}:${config.dockerTag} .`
// 开始执行前置Docker构建步骤
// preDockerBuild();
// 先检测当前容器是否运行
// exec('docker ps -a | grep next:1', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行命令出错: ${error}`);
//     return;
//   }
//   // 如果该容器存在，则先停止该容器
//   if (stdout.trim() !== '') {
//     console.log('当前容器正在运行，先停止该容器');
//     const command = "docker stop next && docker rm next";
//     executeCommand(command, () => {});
//   } else {
//     // 如果没有运行，就查看是否有容器存在
//     exec('docker ps -a | grep next', (error, stdout, stderr) => {
//       if (error) {
//         console.error(`执行命令出错: ${error}`);
//         return;
//       }
//       // 如果有容器存在，则先删除该容器
//       if (stdout.trim() !== '') {
//         console.log('当前存在容器，先删除该容器');
//         const command = "docker rm next";
//         executeCommand(command, () =>
//       {});
//       } else {
//         console.log('当前容器不存在，开始执行Docker构建和运行步骤');
//         // 如果没有容器存在，则直接执行Docker构建和运行步骤
//         // DockerBuild();
//       }
//     });
//     console.log('当前容器未运行，开始执行Docker构建和运行步骤');
//     // 如果该容器不存在，则直接执行Docker构建和运行步骤
//     DockerBuild();
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
//   // if (stdout.trim() === '') {
//   //   // 当前容器未运行，执行Docker构建和运行步骤
//   //   DockerBuild();
//   // } else {
//   //   // 当前容器已运行，执行后置Docker构建步骤
//   //   postDockerBuild();
//   // }
// }); 
const spawnApi = (open, Message) => {
  return new Promise((resolve, reject) => {
    const result = open.split(' ')
    result.shift()
    const order = open.split(' ')[0]
    try {
      const pm = spawn(order, [...result], { stdio: "ignore" });
      pm.on("close", (code) => {
        if (code === 0) {
          console.log(Message);
          resolve(0);
        } else {
          console.log(chalk.red(`当前命令执行失败 ${open}`));
        }
      });
    } catch (err) {
      console.log("Installing devDependencies failed: ", err);
      reject(err);
    }
  });

}

const spawnWithPipe = async (open, Message) => {
  return new Promise((resolve, reject) => {
    const result = open.split(' ')
    result.shift()
    const order = open.split(' ')[0]
    const dockerPs = spawn(order, [...result], { stdio: 'ignore', shell: true });
    dockerPs.on("close", (code) => {
      if (code === 0) {
        console.log(chalk.green(Message));
        resolve(1)
      } else {
        console.log(chalk.red('当前命令执行失败', open));
        resolve(0)
      }
    });
    dockerPs.on("error", (err) => {
      console.log("Installing devDependencies failed: ", err);
      resolve(0)

    });
  });
}
let isDockerImage = `docker images | grep ${config.dockerImage}`
let rmiDockerImage = `docker rmi ${config.dockerImage}:${config.dockerTag}`
let stopDockerContainer = `docker stop ${config.dockerName}`
let isDockerContainer = `docker ps | grep ${config.dockerName}`
let isDockerContainer1 = `docker ps -a | grep ${config.dockerName}`
let rmDockerContainer = `docker rm ${config.dockerName}`
const init = async () => {
  try {
    async.waterfall([
      function (callback) {
        spawnWithPipe(isDockerImage, '当前镜像存在').then((data) => {
          callback(null, data)
        })
      },
      function (res, callback) {
        if (res) { 
          spawnWithPipe(isDockerContainer, '当前容器正在运行...').then((data) => {
            callback(null, data ? '容器运行中' : '容器不运行')
          })
        } else { 
          spawnWithPipe(build, '构建镜像成功').then((data) => {
            callback(null, data?'构建成功':'构建失败')
          })
        }
      },
      function (res, callback) {
        console.log(res, 'res')
        if (res === '容器不运行') {
          spawnWithPipe(rmiDockerImage, '删除镜像成功').then((data) => {
            console.log(data, 'data')
            callback(null, data? '删除镜像成功' : '删除镜像失败')
          })
        }
        if (res === '容器运行中') {
          spawnWithPipe(stopDockerContainer, '停止容器成功').then((data) => {
            callback(null, data ? '停止容器成功' : '停止容器失败')
          })
        }
        return
        if (res) { 
          
        } else { 
          spawnWithPipe(build, '构建镜像成功').then((data) => {
            callback(null, data)
          })
        }
      },
      function (res, callback) {
        console.log(res, 'result1')
        if (res === '删除镜像成功' || res === '删除镜像失败') {
          spawnWithPipe(build, '构建镜像成功').then((data) => {
            callback(null, data?'构建成功':'构建失败')
          })
        }
        if (res === '停止容器成功' || res === '停止容器失败') {
          spawnWithPipe(rmiDockerImage, '删除镜像成功').then((data) => {
            console.log(data, 'data')
            callback(null, data? '删除镜像成功' : '删除镜像失败')
          })
        }
        return

        if (result1) {
          spawnWithPipe(rmiDockerImage, '删除镜像成功').then((data) => {
            console.log(data, 'data')
            callback(null, data)
          })
        } else {
          spawnWithPipe(build, '构建镜像成功').then((data) => {
            callback(null, 0)
          })
        }
      },
      function (res, callback) {
        if (res === '构建成功') {
          spawnWithPipe(isDockerContainer1, '当前容器存在').then((data) => {
            callback(null, data ? '容器存在' : '容器不存在')
          })
        }
        if (res === '删除镜像成功' || res === '删除镜像失败') {
          spawnWithPipe(build, '构建镜像成功').then((data) => {
            callback(null, data?'构建成功':'构建失败')
          })

        }
        return
        if (res) {
          spawnWithPipe(build, '构建镜像成功').then((data) => {
            callback(null, data)
          })
        } else {
          callback(null, 0);
        }
      },
      function (res, callback) {
        console.log(res, 'result3')
        if (res === '容器不存在') {
          spawnWithPipe(open, '启动成功').then((data) => {
            callback(null, data? '启动成功' : '启动失败')
          })
        } 
        if (res === '容器存在') {
          
          spawnWithPipe(rmDockerContainer, '删除容器成功').then((data) => {
            callback(null, data? '删除容器成功' : '删除容器失败')
          })
        }
        if (res === '构建成功') {
          spawnWithPipe(isDockerContainer1, '当前容器存在').then((data) => {
            callback(null, data ? '容器存在' : '容器不存在')
          })
        }
        return
        if (result3) {
          spawnWithPipe(stopDockerContainer, '停止容器成功').then((data) => {
            callback(null, data)
          })
        } else {
          spawnWithPipe('docker ps -a | grep next:1', '当前容器存在').then((data) => {
            callback(null, data)
          })
        }
      },
      function (res, callback) {
        if (res === '启动成功') { 
          console.log('全部操作执行完成:', res)
        }
        if (res === '删除容器成功' || res === '删除容器失败') {
          spawnWithPipe(open, '启动成功').then((data) => {
            callback(null, data? '启动成功' : '启动失败')
          })
        }
        if (res === '容器不存在') {
          spawnWithPipe(open, '启动成功').then((data) => {
            callback(null, data? '启动成功' : '启动失败')
          })
        } 
        if (res === '容器存在') {
          
          spawnWithPipe(rmDockerContainer, '删除容器成功').then((data) => {
            callback(null, data? '删除容器成功' : '删除容器失败')
          })
        }
        return
        if (result3) {
          spawnWithPipe(rmDockerContainer, '删除容器成功').then((data) => {
            callback(null, data)
          })
        } else {
          callback('第一个操作失败');
        }
        if (result4) {
          spawnWithPipe('docker rm next', '删除容器成功').then((data) => {
            callback(null, data)
          })
        } else {
          callback('第二个操作失败');
        }
      },
      function (res, callback) {
        if (res === '启动成功') { 
          console.log('全部操作执行完成:', res)
        }
        if (res === '启动失败') {
          console.log('全部操作执行完成:', res)
        }
        if (res === '启动成功') { 
          console.log('全部操作执行完成:', res)
        }
        if (res === '删除容器成功' || res === '删除容器失败') {
          spawnWithPipe(open, '启动成功').then((data) => {
            callback(null, data? '启动成功' : '启动失败')
          })
        }
        return
        console.log(result5, 'result3')
        if (result5) {
          spawnWithPipe(open, '启动成功').then((data) => {
            callback(null, data)
          })
        } else {
          callback('第三个操作失败');
        }
      }
    ], function (err, result) {
      console.log(err,'err')
      if (err) {
        console.error('出现错误:', err);
      } else {
        console.log('全部操作执行完成:', result);
      }
    });
  } catch (err) {
    console.error('出现错误:', err);
  }
}
init()



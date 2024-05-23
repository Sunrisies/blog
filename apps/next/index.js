const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');


const qiniuDir = path.join(__dirname, 'qiniu','_next','static');
// 先创建目录
(async () => {
  try {
    fs.rmdirSync(qiniuDir, { recursive: true });
    console.log('qiniu文件夹删除成功');
  } catch (err) {
    fs.mkdirSync(qiniuDir);
    console.log('qiniu文件夹创建成功');
  }
})()

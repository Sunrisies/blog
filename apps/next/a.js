const crossSpawn = require('cross-spawn');

// const command = 'docker';
// const args = ['ps', '-a', '|', 'grep', 'next:2'];

// const child = crossSpawn(command, args, { stdio: 'inherit', shell: true });

// child.on('close', (code) => {
//   console.log(code)
//   console.log(`子进程退出，退出码 ${code}`);
// });
const d = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  })
}

const async = require('async');
const init = async () => {
  async.waterfall([
    function (callback) {
      d().then(res => {
        console.log('qqq')
        callback(null, 'one', 'two');
      })
    
    },
    function (arg1, arg2, callback) {
      console.log(arg1, arg2)
      callback(null, 'three');
    },
    function (arg1, callback) {
      console.log(11)
      callback(null, 'done');
    }
  ], function (err, result) {
    console.log(err, result)
  });
}
init()


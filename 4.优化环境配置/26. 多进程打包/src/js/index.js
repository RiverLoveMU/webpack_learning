import "../css/index.css";
import { mul } from "./test";

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
console.log(mul(1, 3));

/*
  1.eslint不认识window等全局变量
  解决：需要修改package.json 中eslintconfig
  "env": {
      "browser": true
    }
  2. sw代码必须运行在服务器上  
   ==》 node.js
   ==》 npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/

//注册serviceworker
//处理兼容性问题

console.log(navigator);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("sw注册成功");
      })
      .catch(() => {
        console.log("sw注册失败");
      });
  });
}

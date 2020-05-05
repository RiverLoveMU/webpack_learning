/**
 * index.js: webpack入口起点文具
 * 1. 运行指令：
 *  开发环境：webpack ./src/index.js -o ./build/build.js --mode=development
 *  生产环境：webpack ./src/index.js -o ./build/build.js --mode=production
 * 2. 结论
 * 1. webpack能处理js,json, 不能处理css/img等其他资源
 * 2. 生产环境和开发环境将es6模块化编译成浏览器能识别的模块化
 * 3. 生产环境比开发环境多一个压缩js代码
 */
import data from "./data.json";
// import "./index.css";

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
console.log(data);

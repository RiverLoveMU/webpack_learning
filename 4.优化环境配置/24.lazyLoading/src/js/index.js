console.log("index.js文件被加载了");

document.getElementById("btn").onclick = function () {
  //懒加载：当文件需要用时才加载
  // Prefetch 预加载：会在使用之前，提前加载js文件 （兼容性较差）
  // 正常加载可以认为是并行加载（同一时间加载多个文件）Prefetch 预加载：等其它资源加载完毕，浏览器空闲了，再加载暂时不需要的资源
  import(/* webpackChunkName: 'test', webpackPrefetch: true*/ "./test").then(
    ({ mul }) => {
      console.log(mul(4, 5));
    }
  );
};

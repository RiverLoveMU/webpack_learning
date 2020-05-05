// import "@babel/polyfill";

const add = (x, y) => {
  return x + y;
};

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log("promise");
    resolve("123");
  }, 1000);
});

promise
  .then((val) => {
    console.log(val);
  })
  .catch((error) => {
    console.log(error);
  });

console.log(add(1, 3));

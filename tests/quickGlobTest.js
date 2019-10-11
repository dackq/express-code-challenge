const glob = require("glob");
const path = require("path");

let routers = [];

const routerFiles = glob.sync("./routes/*.js");
console.log(routerFiles);

glob.sync("./routes/*.js").forEach(file => {
	const router = require(path.resolve(file));
	routers.push(router);
});

console.log(routers);

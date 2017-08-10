var ellaDisk = require("./build/Release/EllaBookProxy");
var fs = require("fs");

//获取移动磁盘列表
exports.GetRemoveableDisk = function () {
    var disk = ellaDisk.GetRemoveableDisk();
	console.log(disk);
    return disk;
}

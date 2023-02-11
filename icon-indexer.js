// npx
// var finder = require('findit')(process.argv[2] || '.', {followSymlinks: true});
import * as finder from "findit";
import path from "path";
import fs from "fs";

finder(process.argv[2] || ".", { followSymlinks: true });

finder.on("directory", function (dir, stat, stop) {
  var base = path.basename(dir);
  if (base === ".git" || base === "node_modules") stop();
  // else console.log(dir + '/')
});

let icons = [];
//This listens for files found
finder.on("file", function (file) {
  const str = file.toString();
  icons.push(str);
  // if (str.includes('symbolic')) {
  // icons.push(str);
  // }
});

finder.on("end", function () {
  const json = JSON.stringify(icons);
  fs.writeFile("icons.json", json, function (err) {
    if (err) throw err;
    console.log("complete");
  });
});

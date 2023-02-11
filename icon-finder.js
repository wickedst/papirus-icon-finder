import { findBestMatch } from "string-similarity";
import { readFileSync, readFile } from "fs";
import isSvg from "is-svg";

let rawdata = readFileSync("icons.json");
let icons = JSON.parse(rawdata);

function readModuleFile(path, callback) {
  try {
    var filename = fs.resolve(path);
    readFile(filename, "utf8", callback);
  } catch (e) {
    callback(e);
  }
}

function findIcon(icon) {
  var matches = findBestMatch(`${icon}`, icons);
  return matches;
}

const str = process.argv[2];

if (str) {
  const results = findIcon(str);
  const bestMatch = results.bestMatch.target;
  // console.log(bestMatch);

  // check if the file is a real svg
  readModuleFile(`./${bestMatch}`, function (err, result) {
    if (isSvg(result)) {
      console.log(true);
      console.log(bestMatch); // svg path
      return bestMatch;
    } else {
      console.log(false);
      var hopefullySvg = findIcon(result);
      console.log(hopefullySvg.bestMatch.target); // svg path
      return hopefullySvg.bestMatch.target;
    }
  });
} else {
  console.log("Please enter a search term");
}

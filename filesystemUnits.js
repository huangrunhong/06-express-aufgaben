const fs = require("fs");
const path = require("path");
const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (error, data) => (error ? reject(error) : resolve(data)))
  );

const writeJsonFile = (path, jsonObj) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(jsonObj, null, 2), (err) =>
      err ? reject(err) : resolve(jsonObj)
    );
  });

module.exports = {
  readFile,
  writeJsonFile,
};

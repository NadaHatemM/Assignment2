const path = require("path");
//Question 1
function showPath() {
console.log({
    File: __filename,
    Dir: __dirname,
});
}
showPath();

console.log("-----------------------------");

//Question 2
function getFileName(filePath) {
return path.basename(filePath);
}
console.log(getFileName("/home/user/dir/report.pdf"));

console.log("-----------------------------");

//Question 3
function buildPath(obj) {
return path.format(obj);
}
console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));

console.log("-----------------------------");

//Question 4
function getFileExtension(filePath) {
return path.extname(filePath);
}
console.log(getFileExtension("/docs/readme.md"));

console.log("-----------------------------");

//Question 5
function getNameAndExtension(filePath) {
const res = path.parse(filePath);
return { Name: res.name, Ext: res.ext };
}
console.log(getNameAndExtension("/home/app/main.js"));

console.log("-----------------------------");

//Question 6
function pathAbsolute(filePath) {
return path.isAbsolute(filePath);
}
console.log(pathAbsolute("/home/user/file.txt"));
console.log(pathAbsolute("file.txt"));

console.log("-----------------------------");

//Question 7
function joinPaths(...paths) {
return path.join(...paths);
}
console.log(joinPaths("src", "components", "App.js"));

console.log("-----------------------------");

//Question 8
function resolvePath(filePath) {
return path.resolve(filePath);
}
console.log(resolvePath("./index.js"));

console.log("-----------------------------");

//Question 9
function joinTwoPaths(path1, path2) {
return path.join(path1, path2);
}
console.log(joinTwoPaths("/folder1", "folder2/file.txt"));

console.log("-----------------------------");

const fs = require("fs");

//Question 10
function deleteFile(filePath) {
fs.unlink(filePath, (err) => {
    if (err) {
    console.log(err);

    return;
    }
    console.log(`${path.basename(filePath)} is deleted.`);
});
}
 deleteFile('./file.txt');  // just added one so u can test

console.log("-----------------------------");

//Question 11
function createFolder(folderPath) {
    fs.mkdirSync(folderPath);
    console.log("sucess");
}
createFolder('./test');

console.log("-----------------------------");

//Question 12
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("start", () => {
console.log("Welcome event triggered!");
});

emitter.emit("start");

console.log("-----------------------------");


//Question 13
emitter.on("login", (username) => {
console.log(`User logged in: ${username}`);
});

emitter.emit("login", "Ahmed");

console.log("-----------------------------");

//ضQuestion 14
function readFile(filePath) {
const content = fs.readFileSync(filePath, "utf8");
console.log(content);
}

readFile("./notes.txt");

console.log("-----------------------------");

//Question 15
function writeFile(filePath, content) {
fs.writeFile(filePath, content, (err) => {
    if (err) {
    console.log(err);
    return;
    }

    console.log("File written successfully");
});
}

writeFile("./async.txt", "Async save");

console.log("-----------------------------");

//Question 16
function checkExists(filePath) {
return fs.existsSync(filePath);
}

console.log(checkExists("./notes.txt"));

console.log("-----------------------------");

//Question 17
const os = require("os");
function getSystemInfo() {
return {
    Platform: os.platform(),
    Arch: os.arch(),
};
}
console.log(getSystemInfo());

console.log("-----------------------------");

//Question 18
function readChunks(filePath) {
const stream = fs.createReadStream(filePath, { encoding: "utf8" });

stream.on("data", (chunk) => {
    console.log(chunk);
});
}
readChunks("./big.txt");

console.log("-----------------------------");

//Question 19
function copyFile(source, destination) {
const readStream = fs.createReadStream(source);
const writeStream = fs.createWriteStream(destination);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File copied using streams");
});
}
copyFile("./source.txt", "./dest.txt");

console.log("-----------------------------");

//Question 20
const zlib = require("zlib");
const { pipeline } = require("stream");

function compressFile(source, destination) {
pipeline(
    fs.createReadStream(source),
    zlib.createGzip(),
    fs.createWriteStream(destination),
    (err) => {
    if (err) {
        console.log(err);
        return;
    }
    
    console.log("File compressed successfully");
    },
);
}

compressFile("./data.txt", "./data.txt.gz");

console.log("-----------------------------");

let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

//console.log(inputArr);

// node main.js tree "directoryPath"
//node main.js organize "directoryPath"
// node main.js help

let command = inputArr[0];
let types = {
    media : ["mp4","mkv","mpv","mp3"],
    archives : ["zip","rar"],
    documents : ['docz','txt']
}
switch (command){
    case "tree":
        treefn(inputArr[1]);
        break;
    case "organize":
        organizefn(inputArr[1]);
            break;

    case "help":
        helpfn();
        break;

        default:
            console.log("Please 🙏🏻 input right commans");
            break;
}

function treefn(dirpath){
    console.log("tree command implemented for",dirpath);
}
function organizefn(dirpath){
    console.log("organize command implemented for",dirpath);
// 1. input -> directory path given
let destpath;
if(dirpath == undefined ){
    console.log("Kindly enter the path");
    return;
}


else{
let doesexsist = fs.existsSync(dirpath);
console.log(doesexsist);
if(doesexsist){
// create directory
destpath = path.join(dirpath,"organized_files");
if(fs.existsSync(destpath)==false){
  fs.mkdirSync(destpath);
}


}
else{
    console.log("kindly enter dir path");
    return;
}
}
organizehelper(dirpath,destpath);


// 2. create -> organized_files -> directory
//3. identify categories of all the files present in that input directory
// 4. copy/cut files to that directory inside of any of category folder

}
 


function organizehelper(src,dest){

let childnames = fs.readdirSync(src);
console.log(childnames);
for(let i = 0;i<childnames.length;i++){
    let childaddress = path.join(src,childnames[i]);
    let isfile = fs.lstatSync(childaddress).isFile();
    if(isfile){
        //console.log(childnames[i]);
        let category = getCategory(childnames[i]);
        console.log(childnames[i],"belongs to -->",category);
        
        sendfiles(childaddress,dest,category);
    }
}

}
function sendfiles(srcfile,dest,category){
    let categorypath = path.join(dest,category);
    if(fs.existsSync(categorypath)==false){
        fs.mkdirSync(categorypath);
    }
    let filename = path.basename(srcfile);
    let destfilepath = path.join(categorypath,filename);
    fs.copyFileSync(srcfile,destfilepath);
    fs.unlinkSync(srcfile);
    console.log(filename,"copied to",category);
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    //console.log(ext);
    for(let type in types){
        let ctarray = types[type];
        for (let i =0 ; i<ctarray.length;i++){
            if(ext==ctarray[i]){
                return type;
            }
        }
        
    }
    return "others";
}
function helpfn(){
    console.log(`
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help
    `);

}

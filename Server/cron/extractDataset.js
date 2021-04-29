const gunzip = require('gunzip-file');
const event = require('events');
const path = require('path');

let pathArr = ['title.basics.tsv.gz', 'title.ratings.tsv.gz', 'name.basics.tsv.gz'];
pathArr = pathArr.map(val => path.join(__dirname, '..', 'Hotdata', val));


const unzipFile = async (filePath) => {
    try{
        const extraction = new event.EventEmitter();
        gunzip(filePath, path.join(__dirname, '..', 'Hotdata', path.basename(filePath).replace(/\.[^/.]+$/, "")), (err) => {
            if(err){
                console.log(`Error extracting ${path.basename(filePath)}`);
                extraction.emit('error', e);
            }
            console.log(`${path.basename(filePath)} Extracted`);
            extraction.emit('done');
        });

        return new Promise((resolve, reject) => {
            extraction.on('done', () => {
                resolve();
            });
            extraction.on('error', e => {
               throw e;
            })
        })
    }
    catch(e){
        throw e;
    }
};

const unzipDataset = (pathArr) => {
    const promises = [];
    pathArr.forEach(val => {
        promises.push(new Promise((resolve, reject) => {
            resolve(unzipFile(val));
        }));
    });

    Promise.all(promises).then(result => {
        console.log(`All files Extracted`);
    })
    .catch(e => {
        console.log(e);
    })
}

//unzip Fresh Dataset
unzipDataset(pathArr);
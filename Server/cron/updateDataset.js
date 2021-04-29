const https = require('https');
const fs = require('fs');
const ospath = require('path');
const events = require('events');

const options = {
    hostname: "datasets.imdbws.com",
    port: 443,
    path: '/', //default path
    method: 'GET',
};

const pathMap = {
    titleBasics: 'title.basics.tsv.gz',
    titleRatings: 'title.ratings.tsv.gz',
    personBasics: 'name.basics.tsv.gz',
};

const fetchData = async (options, path) => {
    options.path = '/'+path;
    const savePath = ospath.join(__dirname, '..', 'Hotdata', path);
    fs.openSync(savePath, 'w');
    const writePath = fs.createWriteStream(savePath);
    const fileDownload = new events.EventEmitter();
    const req = https.request(options,res => {
        console.log(`Endpoint hit : ${path}`);
        res.pipe(writePath);
        writePath.on('finish', () => {
            writePath.close();
            console.log(`Gzip ${path} Successfully Downloaded`)
            fileDownload.emit('done');
        });
        writePath.on('error', (e) => {
            fileDownload.emit('error', e);
        })
;
    });

    req.on('error', e => {
        console.log(e);
        req.end();
        throw e;
    })

    req.end();

    return new Promise((resolve, reject) => {
        fileDownload.once('done', () => {
            resolve();
        });
        fileDownload.on('error', e => {
            reject();
        })
    })
}

const fetchDataset = () => {
    const p_titleBasics = new Promise((resolve, reject) => {
        resolve(fetchData(options, pathMap.titleBasics));
    });
    const p_titleRatings = new Promise((resolve, reject) => {
        resolve(fetchData(options, pathMap.titleRatings));
    });
    const p_personBasics = new Promise((resolve, reject) => {
        resolve(fetchData(options, pathMap.personBasics));
    });

    Promise.all([p_titleBasics, p_titleRatings, p_personBasics])
        .then(val => {
            const savePath = ospath.join(__dirname, '..', 'Hotdata', 'metafile.txt');
            const now = new Date();
            const lastUpdated = `Last Updated : ${now.toUTCString()}`;
            fs.writeFile(savePath, lastUpdated, err => {
                if (err){
                    console.log(err);
                }
            });

            console.log(`Dataset Updated Successfully`);
        })
        .catch(e => {
            console.log(`Dataset Update Failed`);
            console.log(e);

        });
};

//download Dataset in Gzip format
fetchDataset();

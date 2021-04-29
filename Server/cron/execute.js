const spawn = require('child_process').spawn;
const event  = require('events');

const unzip = async () => {
    //const proc = new event.EventEmitter();
    const child = spawn('node', ['cron/extractDataset']);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    return new Promise((resolve, reject) => {
        child.on('exit', (code, signal) => {
            resolve(code);
        })
    })

}
const download = async () => {
    //const proc = new event.EventEmitter();
    const child = spawn('node', ['cron/updateDataset']);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    return new Promise((resolve, reject) => {
        child.on('exit', (code, signal) => {
            resolve(code);
        })
    })

}

const execute = () => {
    Promise.resolve(download()).then(code => {
        if(code == 0){
            Promise.resolve(unzip()).then(code => {
                console.log(`Data Refreshed`);
            })
            .catch(e => {
                console.log(e);
            })
        }
        else{
            console.log(`Problems encountered while refreshing dataset`);
        }
    }).catch(e => {
        console.log(e);
    })
}

module.exports = execute;
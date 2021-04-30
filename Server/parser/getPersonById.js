const parse = require('csv').parse;
const fs = require('fs');

const getPersonById = async (tconst) => {
    const parser = fs.createReadStream('./Hotdata/name.basics.tsv')
    .pipe(parse({
        delimiter: '\t',
    }));

    for await (const record of parser){
        if (record[0] == tconst ) {
            return record;
        }
    }
}

module.exports = getPersonById;
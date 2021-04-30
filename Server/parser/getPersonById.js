const parse = require('csv').parse;
const fs = require('fs');

const getPersonById = async (tconst) => {
    const parser = fs.createReadStream('./Hotdata/name.basics.tsv')
    .pipe(parse({
        delimiter: '\t',
        skip_lines_with_error: true,
    }));

    for await (const record of parser){
        if (record[0] == tconst ) {
            return record;
        }
    }
    
    //record not found
    return null;
}

module.exports = getPersonById;
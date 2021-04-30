const parse = require('csv').parse;
const fs = require('fs');

const getMovieById = async (tconst) => {
    let num = tconst.replace('tt', '');
    num = parseInt(num);
    const jumpTo = Math.floor(num/100)*100;
    if(jumpTo == 'NaN'){
        return null;
    }
    console.log(`num: ${num}\njumpTo : ${jumpTo}`);
    const parser = fs.createReadStream('./Hotdata/title.basics.tsv')
    .pipe(parse({
        delimiter: '\t',
        skip_lines_with_error: true,
        from : jumpTo,
    }));

    for await (const record of parser){
        if (record[0] == tconst ) {
            return record;
        }
    }

    //record not found
    return null;
}

module.exports = getMovieById;
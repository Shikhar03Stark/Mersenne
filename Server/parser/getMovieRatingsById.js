const parse = require('csv').parse;
const fs = require('fs');

const getMovieRatingsById = async (tconst) => {
    const parser = fs.createReadStream('./Hotdata/title.ratings.tsv')
    .pipe(parse({
        delimiter: '\t',
    }));

    for await (const record of parser){
        if (record[0] == tconst ) {
            return record;
        }
    }
}

module.exports = getMovieRatingsById;
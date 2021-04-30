const parse = require('csv').parse;
const fs = require('fs');

const getMovieRatingsById = async (tconst) => {
    const parser = fs.createReadStream('./Hotdata/title.ratings.tsv')
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

module.exports = getMovieRatingsById;
const parse = require('csv').parse;
const fs = require('fs');

const cacheMovies = async () => {
    let result = [];
    const parser = fs.createReadStream('./Hotdata/title.basics.tsv')
    .pipe(parse({
        delimiter: '\t',
        skip_lines_with_error: true,
        
    }));

    for await (const record of parser){
        result.push({
            id: record[0],
            genres: record[8],
            title: record[2],
            release: record[5],
        });
    }
    console.log(`Movies Cached`);

    return result;
}

module.exports = cacheMovies;
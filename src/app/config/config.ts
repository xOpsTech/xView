let dev = 'http://localhost:4200';
let stg = 'http://localhost:4200';
let prod = 'http://xview.xops.it';

let host = prod;

export const config = {
    XOPSHOST: host,
    XOPSAPI: `${host}/api`,

    devUrl: host,
    elasticsearchurl: 'http://elastic.xops.it'

};

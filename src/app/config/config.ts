let dev = 'http://localhost:4200';
let stg = 'http://localhost:4200';
let prod = 'http://scholastic.xops.it';

let host = prod;

export const config = {
    XOPSHOST: host,
    XOPSAPI: `${host}/api`
};

let dev = 'http://localhost';
let stg = 'http://localhost';
let prod = 'http://localhost';

let host = stg;

export const config = {
    XOPSHOST  : host,
    XOPSAPI   : `${host}:4200/api`
};

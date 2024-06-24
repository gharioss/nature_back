const { con } = require('../utils/db.js');
const { bcrypt, compare } = require('bcrypt');

const getAllHeight = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM height', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getAllWidth = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM width', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getAllDepth = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM depth', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getAllColor = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM color', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getAllAvailability = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM availability', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getAllOrientation = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM orientation', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getAllType = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM type_painting', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { getAllHeight, getAllWidth, getAllDepth, getAllColor, getAllAvailability, getAllOrientation, getAllType };


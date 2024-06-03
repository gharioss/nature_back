const { con } = require('../utils/db.js');

const getAllPaintings = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM painting', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getPaintingById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM painting WHERE id_painting = ' + id, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { getAllPaintings, getPaintingById };
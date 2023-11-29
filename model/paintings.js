const { con } = require('../utils/db.js');

const getAllPaintings = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM painting', (err, rows, fields) => {
            if (err) {
                reject(err); // Reject the promise if there's an error
            } else {
                resolve(rows); // Resolve with the retrieved rows
            }
        });
    });
};

module.exports = { getAllPaintings };
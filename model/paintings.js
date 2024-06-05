const { con } = require('../utils/db.js');

const getAllPaintings = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT p.*, (SELECT i.image FROM image i WHERE i.id_painting = p.id_painting ORDER BY i.id_painting LIMIT 1) AS first_image FROM painting p;', (err, rows, fields) => {
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

const getPaintingFiltered = async (prices, color, sizes) => {
    let pricesClause = '';
    let colorClause = '';
    let sizesClause = '';

    if (prices !== undefined && prices.length > 0) {
        prices.forEach(element => {
            pricesClause += " price = " + element + " OR "
        });
    }

    if (color !== undefined && color.length > 0) {
        color.forEach(element => {
            colorClause += " color = " + element + " OR "
        });
    }

    if (sizes !== undefined && sizes.length > 0) {
        sizes.forEach(element => {
            sizesClause += " size = " + element + " OR "
        });
    }

    if (pricesClause.endsWith("OR ")) {
        pricesClause = pricesClause.slice(0, -3);
        console.log(pricesClause)
    }

    if (colorClause.endsWith("OR ")) {
        colorClause = colorClause.slice(0, -3);
        console.log(colorClause)
    }

    if (sizesClause.endsWith("OR ")) {
        sizesClause = sizesClause.slice(0, -3);
        console.log(sizesClause)
    }
  };

module.exports = { getAllPaintings, getPaintingById, getPaintingFiltered };
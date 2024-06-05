const { con } = require('../utils/db.js');

let sqlToGetPaintingsWithImages = "SELECT p.*, (SELECT i.image FROM image i WHERE i.id_painting = p.id_painting ORDER BY i.id_painting LIMIT 1) AS first_image FROM painting p"

const getAllPaintings = () => {
    return new Promise((resolve, reject) => {
        con.query(sqlToGetPaintingsWithImages + ';', (err, rows, fields) => {
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

    let initialQuery = sqlToGetPaintingsWithImages + ' WHERE';
    let query = sqlToGetPaintingsWithImages + ' WHERE';

    if (prices !== undefined && prices.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        prices.forEach(element => {
            pricesClause += ` price = '${element}' OR`;
        });

        if (pricesClause.endsWith("OR")) {
            pricesClause = pricesClause.slice(0, -2);
        }

        query += pricesClause;
    }

    if (color !== undefined && color.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        color.forEach(element => {
            colorClause += ` color = '${element}' OR`;
        });

        if (colorClause.endsWith("OR")) {
            colorClause = colorClause.slice(0, -2);
        }

        query += colorClause;
    }

    if (sizes !== undefined && sizes.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        sizes.forEach(element => {
            sizesClause += ` size = '${element}' OR`;
        });

        if (sizesClause.endsWith("OR")) {
            sizesClause = sizesClause.slice(0, -2);
        }

        query += sizesClause;
    }
    query += ';'


    if(pricesClause == '' && colorClause == '' && sizesClause == '') {
        query = query.slice(0, -6);
    }

    return new Promise((resolve, reject) => {
        con.query(query, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
  };

module.exports = { getAllPaintings, getPaintingById, getPaintingFiltered };
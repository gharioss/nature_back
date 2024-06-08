const { con } = require('../utils/db.js');

let sqlToGetPaintingsWithImages = "SELECT p.*, h.height, w.width, d.depth, c.color, a.availability, o.orientation, tp.type_painting, (SELECT i.image FROM image i WHERE i.id_painting = p.id_painting ORDER BY i.id_painting LIMIT 1) AS first_image FROM painting p LEFT JOIN height h ON p.id_height = h.id_height LEFT JOIN width w ON p.id_width = w.id_width LEFT JOIN depth d ON p.id_depth = d.id_depth LEFT JOIN color c on p.id_color = c.id_color LEFT JOIN availability a ON p.id_availability = a.id_availability LEFT JOIN orientation o ON p.id_orientation = o.id_orientation LEFT JOIN type_painting tp ON p.id_type_painting = tp.id_type_painting"

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
        con.query(sqlToGetPaintingsWithImages + 'WHERE p.id_painting = ' + id, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getPaintingFiltered = async (availability, prices, color, sizes, orientation, type) => {
    let availabilityClause = '';
    let pricesClause = '';
    let colorClause = '';
    let sizesClause = '';
    let orientationClause = '';
    let typeClause = '';

    let initialQuery = sqlToGetPaintingsWithImages + ' WHERE';
    let query = sqlToGetPaintingsWithImages + ' WHERE';

    if (availability !== undefined && availability.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        availability.forEach(element => {
            availabilityClause += ` availability = '${element}' OR`;
        });

        if (availabilityClause.endsWith("OR")) {
            availabilityClause = availabilityClause.slice(0, -2);
        }

        query += availabilityClause;
    }

    if (prices !== undefined && prices.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        prices.forEach(element => {
            const infos = element.split('-');
            pricesClause += ` price BETWEEN '${infos[0]}' AND '${infos[1]}' OR`;
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

    if (orientation !== undefined && orientation.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        orientation.forEach(element => {
            orientationClause += ` orientation = '${element}' OR`;
        });

        if (orientationClause.endsWith("OR")) {
            orientationClause = orientationClause.slice(0, -2);
        }

        query += orientationClause;
    }

    if (type !== undefined && type.length > 0) {
        if (query !== initialQuery) {
            query += 'AND';
        };
        type.forEach(element => {
            typeClause += ` type_painting = '${element}' OR`;
        });

        if (typeClause.endsWith("OR")) {
            typeClause = typeClause.slice(0, -2);
        }

        query += typeClause;
    }

    query += ';'

    console.log(query);

    if(availabilityClause == '' && pricesClause == '' && colorClause == '' && sizesClause == '' && orientationClause == '' && typeClause == '') {
        query = sqlToGetPaintingsWithImages;
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
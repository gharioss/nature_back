const { con } = require('../utils/db.js');

let sqlToGetPaintingsWithImages = "SELECT p.*, h.height, w.width, d.depth, c.color, a.availability, o.orientation, tp.type_painting, (SELECT i.image FROM image i WHERE i.id_painting = p.id_painting ORDER BY i.id_painting LIMIT 1) AS first_image FROM painting p LEFT JOIN height h ON p.id_height = h.id_height LEFT JOIN width w ON p.id_width = w.id_width LEFT JOIN depth d ON p.id_depth = d.id_depth LEFT JOIN color c on p.id_color = c.id_color LEFT JOIN availability a ON p.id_availability = a.id_availability LEFT JOIN orientation o ON p.id_orientation = o.id_orientation LEFT JOIN type_painting tp ON p.id_type_painting = tp.id_type_painting"

const getAllPaintings = () => {
    return new Promise((resolve, reject) => {
        con.query(sqlToGetPaintingsWithImages + ' ORDER BY p.created_at DESC;', (err, rows, fields) => {
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
        const sql = "SELECT p.*, h.height, w.width, d.depth, c.color, a.availability, o.orientation, tp.type_painting, i.image, i.id_image FROM painting p LEFT JOIN height h ON p.id_height = h.id_height LEFT JOIN width w ON p.id_width = w.id_width LEFT JOIN depth d ON p.id_depth = d.id_depth LEFT JOIN color c on p.id_color = c.id_color LEFT JOIN availability a ON p.id_availability = a.id_availability LEFT JOIN orientation o ON p.id_orientation = o.id_orientation LEFT JOIN type_painting tp ON p.id_type_painting = tp.id_type_painting LEFT JOIN image i ON i.id_painting = p.id_painting WHERE p.id_painting = " + id;

        con.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getPaintingFiltered = async (search, availability, prices, color, sizes, orientation, type) => {
    let searchClause = '';
    let availabilityClause = '';
    let pricesClause = '';
    let colorClause = '';
    let sizesClause = '';
    let orientationClause = '';
    let typeClause = '';

    let initialQuery = sqlToGetPaintingsWithImages + ' WHERE';
    let query = sqlToGetPaintingsWithImages + ' WHERE';

    if (search !== undefined && search.length > 0) {

        query += ` p.name LIKE '%${search}%' `;
    }

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
        colorClause += ' (';
        color.forEach(element => {
            colorClause += ` c.color = '${element}' OR`;
        });

        if (colorClause.endsWith("OR")) {
            colorClause = colorClause.slice(0, -2);
            colorClause += ')';
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

    if (query.endsWith("WHERE")) {
        query = typeClause.slice(0, -5);
    }

    query += ' ORDER BY p.created_at DESC'

    query += ';'

    console.log(query);

    if(search == '' && availabilityClause == '' && pricesClause == '' && colorClause == '' && sizesClause == '' && orientationClause == '' && typeClause == '') {
        query = sqlToGetPaintingsWithImages + ' ORDER BY p.created_at DESC;';
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

  const insertPaintingData = (data) => {

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO painting (name, price, id_height, id_width, id_depth, id_color, id_availability, id_orientation, id_type_painting) VALUES (?,?,?,?,?,?,?,?,?)`;

        const values = [data.name, data.price, data.height, data.width, data.depth, data.color, data.availability, data.orientation, data.type_painting];
    
        con.query(sql, values, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        });
    });
};

const insertFiles = (id, fileRecords) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO image (id_painting, image) VALUES (?, ?)";

        fileRecords.forEach(element => {
            con.query(sql, [id, element[0].path], (err, result) => {
                if (err) {
                    reject('Error');
                } else {
                    resolve(result);
                }
            });
        });
    });
};

module.exports = { getAllPaintings, getPaintingById, getPaintingFiltered, insertPaintingData, insertFiles };
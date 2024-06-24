const { con } = require('../utils/db.js');
const { bcrypt, compare } = require('bcrypt');

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user', (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user WHERE id_user = ' + id, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const registerUser = (userInformations) => {
  const random_uuid = uuidv4();

  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO user (guid_user, email, password, first_name, last_name, role) VALUES (?,?,?,?,?,?)`;
    const values = [random_uuid, userInformations.email, userInformations.password, userInformations.first_name, userInformations.last_name, 'user'];

    con.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve('User registered successfully');
      }
    });
  });
};

const loginUser = (values) => {
  return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user WHERE email = ?";
      con.query(sql, values.email, async (err, result) => {
        if (err) reject(err);

        if (result[0]) {
          const passwordsMatch = await compare(values.password, result[0].password);
          if (!passwordsMatch) {
            resolve('Error')
          } else {
            resolve(result[0])
          }
        }
      });
    });
};


module.exports = { getAllUsers, getUserById, registerUser, loginUser };


const { con } = require('../utils/db.js');
const { bcrypt } = require('bcrypt');

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

const loginUser = (id) => {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
          const sql = "SELECT * FROM user WHERE email = ?";
          con.query(sql, user[0], (err, result, fields) => {
            if (err) reject(err);
    
            if (result[0]) {
              bcrypt.compare(user[1], result[0].password, (error, response) => {
                if (response) {
                  resolve(result);
                }
              });
            } else {
              resolve({ message: "User doesn't exist" });
            }
          });
        });
      });
};

const registerUser = (userInformation) => {
    con.connect((err) => {
      const sql = `INSERT INTO user (email, password, first_name, last_name) VALUES (?,?,?,?)`;
      con.query(sql, userInformation, (err, result) => {
        if (err) throw err;
        console.log(result);
      });
    });
  };

module.exports = { getAllUsers, getUserById, registerUser };
var pool = require('../db.js')

const schema = '"member"';
const table = '"Users"';
const dbTable = schema + '.' + table;


class User {

    create(user_info) {
        return new Promise((resolve, reject) => {
            if(user_info.name && user_info.city && user_info.password && user_info.email)
            {
                pool.query(
                    `INSERT INTO users ( name, email, password, city, state, c_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
                    [user_info.name, user_info.email, user_info.password, user_info.city, 'CA', 0]
                ).then( res => {
                    resolve(res.rows[0]);
                }).catch( err => {
                    reject(err);
                })
            }
            else {
                return reject('Error in User Model')
            }
        })
    }
    /*get(user_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT name, city, state, email FROM users WHERE u_id = $1`, [user_id]).then( res => {
                resolve(res.rows[0]);
            }).catch( err => {
                reject(err);
            })
        })
    }*/
    getUserWithEmail(email) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT u_id, name, city, state, email, password FROM users WHERE email = $1`, [email]).then( res => {
                resolve(res.rows);
            }).catch( err => {
                reject(err);
            })
        })
    }
    get(u_email, u_password) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT u_id, name, city, state, email FROM users WHERE email = $1 AND password = $2`, [u_email, u_password]).then( res => {
                resolve(res.rows[0]);
            }).catch( err => {
                reject(err);
            })
        })
    }
    /*
    get(user_id, login_info) {
        return new Promise((resolve, reject) => {
            if (user_id == -1) {
                this.pool.get(`SELECT firstname, lastname, age, password, email FROM users WHERE email = ?, password = ?`, [login_info.email, login_info.password], (err, row) => {
                    if(err) {
                        return reject(err.message);
                    }
                    return row ? resolve(row.id) : reject(`Incorrect email and password combination`);
                });
            } else if (login_info) {
                this.pool.get(`SELECT id, firstname, lastname, age, password, email FROM users WHERE email = ? AND password = ?`, [login_info.email, login_info.password], (err, row) => {
                    if(err) {
                        return reject(err.message);
                    }
                    return row ? resolve(row): reject(`No user found with that email ${login_info.email} and password combination`);
                });
            } else {
                this.pool.get(`SELECT firstname, lastname, age, password, email FROM users WHERE id = ?`, [user_id], (err, row) => {
                    if(err) {
                        return reject(err.message);
                    }
                    return row ? resolve(row): reject(`No user found with the id ${user_id}`);
                });
            }
        });

    }*/
    update(user_id, values) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE users SET (name = $2, city = $3, state = $4) WHERE u_id = $5 RETURNING u_id, name, email, city, state`, [values[0], values[1], values[2], values[3], user_id]).then( res => {
                resolve(res.rows[0]);
            }).catch( err => {
                reject(err);
            })
        })
    }
    updatePassword(user_id, value) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE users SET password = $1 WHERE u_id = $2 RETURNING u_id, name, email, city, state`, [value, user_id]).then( res => {
                resolve(res.rows[0]);
            }).catch( err => {
                reject(err);
            })
        })
    }
    destroy(user_id) {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM users WHERE u_id = $1`, [user_id]).then( res => {
                resolve();
            }).catch( err => {
                reject(err);
            })
        })
    }
    // returns an array of all users without their passwords
}
module.exports = new User;
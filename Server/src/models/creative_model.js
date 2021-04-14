var pool = require('../dbModel.js')

class CreativeModel {

    getAll(u_id) {
        return new Promise((resolve, reject) => {
            pool.query().then( res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
    get(cname) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT c_id, name, u_count FROM creatives WHERE name = $1`, [cname]).then( res => {
                resolve(res.rows);
            }).catch(err => {
                reject(err);
            })
        })
    }
    getAllUserCreatives(u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT name, type FROM creatives LEFT JOIN user_creatives ON creatives.c_id = $1`, [u_id]).then( res => {
                resolve(res.rows); 
            }).catch(err => {
                reject(err);
            })
        })
    }
    // adds a new unique creative to the creatives table with a user count of 1
    create(c_info) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO creatives (name, type, u_count) VALUES ($1, $2, 0) RETURNING *`, [c_info.name, c_info.type]).then( res => {
                resolve(res.rows[0]);
            }).catch(err => {
                reject(err);
            })
        })
    }
    // adds relation between user and creative
    addUserCreative(c_id, u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO user_creatives (c_id, u_id) VALUES ($1, $2) RETURNING *`, [c_id, u_id]).then( res => {
                resolve(res.rows[0].c_uid);
            }).catch(err => {
                reject(err);
            })
        })
    }
    updateCount(value) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE creatives u_count VALUES $1`, [value]).then( res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    deleteCreative(name) {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM creatives WHERE name = $1`, [name]).then( res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    removeAllUserCreatives(u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT u_count FROM creatives WHERE `)
            pool.query(`DELETE FROM user_creatives WHERE u_id = $2 RETURNING c_id`, [u_id]).then( res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    deleteAllUserCreatives(u_id) {
        return new Promise((resolve, reject) => {
            
            pool.query(`WITH creativesDecs AS (DELETE FROM user_creatives WHERE u_id = $1 RETURNING c_id) 
            UPDATE creatives SET u_count = u_count - 1 WHERE c_id in (SELECT c_id FROM creativesDec)`, [u_id]).then( res => {
                pool.query(`DELETE FROM user_creatives WHERE u_count = 0 RETURNING *`).then( res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        })
    }
}

module.exports = new CreativeModel;
var pool = require('../db.js')

class UserCreativeModel {

    getAll(u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT c_id FROM user_creatives WHERE u_id = $1`, [u_id]).then( res => {
                resolve(res.rows.map(row => { return row.c_id; }));
            }).catch(err => {
                reject(err);
            })
        });
    }
    // deletes a user_creatives entry and removes the creative entry if their count is 0
    deleteAll(u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`WITH deletedUserCreatives AS (DELETE FROM user_creatives WHERE u_id = $1 RETURNING c_id)
                            DELETE FROM creatives WHERE u_count <= 0 AND c_id IN ( SELECT c_id FROM deletedUserCreatives)`, [u_id])
            .then( res => {
                console.log(res.rows);
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
    getUserCreative(c_id, u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM user_creatives WHERE c_id = $1 AND u_id = $2`, [c_id, u_id]).then( res => {
                resolve(res.rows);
            }).catch(err => {
                reject(err);
            })
        })
    }
    // deletes a user_creatives entry and removes the creative entry if their count is 0
    deleteUserCreative(c_id, u_id) {
        return new Promise((resolve, reject) => {
            pool.query(`WITH deletedUserCreative AS (DELETE FROM user_creatives WHERE c_id = $1 AND u_id = $2 RETURNING c_id)
                            DELETE FROM creatives WHERE u_count <= 0 AND c_id IN ( SELECT c_id FROM deletedUserCreative)`, [c_id, u_id])
            .then( res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
module.exports = new UserCreativeModel
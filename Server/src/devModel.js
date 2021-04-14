var pool = require('./dbModel.js');
var chalk = require('chalk')
const Table = require('cli-table')
class Dev {
    display() {
        this.getAll().then(data => {
            data.forEach((table) =>{
                Object.entries(table).forEach( entry => {
                    let key = entry[0];
                    let value = entry[1];
                    console.log(chalk.blue.bold.bgWhite(key))
                    var t = new Table({ head: value.fields });
                    value.row_values.forEach(arr => {t.push(arr);})
                    console.log(t.toString());
                })
            })
          }).catch( error => {
              console.log(`error: ${error.message}`)
          })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            var results = []
            pool.query('SELECT * FROM user_creatives ORDER BY u_id').then( res => {
                var h = {};
                h['user_creatives'] = {};
                h['user_creatives']['fields'] = [];
                res.fields.forEach(element => {
                    h['user_creatives']['fields'].push(element.name)
                })
                h['user_creatives']['row_values'] = [];
                res.rows.forEach(row => {
                    h['user_creatives']['row_values'].push(Object.values(row))
                })
                results.push(h);
                pool.query('SELECT * FROM creatives ORDER BY c_id').then( res => {
                    var h = {};
                    h['creatives'] = {};
                    h['creatives']['fields'] = [];
                    res.fields.forEach(element => {
                        h['creatives']['fields'].push(element.name)
                    })
                    h['creatives']['row_values'] = [];
                    res.rows.forEach(row => {
                        h['creatives']['row_values'].push(Object.values(row))
                    })
                    results.push(h);
                    pool.query('SELECT * FROM users ORDER BY u_id').then( res => {
                        var h = {};
                        h['users'] = {}
                        h['users']['fields'] = [];
                        res.fields.forEach(element => {
                            h['users']['fields'].push(element.name)
                        })
                        h['users']['row_values'] = [];
                        res.rows.forEach(row => {
                            h['users']['row_values'].push(Object.values(row));
                        })
                        results.push(h);
                        resolve(results);
                    }).catch(err => {
                        reject(err);
                    })
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        })
    }
    clear() {
        return new Promise((resolve, reject) => {
            pool.query('TRUNCATE user_creatives, creatives, users').then( res => {
                resolve()
            }).catch(err => {
                reject(err);
            })
        })
    }

}
module.exports = new Dev;
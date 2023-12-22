const mysql = require('mysql');
const sql = require('./db/sql.js');

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PWD,
    database : process.env.MYSQL_DB,
    connectionLimit : process.env.MYSQL_LIMIT  
})



const query = async (alias, values) => {
    return new Promise((resolve, reject) => {
        for (let key in sql) {
            if (sql.hasOwnProperty(key) && sql[key].hasOwnProperty(alias)) {
                const queryToExecute = sql[key][alias]; // 해당 alias에 해당하는 쿼리 가져오기
                pool.query(queryToExecute, values, (err, results) => {
                    if (err) {
                        console.log(err);
                        reject({ err });
                    } else {
                        resolve(results);
                    }
                });
                return; // 쿼리 실행 후 함수 종료
            }
        }
        reject({ error: 'Alias not found in any module' });
    });
};

module.exports = {
    query
}
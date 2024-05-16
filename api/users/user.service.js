const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
                    values(?, ?, ?, ?, ?, ?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUsers: (callback) => {
        pool.query(
            `select * from registration`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUserById: (id, callback) => {
        pool.query(
            `select * from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateUserById: (data, callback) => {
        pool.query(
            `update registration set firstName = ?, lastName = ? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    deleteUserById:  (id, callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUserByEmail: (email, callback) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
};

require('dotenv').config();
const { create, getUsers, getUserById, updateUserById, deleteUserById, getUserByEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return ;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err) {
                console.log(err);
                return ;
            }
            if(results.length == 0) {
                return res.status(200).json({
                    status: 1,
                    message: "Record Not Found."
                });
            }
            return res.status(200).json({
                status: 1,
                data: results
            });
        });
    },

    updateUserById: (req, res) => {
        const data = req.body;
        updateUserById(data, (err, results) => {
            if(err) {
                console.log(err);
                return ;
            }
            if(results.length == 0) {
                return res.status(200).json({
                    status: 1,
                    message: "Record Not Found."
                });
            }
            return res.status(200).json({
                status: 1,
                message: "Record Update Successfully."
            });
        });
    },

    deleteUserById: (req, res) => {
        const id =req.params.id;
        deleteUserById(id, (err, results) => {
            if(err) {
                console.log(err);
                return ;
            }
            if(results.length == 0) {
                return res.status(200).json({
                    status: 0,
                    message: "Record Not Found."
                });
            }
            return res.status(200).json({
                status: 1,
                message: "Record Deleted Successfully"
            });
        });
    },

    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        getUserByEmail(email, (err, results) => {
            if(err) {
                console.log(err);
                return ;
            }
            if(results.length == 0) {
                return res.json({
                    status: 0,
                    message: "Invaild Email or Password."
                });
            }
            const result = compareSync(password, results[0].password);
            if(result) {
                results.password = undefined;
                const jsonWebToken = sign({result: results}, process.env.KEY, {expiresIn: '1h'});

                return res.status(200).json({
                    status: 1,
                    message: 'Login Succesfully',
                    token: jsonWebToken
                })
            } else {
                return res.json({
                    status: 0,
                    message: "Invaild Email or Password."
                });
            }
            
        });
    }
};

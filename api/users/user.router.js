const { createUser, getUsers, getUserById, updateUserById, deleteUserById, login } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUserById);
router.delete('/:id', checkToken, deleteUserById);
router.post('/login', login);

module.exports = router;
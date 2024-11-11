// routes/userRoutes.js
const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser ,getUserByEmail,updateUserByEmail, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/createUser', createUser);
router.get('/', getUsers);
router.get('/:email',getUserByEmail)
router.get('/:id', getUserById);


router.put('/:id', updateUser);
router.put('/update/:email', updateUserByEmail);
router.delete('/:id', deleteUser);

module.exports = router;

import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser, getUser } from '../controllers/users';

const router = Router();

// TODO: Implemente route validations with express-validator and the middleware to handle te errors

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
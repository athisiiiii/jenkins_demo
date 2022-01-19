import express from 'express';
import { 
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser
} from '../controllers/users.js';
import { authenticate, authorize } from '../middleware/auth.js';

// create a router
const router = express.Router();

// router.get(     '/', getUsers );
router.get(     '/:_id', getUserById );
router.post(    '/', postUser );
router.put(     '/:_id', putUser);
router.delete(  '/:_id', deleteUser );
router.get(     '/', authenticate, authorize( ['admin']), getUsers );
// module.exports = router

// exporting single item in ES2015 export syntax
export default router;
const { Router } = require('express');

import userRoutes from './user';
import todosRoutes from './toDos'
import reportRoutes from './report';

const router = Router();

router.use('/user', userRoutes);
router.use('/todos', todosRoutes);
router.use('/report', reportRoutes);

module.exports = router;

const { Router } = require('express');

import userRoutes from './user';
import todosRoutes from './toDos'

const router = Router();

router.use('/user', userRoutes);
router.use('/todos', todosRoutes);

module.exports = router;

const { Router } = require('express');

import userRoutes from './boss';
import todosRoutes from './toDos'

const router = Router();

router.use('/user', userRoutes);
router.use('/todos', todosRoutes);

module.exports = router;

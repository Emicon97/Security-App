const { Router } = require('express');

import bossRoutes from './boss';
import supervisorRoutes from './supervisor';
import watcherRoutes from './watcher';
import todosRoutes from './toDos'

const router = Router();

router.use('/boss', bossRoutes);
router.use('/supervisor', supervisorRoutes);
router.use('/watcher', watcherRoutes);
router.use('/todos', todosRoutes);

module.exports = router;

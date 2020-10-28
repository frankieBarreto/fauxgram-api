
// imports
const router = require('express').Router();
const authRequired = require('../middleware/authRequired')
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.post.index);
router.get('/:id', ctrl.post.show);
router.post('/', authRequired, ctrl.post.create);
router.put('/:id', ctrl.post.update);
router.delete('/:id', ctrl.post.destroy);

// exports
module.exports = router;
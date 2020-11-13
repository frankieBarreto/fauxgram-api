
// imports
const router = require('express').Router();
const authRequired = require('../middleware/authRequired')
const ctrl = require('../controllers');

router.get('/', ctrl.post.index);
router.post('/', authRequired, ctrl.post.create);
router.get('/:id', ctrl.post.show);
router.get('/user/:id', ctrl.post.user);
router.put('/:id', authRequired, ctrl.post.update);
router.delete('/:id',  authRequired, ctrl.post.destroy);

// exports
module.exports = router;

// imports
const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.comments.index);
router.get('/:id', ctrl.comments.show);
router.post('/', ctrl.comments.create);
router.put('/:id', ctrl.comments.update);
router.delete('/:id', ctrl.comments.destroy);

// exports
module.exports = router;
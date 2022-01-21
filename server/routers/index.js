const Controllers = require('../controllers')
const {authentication} = require('../middlewares/auth')
const router = require('express').Router()

router.post('/register', Controllers.register)
router.post('/logingoogle', Controllers.googleLogin)
router.post('/login', Controllers.login)
router.get('/favorites',authentication, Controllers.fetchFavorites)
router.post('/favorites', authentication, Controllers.addFavorites)
router.delete('/favorites/:id',authentication, Controllers.deleteFavorites)

module.exports = router
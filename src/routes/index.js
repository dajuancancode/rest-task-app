const { Router } = require('express')
const multer = require('multer')

const users = require('../controllers/users')
const tasks = require('../controllers/tasks')

const authMiddleware = require('../middleware/auth')

const router = Router()
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('Please upload a image'))
    }
    
    cb(undefined, true)
  }
})




router.post('users/signup', users.createUser)
router.post('users/login', users.loginUser)
router.post('users/logout', authMiddleware, users.logoutUser)
router.post('users/logoutAll', authMiddleware, users.logoutAll)

router.get('users/me', authMiddleware, users.userProfile)
router.patch('users/me', authMiddleware, users.updateUser)
router.delete('users/me', authMiddleware, users.removeUser)
router.post('users/me/avatar', authMiddleware, upload.single('avatar'), users.uploadAvatar, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})
router.delete('users/me/avatar', authMiddleware, users.deleteAvatar)
router.get('users/:id/avatar', users.fetchAvatar)

router.get('tasks', authMiddleware, tasks.listTasks)
router.post('tasks/create', authMiddleware, tasks.createTask)

router.get('task/:id', authMiddleware, tasks.readTask)
router.patch('task/:id', authMiddleware, tasks.updateTask)
router.delete('task/:id', authMiddleware, tasks.removeTask)

module.exports = router
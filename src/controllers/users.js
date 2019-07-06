const User = require('../models/user')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')


const createUser = async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    sendWelcomeEmail(user.email, user.name)
    res.status(201).send({user, token})
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
}

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
}

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
}

const userProfile = async (req, res) => {
  res.send(req.user)
  
}


const updateUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
  
  
  if (!isValidUpdate) {
    res.status(400).send()
    return
  }

  try {
    
    updates.forEach(update => req.user[update] = req.body[update])
    req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
}

const removeUser = async (req, res) => {
  
  try {
    await req.user.remove()
    sendCancelEmail(req.user.email, req.user.name.split(' ')[0])
    res.send(req.user)
  } catch (e) {
    res.status(400).send()
  }
}

const uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()

  req.user.avatar = buffer
  await req.user.save()
  res.send()
}

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
}

const fetchAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    
    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
}

module.exports =  { fetchAvatar, deleteAvatar, createUser, loginUser, logoutUser, logoutAll, userProfile, updateUser, removeUser, uploadAvatar }
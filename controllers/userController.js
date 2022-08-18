import UserModal from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const createUser = async ( req, res) => {
  const { login, nickname, email, password} = req.body
  let {description} = req.body

  if (!description){
    description = `This user does not have a description yet.`
  }
  if (!login || !nickname || !email || !password) {
    res.status(400)
    throw new Error('Please fill in all credentials')
  }
  
  const userExists = await UserModal.findOne({login})
  if (userExists){
    res.status(400)
    throw new Error('User already exists')
  } 

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await UserModal.create({
    login, 
    nickname,
    description,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      login: user.login,
      nickname: user.nickname,
      description: user.description,
      email: user.email,
      token: generateJWToken(user._id)
      }) 
    } else {
      res.status(400)
      throw new Error('Invalid user credentials')

    }
}

export const loginUser = async ( req, res) => {
    const { login, password} = req.body
    try{
      const user = await UserModal.findOne({login})
  
      if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
          message: 'You are logged in',
          _id: user.id,
          login: user.login,
          nickname: user.nickname,
          description: user.description,
          email: user.email,
          token: generateJWToken(user._id)
        })
      } else {
        res.status(400)
        res.json({message: 'Invalid user'})
        throw new Error('Invalid user credentials')
      }

    } catch (error) {
      res.status(404).json({ message: "Something went wrong", error: err });
    }
  }



// TO DO -> work on that
export const getMyProfile = async ( req, res) => {
    try {
      const { _id, nickname, email, description} = await UserModal.findById(req.user.id) 
      res.status(200).json({
        message: 'yourProfile',
        id: _id,
        nickname,
        email,
        description
      })
    } catch (error) {
      res.status(400).json({message: `Cannot get user's profile`})
    }
}



export const showAllUsers = async ( req, res) => {
  
  try {
      const users = await UserModal.find()  
      res.status(200).json(users)
       

    } catch (err) {
        res.status(404).json({ message: "Something went wrong", error: err });
    }
}





export const generateJWToken = (id) => {
  return jwt.sign({ id}, process.env.JWT_SECRET, {
      expiresIn: '14d',
  } )
}



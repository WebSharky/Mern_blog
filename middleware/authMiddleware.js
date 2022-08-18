import jwt from 'jsonwebtoken'
import UserModal from '../models/user.js'


export const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            console.log('there is a authorization')
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await UserModal.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
        }
        
    }
    if(!token) {
        res.status(401)
        throw new Error('No token')
    }
}
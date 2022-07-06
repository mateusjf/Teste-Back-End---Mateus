const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    generateToken: (dataObject) => {
        return jwt.sign(dataObject, process.env.SECRET_JWT, {
            expiresIn: (60 * 60)
        })
    },
    /*
    decodeToken: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secretkey', (err, decoded) => {
                if (err) {
                    reject(err)
                }
                const { dataObject } = decoded
                resolve(dataObject)
            })
        })
    },
*/
    autorization: async (req, res, next) => {
        let token

        const callback = param => {
            return new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(decoded)
                })
            })
        }

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = await callback(token)
                req.user = decoded
                next()
            } catch (error) {
                res.status(401).json({
                    message: 'Not authorized',
                    status: 401
                })
            }
        }

        if (!token) {
            res.status(401).json({
                message: 'Not authorized, no token',
                status: 401
            })
        }
    }
}
import jwt from 'jsonwebtoken'

export const generateToken = (id: string) => {
    return jwt.sign({id},'SECRET',{expiresIn:'12d'});
}
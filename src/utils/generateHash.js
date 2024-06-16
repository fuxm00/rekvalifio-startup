import crypto from "crypto";

export const generateHash = (password, salt) => {
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
    return hash
}
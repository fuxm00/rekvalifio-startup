import crypto from "crypto";
import db from "../db.js";
import {generateHash} from "../../src/utils/generateHash.js";

export const getAllUsers = async () => {
    let query = db('users').select('*')

    const users = await query

    return users
}

export const createUser = async (mail, password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = generateHash(password, salt)
    const token = crypto.randomBytes(16).toString('hex')

    const currentUsers = await getAllUsers()
    let defaultApproval = currentUsers.length < 1;

    const ids = await db('users').insert({mail, salt, hash, token, isApproved: defaultApproval})

    const user = await db('users').where('id', ids[0]).first()

    return user
}

export const getUser = async (mail, password) => {
    const user = await db('users').where({mail}).first()
    if (!user) return null

    const salt = user.salt
    const hash = generateHash(password, salt)
    if (hash !== user.hash) return null

    return user
}

export const getUserByToken = async (token) => {
    const user = await db('users').where({token}).first()
    return user
}

export const approveUserById = async (id, isApproved) => {
    await db('users').update({isApproved: isApproved}).where('id', id)
}

export const removeUserById = async (id) => {
    await db('users').delete().where({id})
}
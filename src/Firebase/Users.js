import { db } from '../Firebase/Firebase'

const userRef = db.collection('users')

export const doAddUser = (id, user) =>
  userRef
    .doc(id)
    .set(user)

export const doGetUser = (id) =>
  userRef
  //grab doc with that id and get it
    .doc(id)
    .get()
import { db } from '../Firebase/Firebase'
import { storage } from '../Firebase/Firebase'

const userRef = db.collection('users')
const movieRef = db.collection('movies')

const storageRef = storage.ref()

// PROFILE IMAGE UPLOAD

export const doAddStoreFile = (file) =>
  storageRef
    .child(file.name)
    .put(file)

export const doUpdateUserPic = (id, name) =>
  userRef
    .doc(id)
    .update({ fileRef: name })

export const getUserPic = (name) =>
  storageRef
    .child(name)
    .getDownloadURL()

// FIREBASE USER

export const doAddUser = (id, user) =>
  userRef
    .doc(id)
    .set(user)

export const doGetUser = (id) =>
  userRef
    // grab doc with that id and get it
    .doc(id)
    .get()

export const doGetAllUsers = () =>
  userRef
    .get()

export const doAddFriend = (userId, friendData) =>
  userRef
    .doc(userId)
    .collection('friends')
    .add(friendData)

export const doDeleteFriend = (userId, friendId) =>
  userRef
    // find the user Id, go into the sub collection of friends, find the movieId and then delete
    .doc(userId)
    .collection('friends')
    .doc(friendId)
    .delete()

export const doAddMovieToWatchList = (id, data) =>
  userRef
    .doc(id)
    .collection('movies')
    .add(data)

export const doGetAllUserMovies = (id) =>
  userRef
    .doc(id)
    .collection('movies')
    .get()

export const doGetAllFriends = (id) =>
  userRef
    .doc(id)
    .collection('friends')
    .get()

export const doDeleteMovie = (userId, movieId) =>
  userRef
    // find the user Id, go into the sub collection of movies, find the movieId and then delete
    .doc(userId)
    .collection('movies')
    .doc(movieId)
    .delete()

export const doCreateMovieData = (userId, calendarData) =>
  userRef
    .doc(userId)
    .collection('calendar')
    .add(calendarData)

export const doRemoveFromWatchList = (userId, movieId) =>
  userRef
    .doc(userId)
    .collection('movies')
    .where('id', '==', movieId)
    .get()
    .then(snapShot => snapShot.docs.forEach(m => m.ref.delete()))

// export const addMovie = async userId => {
//   const match = []
//   const userMovies = await userRef.doc(userId).collection('movies').get().then(snapShot => snapShot.docs.map(m => m.data()))
//   const userFriends = await userRef.doc(userId).collection('friends').get().then(snapShot => snapShot.docs.map(m => m.data()))
// }

export const addMovie = movie =>  {
  movieRef
    .where('id', '==', movie.id)
    .get()
    .then(snapShot => {
      !snapShot.empty ? console.log(true) : console.log(false)
      console.log(movie.id, snapShot)
    }
      
    )
}



// .then(async snapShot => {
//   const movies = await snapShot.docs.map(m => m.data())
// })

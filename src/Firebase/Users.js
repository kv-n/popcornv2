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

  
export const doGetAllUsers = () =>
    userRef
    .get()



// export const doGetFriendsList =(id) =>
//   userRef
//     .doc(id)
//     .collection('friends')
//     .get()

  
export const doAddFriend = (userId, friendData) =>
  userRef
    .doc(userId)
    .collection('friends')
    .add(friendData)

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
    //find the user Id, go into the sub collection of movies, find the movieId and then delete
    .doc(userId)
    .collection('movies')
    .doc(movieId)
    .delete()
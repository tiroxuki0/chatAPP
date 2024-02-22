import { createSelector } from "@reduxjs/toolkit"

const userSelector = (state) => state.auth.user
const searchSelector = (state) => state.data.search
const roomsSelector = (state) => state.data.rooms
const usersSelector = (state) => state.data.users
const usersDisplaySelector = (state) => state.data.usersDisplay

export const roomsRemaining = createSelector(userSelector, searchSelector, roomsSelector, (user, search, rooms) => {
  if (rooms == null) {
    return []
  }
  const roomsFilted = rooms.filter((room) => {
    return room.private == false && room.members.includes(user.uid)
  })
  return roomsFilted.filter((room) => {
    const lowerSearch = search.trim().toLowerCase()
    const lowerRoomName = room.roomName.toLowerCase()
    return lowerRoomName.includes(lowerSearch)
  })
})

export const usersRemaining = createSelector(searchSelector, usersSelector, (search, users) => {
  if (users == null) {
    return []
  }
  return users.filter((user) => {
    const lowerSearch = search.trim().toLowerCase()
    const lowerUserName = user.displayName.toLowerCase()
    return lowerUserName.includes(lowerSearch)
  })
})

export const usersDisplayRemaining = createSelector(searchSelector, usersDisplaySelector, (search, usersDisplay) => {
  if (usersDisplay == null) {
    return []
  }
  return usersDisplay.filter((user) => {
    const lowerSearch = search.trim().toLowerCase()
    const lowerUserName = user.displayName.toLowerCase()
    return lowerUserName.includes(lowerSearch)
  })
})

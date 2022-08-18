import { createSelector } from "@reduxjs/toolkit";

const searchSelector = (state) => state.data.search;
const roomsSelector = (state) => state.data.rooms;

export const roomsRemaining = createSelector(
  searchSelector,
  roomsSelector,
  (search, rooms) => {
    return rooms.filter((room) => {
      const lowerSearch = search.toLowerCase();
      const lowerLabel = room.label.toLowerCase();
      return lowerLabel.includes(lowerSearch);
    });
  }
);

// src/services/dateUtils.js
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Format the date as a string
};

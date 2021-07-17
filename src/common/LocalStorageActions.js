export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageData = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

export const deleteLocalStorageData = (key) => {
  localStorage.removeItem(key);
};

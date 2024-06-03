export const logoutUser = () => {
  // Odstranit token z localStorage
  localStorage.removeItem('token');
};
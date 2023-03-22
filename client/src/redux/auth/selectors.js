export const getIsLoggedIn = (state) => state.auth?.isLoggedIn || false;
export const getUserId = (state) => state.auth?.user.id || null;
export const getUsername = (state) => state.auth?.user.username || null;
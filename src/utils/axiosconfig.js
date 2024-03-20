const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const token = getUserFromLocalStorage ? getUserFromLocalStorage.token : null;

export const config = {
    headers:{
        Authorization: token ? `Bearer ${token}` : null,
        Accept: "application/json",
    }
}
const getUserFromLocalstorage = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null;
export const config = {
    headers:{
        Authorization:`Bearer ${getUserFromLocalstorage.token}`,
        Accept:"application/json",
    }
}
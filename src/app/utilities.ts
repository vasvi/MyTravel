export const GetUserSignedInState = () => {
    return sessionStorage.getItem('user_authToken') ? true : false;
} 
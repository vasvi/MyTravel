export const GetUserSignedInState = () => {
    return GetUserInfo() ? true : false;
}

export const SetUserInfo = (user) => {
    sessionStorage.setItem('userinfo', JSON.stringify(user));
}

export const GetUserInfo = () => {
    return sessionStorage.getItem('userinfo') && JSON.parse(sessionStorage.getItem('userinfo'));
}

export const RemoveUserInfo = () => {
    sessionStorage.removeItem('userinfo');
}

export const SetSpreadSheetId = (spreadSheetId) =>{
    sessionStorage.setItem('spreadSheetId', spreadSheetId);
}

export const GetSpreadSheetId = () => {
    return sessionStorage.getItem('spreadSheetId');
}
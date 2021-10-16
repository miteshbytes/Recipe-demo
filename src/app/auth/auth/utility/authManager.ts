export const saveAuthentication = (authData: any) => {
    localStorage.setItem('userData', JSON.stringify(authData));
    
    const expiresAt: any = JSON.stringify(authData.expiresIn * 1000 + new Date().getTime());

    localStorage.setItem('expires_at', expiresAt);
    //console.log(localStorage.getItem('expires_at'));

    localStorage.setItem('token', authData.idToken);

}

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('token');
    const expires     = localStorage.getItem('expires_at');
    const expiresAt   = expires && JSON.parse(expires);
    if (new Date().getTime() > expiresAt) {
        clearAuthentication();
    }
    return !!accessToken && new Date().getTime() < expiresAt;
}

export const clearAuthentication = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');

    localStorage.clear();
}
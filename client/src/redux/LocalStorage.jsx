export function SaveToken(tokenHeader){
    localStorage.setItem('auth-token', tokenHeader);
}

export function SaveId(idUser){
    localStorage.setItem('id',idUser);
}

export function SaveUser(TipeUser){
    localStorage.setItem('user',TipeUser)
}
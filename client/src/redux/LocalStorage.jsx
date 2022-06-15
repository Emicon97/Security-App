export function SaveToken(tokenHeader){
    localStorage.setItem('auth-token', tokenHeader);
}

export function SaveRefreshToken(tokenHeader){
    localStorage.setItem('refresh-token', tokenHeader);
}

export function SaveId(idUser){
    localStorage.setItem('id', idUser);
}

export function SaveUserLastName(lastName) {
    localStorage.setItem('lastName', lastName);
}

export function SaveUserName(name) {
    localStorage.setItem('name', name);
}

export function SavePicture(picture) {
    localStorage.setItem('picture', picture);
}

export function SaveUser(TipeUser){
    localStorage.setItem('user', TipeUser);
}

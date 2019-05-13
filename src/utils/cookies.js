export function setCookie(cname, cvalue, hours) {
    let d = new Date();
    d.setTime(d.getTime() + hours * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
}

export function checkCookie() {
    let user = getCookie('jasenrekisteri-token');
    if (user !== '') {
        return user;
    } else {
        return null;
    }
}

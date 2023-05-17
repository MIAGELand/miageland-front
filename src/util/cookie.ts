export function checkCookieAndRedirect(router) {
    return {
        beforeEach(to, from, next) {
            const hasCookie =  getCookie('email')
            if (!hasCookie) {
                router.push({ name: 'Home' });
            } else {
                next();
            }
        },
    };
}

export function getCookie(cookieKey: string): string | undefined {
    const cookie = document.cookie.split(';').find((item) => item.trim().startsWith(cookieKey));
    if (!cookie) {
        return undefined;
    }
    return cookie.split('=')[1];
}
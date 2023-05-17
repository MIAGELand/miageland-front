export function getCookie(cookieKey: string): string | undefined {
    const cookie = document.cookie.split(';').find((item) => item.trim().startsWith(cookieKey));
    if (!cookie) {
        return undefined;
    }
    console.log(cookie)
    console.log(cookie.split('=')[1])
    return cookie.split('=')[1];
}

export function deleteCookie(cookie: string): void {
    document.cookie = `${cookie}=;`;
}
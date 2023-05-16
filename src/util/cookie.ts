export function checkCookieAndRedirect(router) {
    return {
        beforeEach(to, from, next) {
            const hasCookie =  false; // Replace with your actual cookie check
            console.log(hasCookie)
            if (!hasCookie) {
                router.push({ name: 'Home' });
            } else {
                next();
            }
        },
    };
}

class CookieUtils {
    constructor() { }
    // Function to set a cookie with a specified name, value, and expiration time
    setCookie(name, value, expirationMinutes) {
        const date = new Date();
        date.setTime(date.getTime() + (expirationMinutes * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }
    // Function to get the value of a cookie by its name
    getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name + "=") === 0) {
                return cookie.substring(name.length + 1, cookie.length);
            }
        }
        window.location.assign('../index.html');
        return '';
    }
    // Function to clear a cookie by setting its expiration time to the current date and time
    clearCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }


}
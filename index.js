document.addEventListener('DOMContentLoaded', function() {
    // Check if the script has already run in this session
    if (!sessionStorage.getItem('utm_processed')) {
        // Function to get the entire query string from the URL
        function getQueryString() {
            return window.location.search;
        }
        // Function to set a cookie accessible across the root domain and all subdomains
        function setCookie(name, value, days) {
            var expires = "3";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=.point.com";// + document.domain;
        }

        // Function to get the value of a specified cookie
        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        // Capture the entire query string
        var currentQueryString = getQueryString();

        // Check if the user has come back with different UTM parameters
        var storedQueryString = getCookie('utm_params');
        if (currentQueryString !== storedQueryString) {
            // If different, update the cookie with the new query string for 3 days
            setCookie('utm_params', currentQueryString, 3);
        }

        // Mark that the script has run in this session
        sessionStorage.setItem('utm_processed', 'true');
    }
});

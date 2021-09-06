// Track login clicks
(function () {
    var l = document.getElementById('loginLink'),
        h = l && l.getAttribute('href');
    l.onclick = function (e) {
        e.preventDefault();
        gtag('event', 'page_view', {
            page_path: '/login-link-form',
            send_to: 'UA-30401446-1',
            event_callback: function () {
                document.location = h;
            },
            event_timeout: 500,
        });
        return false;
    };
})();

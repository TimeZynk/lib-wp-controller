(function (document) {
    var timeout;
    var interval;

    function getUrl(password) {
        if (location.host !== 'timezynk.com') {
            return 'http://localhost:8989/api/password-strength?pw=' + encodeURIComponent(password);
        }
        return 'https://api.timezynk.com/api/password-strength?pw=' + encodeURIComponent(password);
    }

    function getLocale() {
        var p = location.pathname;
        if (p.indexOf('/da/signup') > -1) {
            return 'da';
        }
        if (p.indexOf('/nb/signup') > -1) {
            return 'nb';
        }
        if (p.indexOf('/sv/signup') > -1) {
            return 'sv';
        }
        return 'en';
    }

    function getLabel(locale, strength) {
        var labels = [
            'Insecure password detected!\nTo finish password update, please enter a stronger password.\nE.g. make it longer or use special symbols ("#-!), etc..',
            'Insecure password detected!\nTo finish password update, please enter a stronger password.\nE.g. make it longer or use special symbols ("#-!), etc..',
            'Weak!\nTo finish password update, please enter a stronger password.\nE.g. make it longer or use special symbols ("#-!), etc..',
            'Good',
            'Strong',
        ];

        if (locale === 'sv') {
            labels = [
                'Osäkert lösenord!\nFör att genomföra lösenordsuppdateringen, ange ett starkare lösenord.\nT.ex. gör det längre eller använd speciella symboler ("# -!), osv...',
                'Osäkert lösenord!\nFör att genomföra lösenordsuppdateringen, ange ett starkare lösenord.\nT.ex. gör det längre eller använd speciella symboler ("# -!), osv...',
                'Svagt lösenord!\nFör att genomföra lösenordsuppdateringen, ange ett starkare lösenord.\nT.ex. gör det längre eller använd speciella symboler ("# -!), osv...',
                'Ok',
                'Starkt',
            ];
        }

        if (locale === 'da') {
            labels = [
                'Usikker adgangskode!\nFor at afslutte opdateringen af adgangskoden skal du indtaste en stærkere adgangskode.\nF.eks. gør det længere eller brug specielle symboler ("# -!) osv...',
                'Usikker adgangskode!\nFor at afslutte opdateringen af adgangskoden skal du indtaste en stærkere adgangskode.\nF.eks. gør det længere eller brug specielle symboler ("# -!) osv...',
                'Svag!\nFor at afslutte opdateringen af adgangskoden skal du indtaste en stærkere adgangskode.\nF.eks. gør det længere eller brug specielle symboler ("# -!) osv...',
                'Ok',
                'Stærk',
            ];
        }

        if (locale === 'nb') {
            labels = [
                'Usikkert passord!\nSkriv inn et sterkere passord for å fullføre passordoppdateringen.\nF.eks lag den lenger eller bruk spesielle symboler ("# -!), osv...',
                'Usikkert passord!\nSkriv inn et sterkere passord for å fullføre passordoppdateringen.\nF.eks lag den lenger eller bruk spesielle symboler ("# -!), osv...',
                'Svak!\nSkriv inn et sterkere passord for å fullføre passordoppdateringen.\nF.eks lag den lenger eller bruk spesielle symboler ("# -!), osv...',
                'Ok',
                'Stærk',
            ];
        }

        return labels[strength] || labels[0];
    }

    function getColor(strength) {
        var colors = ['#e04f5f', '#e04f5f', '#e04f5f', '#fabc3d', '#43b339'];

        return colors[strength] || 'gray';
    }

    function buildProgressLine(color) {
        var elem = document.createElement('div');
        elem.style.height = '5px';
        elem.style.width = '24%';
        elem.style.backgroundColor = color;
        return elem;
    }

    function unsetLoading(elem) {
        elem.innerText = '';
        clearInterval(interval);
        interval = null;
    }

    function setLoading(elem) {
        if (interval) {
            return;
        }

        interval = setInterval(function () {
            var currText = elem.innerText || '';
            elem.innerText = currText === '...' ? '.' : currText + '.';
        }, 450);
    }

    function fetchStrength(password, cb) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(function () {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    try {
                        cb(JSON.parse(xmlHttp.responseText));
                    } catch {}
                    timeout = null;
                }
            };
            xmlHttp.open('GET', getUrl(password), true);
            xmlHttp.send(null);
        }, 500);
    }

    function on(element, event, handler) {
        if (element && event && handler) {
            element.addEventListener(event, handler);
        }
    }

    function init() {
        var wrapper = document.getElementById('password-strength-wrapper');
        if (!wrapper) {
            return;
        }

        var inner = document.getElementById('password-strength-inner');
        var progress = document.getElementById('password-strength-progress');
        var pwInput = document.getElementById('password');
        var submitBtn = document.getElementById('sign-up');
        var loader = document.getElementById('password-strength-loader');
        var locale = getLocale();

        wrapper.style.display = 'block';

        on(pwInput, 'keyup', function (e) {
            setLoading(loader);
            var password = e.target && e.target.value;

            fetchStrength(password || '', function (res) {
                progress.innerHTML = '';

                var s = res.strength;
                let color = getColor(s);
                var text = getLabel(locale, s);

                if (s > 2) {
                    submitBtn.disabled = false;
                } else {
                    submitBtn.disabled = true;
                }

                progress.appendChild(buildProgressLine(password ? color : 'gray'));
                progress.appendChild(buildProgressLine(s > 1 ? color : 'gray'));
                progress.appendChild(buildProgressLine(s > 2 ? color : 'gray'));
                progress.appendChild(buildProgressLine(s > 3 ? color : 'gray'));

                inner.innerText = text;

                unsetLoading(loader);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})(document, location);

(function (doc, win) {
    var errors = {},
        values = {},
        tracked = false;

    win.dataLayer = win.dataLayer || [];

    function isBlank(str) {
        return !str || /^\s*$/.test(str);
    }

    function trackEntry() {
        if (tracked) {
            return;
        }
        tracked = true;
        win.dataLayer.push({
            event: 'Form Input',
            event_category: 'Signup Form',
            event_label: win.location.pathname.substring(0, 19),
        });
    }

    function validateNotEmpty(e) {
        trackEntry();
        var target = e && e.target;
        if (!target) {
            return;
        }
        var id = target.getAttribute('id');
        var val = target.value;

        if (isBlank(val)) {
            target.classList.add('input-error');
            errors[id] = true;
        } else {
            target.classList.remove('input-error');
            delete errors[id];
            values[id] = val;
        }
    }

    var emailRegex = /^[^@]+@[^@]+$/;

    function validateEmail(e) {
        trackEntry();
        var target = e && e.target;
        var id = target.getAttribute('id');
        var val = target.value;

        if (isBlank(val) || !emailRegex.test(val)) {
            target.classList.add('input-error');
            errors[id] = true;
        } else {
            target.classList.remove('input-error');
            delete errors[id];
            values[id] = val;
        }
    }

    function validateForm() {
        validateEmail({ target: doc.getElementById('email') });

        var nameEl = doc.getElementById('name');
        if (nameEl) {
            validateNotEmpty({ target: nameEl });
        }

        var passEl = doc.getElementById('password');
        if (passEl) {
            validateNotEmpty({ target: passEl });
        }

        var countryCodeInput = doc.getElementById('country-code');
        if (countryCodeInput) {
            validateNotEmpty({ target: countryCodeInput });
        }

        var phoneInput = doc.getElementById('phone');
        if (phoneInput) {
            validateNotEmpty({ target: phoneInput });
        }

        return Object.keys(errors).length === 0;
    }

    function addAnalyticsLinker() {
        if (!window.ga) {
            return;
        }
        var tracker = window.ga.getAll()[0];
        if (!tracker) {
            return;
        }
        var linker = new window.gaplugins.Linker(tracker);
        if (!linker) {
            return;
        }
        var value = linker.decorate('https://tzapp.com/').split('=')[1];
        var analyticsLinkerInput = doc.createElement('input');
        analyticsLinkerInput.setAttribute('type', 'hidden');
        analyticsLinkerInput.setAttribute('name', '_ga');
        analyticsLinkerInput.value = value;
        form.appendChild(analyticsLinkerInput);
    }

    function signUp(e) {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }

        var signUpBtn = doc.getElementById('sign-up');
        if (signUpBtn.getAttribute('disabled')) {
            e.preventDefault();
            return;
        }
        addAnalyticsLinker();
        signUpBtn.setAttribute('disabled', 'disabled');
        signUpBtn.textContent = signUpBtn.getAttribute('data-alt');
    }

    function on(element, event, handler) {
        if (element && event && handler) {
            element.addEventListener(event, handler);
        }
    }

    var form = doc.getElementById('signup-form');
    on(form, 'submit', signUp);
    var nameInput = doc.getElementById('name');
    on(nameInput, 'input', validateNotEmpty);
    on(nameInput, 'change', validateNotEmpty);
    var emailInput = doc.getElementById('email');
    on(emailInput, 'input', validateEmail);
    on(emailInput, 'change', validateEmail);
    var countryCodeInput = doc.getElementById('country-code');
    on(countryCodeInput, 'input', validateNotEmpty);
    on(countryCodeInput, 'change', validateNotEmpty);
    var phoneInput = doc.getElementById('phone');
    on(phoneInput, 'input', validateNotEmpty);
    on(phoneInput, 'change', validateNotEmpty);

    var campaignInput = doc.getElementById('campaign-code');
    if (campaignInput) {
        campaignInput.value = win.location.pathname.substring(0, 19);
    }

    if (win.location.host !== 'timezynk.com') {
        var signupForm = doc.getElementById('signup-form');
        if (signupForm) {
            signupForm.setAttribute('action', 'http://localhost:8989/api/signup/v1/token');
        }
    }
})(document, window);

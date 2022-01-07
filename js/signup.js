(function (doc, win) {
    var errors = {},
        values = {},
        tracked = false;

    function isBlank(str) {
        return !str || /^\s*$/.test(str);
    }

    function trackEntry() {
        if (tracked) {
            return;
        }
        tracked = true;
        if (window.mixpanel && mixpanel.track) {
            mixpanel.track('Signup Form Input');
        }
        if (typeof gtag === 'function') {
            gtag('event', 'Form Input', {
                event_category: 'Signup Form',
                event_label: win.location.pathname.substring(0, 19),
            });
        }
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
        signUpBtn.setAttribute('disabled', 'disabled');
        signUpBtn.textContent = signUpBtn.getAttribute('data-alt');
    }

    function addDistinctId() {
        var distinctIdInput = doc.createElement('input');
        distinctIdInput.setAttribute('type', 'hidden');
        distinctIdInput.setAttribute('name', 'mixpanel-distinct-id');
        distinctIdInput.value = mixpanel.get_distinct_id();
        form.appendChild(distinctIdInput);
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

    if (form && win.mixpanel) {
        if (!mixpanel.get_distinct_id) {
            on(doc, 'mixpanelReady', addDistinctId);
        } else {
            addDistinctId();
        }
    }

    if (win.location.host !== 'timezynk.com') {
        var signupForm = doc.getElementById('signup-form');
        if (signupForm) {
            signupForm.setAttribute('action', 'http://localhost:8989/api/signup/v1/token');
        }
    }
})(document, window);

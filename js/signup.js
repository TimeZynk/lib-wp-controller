(function (document) {
    var errors = {},
        values = {},
        tracked = false;

    function isBlank(str) {
        return !str || /^\s*$/.test(str);
    }

    function trackEntry() {
        if (tracked || !mixpanel || !mixpanel.track) {
            return;
        }
        tracked = true;
        mixpanel.track('Signup Form Input');
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
        validateEmail({ target: document.getElementById('email') });

        var nameEl = document.getElementById('name');
        if (nameEl) {
            validateNotEmpty({ target: nameEl });
        }

        var passEl = document.getElementById('password');
        if (passEl) {
            validateNotEmpty({ target: passEl });
        }

        return Object.keys(errors).length === 0;
    }

    function signUp(e) {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }

        var signUpBtn = document.getElementById('sign-up');
        if (signUpBtn.getAttribute('disabled')) {
            e.preventDefault();
            return;
        }
        signUpBtn.setAttribute('disabled', 'disabled');
        signUpBtn.textContent = signUpBtn.getAttribute('data-alt');
    }

    function addDistinctId() {
        var distinctIdInput = document.createElement('input');
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

    var form = document.getElementById('signup-form');
    on(form, 'submit', signUp);
    var nameInput = document.getElementById('name');
    on(nameInput, 'input', validateNotEmpty);
    on(nameInput, 'change', validateNotEmpty);
    var emailInput = document.getElementById('email');
    on(emailInput, 'input', validateEmail);
    on(emailInput, 'change', validateEmail);

    var campaignInput = document.getElementById('campaign-code');
    if (campaignInput) {
        campaignInput.value = location.pathname.substring(0, 19);
    }

    if (form && mixpanel) {
        if (!mixpanel.get_distinct_id) {
            on(document, 'mixpanelReady', addDistinctId);
        } else {
            addDistinctId();
        }
    }

    if (location.host !== 'timezynk.com') {
        var signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.setAttribute('action', 'http://localhost:8989/api/signup/v1/token');
        }
    }
})(document, location);

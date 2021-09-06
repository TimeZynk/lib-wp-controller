(function (document) {
    var priceForm = document.getElementById('price-form');
    if (!priceForm) {
        return;
    }

    var nbrUsersInput = document.getElementById('nbr-users');
    var monthlyFeeInput = document.getElementById('monthly-fee');
    var userFeeInput = document.getElementById('user-fee');
    var pay0Radio = document.getElementById('payment-0');
    var pay12Radio = document.getElementById('payment-12');
    var pay24Radio = document.getElementById('payment-24');
    var calcPrice = document.getElementById('calc-price');

    var monthlyFeeValue = monthlyFeeInput && monthlyFeeInput.value;
    var monthlyFee = monthlyFeeValue ? parseFloat(monthlyFeeValue) : 595;
    var userFeeValue = userFeeInput && userFeeInput.value;
    var userFee = userFeeValue ? parseFloat(userFeeValue) : 88;

    var payTerms = 12;
    var nbrUsers = 20;
    var tracked = false;

    function on(element, event, handler) {
        if (element && event && handler) {
            element.addEventListener(event, handler);
        }
    }

    function trackEntry() {
        if (tracked || !mixpanel || !mixpanel.track) {
            return;
        }
        tracked = true;
        mixpanel.track('Pricing Calculator Input');
    }

    function updatePrice() {
        var factor = 1;
        if (payTerms >= 12) {
            if (payTerms === 12) {
                factor = factor * 0.9;
            } else if (payTerms === 24) {
                factor = factor * 0.85;
            }

            if (nbrUsers >= 100) {
                factor = factor * 0.95;
            } else if (nbrUsers >= 200) {
                factor = factor * 0.9;
            } else if (nbrUsers >= 500) {
                factor = factor * 0.85;
            }
        }
        var price = factor * (monthlyFee + nbrUsers * userFee);
        if (calcPrice) {
            calcPrice.textContent = Math.ceil(price);
        }
    }

    function handlePayChange(e) {
        trackEntry();
        if (pay0Radio.checked) {
            payTerms = 0;
        } else if (pay12Radio.checked) {
            payTerms = 12;
        } else {
            payTerms = 24;
        }
        updatePrice();
    }

    function handleUsersChange(e) {
        trackEntry();
        var value = e.target.value;
        if (value) {
            nbrUsers = parseInt(value, 10);
        }
        updatePrice();
    }

    on(nbrUsersInput, 'input', handleUsersChange);
    on(pay0Radio, 'click', handlePayChange);
    on(pay12Radio, 'click', handlePayChange);
    on(pay24Radio, 'click', handlePayChange);

    on(priceForm, 'submit', function (e) {
        e.preventDefault();
    });

    updatePrice();
})(document);

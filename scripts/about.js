function CaptchaEntered(response) {
    if (ValidateResponse(response)) {
        document.getElementById('recaptcha').style.display = 'none';

        document.getElementById('cvlink').innerHTML = "<a href=\"../files/Lewis Antony Jones - CV.pdf\">Download PDF</a>";
        document.getElementById('cvviewer').innerHTML =
            "<object data=\"../files/Lewis Antony Jones - CV.pdf\" type=\"application/pdf\" border=\"1px\" style=\"width:100%\" width=\"1000\" height=\"500\">\
            <embed src=\"../files/Lewis Antony Jones - CV.pdf\" type=\"application/pdf\" style=\"width:100%\" width=\"1000\" height=\"500\" />\
        </object>";
    } else {
        grecaptcha.reset();
    }
}

function ValidateResponse() {
    //The reCAPTCHA widget only sends valid responses
    return true;
}
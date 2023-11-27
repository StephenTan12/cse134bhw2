const COMMENTS_PATTERN = "^[a-zA-Z0-9.,?!:;' \-]*$";
const COMMENTS_MAX_LENGTH = 300;
const COMMENTS_CHAR_ERROR = "Non-typical characters are not allowed!";
const COMMENTS_LENGTH_ERROR = "Max Character Count!";

const form = document.getElementById("form");
const comments = document.getElementById("comments");
const commentsError = document.getElementsByClassName("error")[0];
const commentsInformation = document.getElementsByClassName("information")[0];

const form_errors = {
    "max_length": false,
    "invalid_chars": false
};

let flashInterval;

function clearErrors() {
    commentsError.classList.add("flash");
}

function updateError() {
    let errorText = "";
    if (form_errors.max_length) {
        errorText = `${errorText}\n${COMMENTS_LENGTH_ERROR}`;
        commentsError.textContent = errorText;
    }
}

function handleComments(event) {
    commentsError.textContent = "";
    commentsError.classList.remove("flash");
    clearInterval(flashInterval);

    const commentsValue = comments.value
    
    if (!commentsValue.match(COMMENTS_PATTERN)) {
        form_errors.invalid_chars = true;
        
        commentsError.textContent = COMMENTS_CHAR_ERROR;
        flashInterval = setInterval(clearErrors, 1000);
    } else {
        form_errors.invalid_chars = false; 
    }

    const remainingCharacterCount = COMMENTS_MAX_LENGTH-commentsValue.length;

    if (remainingCharacterCount == 0) {
        form_errors.max_length = true;
        comments.classList.add("char-error");
    } else if (remainingCharacterCount <= 20) {
        form_errors.max_length = false;
        comments.classList.add("char-error");
    } else {
        form_errors.max_length = false;
        comments.classList.remove("char-error");
    }
    
    updateError();
    commentsInformation.textContent = `Remaining Characters: ${remainingCharacterCount}`
}

function handleError(event) {
    commentsError.textContent = "";
}

function updateFormData(event) {
    const formData = event.formData;
    formData.set("form_errors", JSON.stringify(form_errors))
    console.log(formData);
}

comments.addEventListener("input", handleComments);
commentsError.addEventListener("animationend", handleError);
form.addEventListener("formdata", updateFormData);
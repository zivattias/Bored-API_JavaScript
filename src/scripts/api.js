const API_URL = "http://www.boredapi.com/api/activity/"

// Enable Bootstrap's tooltip utility - currently unneeded:
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

// Adding an eventListener for window to finish loading, then run DOM-manipulating functions:
window.addEventListener("load", () => {
    changeParticipantsNumber();
    isFreeCheckboxHandler();
})

// Change number of participants on range input:
function changeParticipantsNumber() {
    const participantsForm = document.getElementById("apiForm")
    const participantsNumber = document.getElementById("numParNumber")
    const participantsRange = document.getElementById("numPar")

    participantsRange.addEventListener("input", () => {
        participantsNumber.innerHTML = participantsRange.value
    })
    // Added an eventListener to the form to prevent span-text bug (showed previous # of participants despite 'reset'):
    participantsForm.addEventListener("reset", () => {
        participantsNumber.innerHTML = "1";
        participantsRange.value = "1";
    })
}

function isFreeCheckboxHandler() {
    const checkbox = document.getElementById("isFree");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            checkbox.value = "0.0"
        } else {
            checkbox.value = ""
        }
    })
    // Second if-else option (one-liner using the ternary operator:
    // const checkbox = document.getElementById("isFree");
    // checkbox.addEventListener("change", () => {
    //     checkbox.value = checkbox.checked ? "0.0" : "";
    // })
}


// Form submit handler & Fetch API:
function formSubmitHandler(event) {
    event.preventDefault()
    fd = new FormData(event.target)
    console.log(fd)
    for (const pair of fd.entries()) {
        // Bored API query param for 'type' should be lowercased:
        if (pair[0] === 'type') {
            pair[1] = pair[1].toLowerCase()
        }
        console.log(pair)
    }

}
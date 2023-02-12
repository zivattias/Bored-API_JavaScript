// Enable Bootstrap's tooltip utility - currently unneeded:
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

// Adding an eventListener for window to finish loading, then run DOM-manipulating functions:
window.addEventListener("load", () => {
    changeParticipantsNumber();
    isFreeCheckboxHandler();
})

// Fetch API functionality:
function getActivity(event) {
    event.preventDefault()
    let apiURL = "https://www.boredapi.com/api/activity?"
    const form = document.getElementById("apiForm")
    // Disable form fields while request is in the works:
    form.querySelectorAll('input, button, select').forEach((field) => {
        field.setAttribute('disabled', true)
    })
    formData = new FormData(event.target)
    let queryString = Array.from(formData.entries())
        .map(([key, value]) => `${key}=${value.toLowerCase()}`)
        .join('&')
    apiURL += queryString
    fetch(`${apiURL}`)
        .then((response) => response.json())
        .then((data) => {
            const alert = document.getElementById("errorAlert")
            if ("error" in data) {
                alert.classList.remove("alert-success")
                alert.classList.add("alert-danger")
                alert.innerHTML = "No activity found with the specified parameters, please try again."
                alert.classList.remove("d-none")
            } else {
                // Alert presentation:
                alert.classList.remove("alert-danger")
                alert.classList.add("alert-success")
                alert.innerHTML = "Successfully added activity!"
                alert.classList.remove("d-none")
                // Add activity data to Activity List:
                const item = document.createElement("li")
                const activityText = document.createElement("p")
                const del_button = document.createElement("button")

                activityText.setAttribute('class', 'h6 d-inline m-0')
                del_button.setAttribute('type', 'button')
                del_button.setAttribute('aria-label', 'Close')
                del_button.setAttribute('class', 'btn btn-outline-dark btn-sm')
                del_button.innerHTML = 'X'
                del_button.setAttribute('onclick', 'removeItemFromList(this)')

                item.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
                if (data.price > 0.0) {
                    activityText.innerHTML = `${data.activity}, up to ${data.participants} people. Price: ${data.price * 100}%`
                } else {
                    activityText.innerHTML = `${data.activity}, up to ${data.participants} people.`
                }
                item.appendChild(activityText)
                item.appendChild(del_button)
                const activityList = document.getElementById("activityList");
                activityList.insertBefore(item, activityList.firstChild);
                // Enable form fields once request has been completed:
                form.querySelectorAll('input, button, select').forEach((field) => {
                    field.removeAttribute('disabled');
                })
            }
        })
}

// Change number of participants on range input:
function changeParticipantsNumber() {
    const participantsNumber = document.getElementById("numParNumber")
    const participantsRange = document.getElementById("numPar")
    const participantsForm = document.getElementById("apiForm")

    participantsRange.addEventListener("input", () => {
        participantsNumber.innerHTML = participantsRange.value
    })
    // Added an eventListener to the form to prevent span-text bug (showed previous # of participants despite 'reset'):
    participantsForm.addEventListener("reset", () => {
        participantsNumber.innerHTML = "1";
        participantsRange.value = "1";
    })
}

// Adjust 'price' API query param according to isFree checkbox function:
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

// Delete button functionality:
function removeItemFromList(btn) {
    parentItem = btn.parentNode
    parentItem.remove()
}
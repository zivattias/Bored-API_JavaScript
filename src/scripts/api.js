// Enable Bootstrap's tooltip utility:
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

const rangeInput = document.getElementById("customRange2");
const rangeHandle = document.querySelector(".range-handle");

rangeInput.addEventListener("input", function () {
    const rangeValue = rangeInput.value;
    rangeHandle.setAttribute("title", rangeValue);
});
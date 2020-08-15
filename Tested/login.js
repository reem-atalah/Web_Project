var buttToggled = document.getElementsByClassName("item")[0]
var slideToggled = document.getElementsByClassName("course-list")[0]

function toggle() {
    if (slideToggled.style.display === "flex") {
        slideToggled.style.display = "none";
    } else {
        slideToggled.style.display = "flex";
    }
}
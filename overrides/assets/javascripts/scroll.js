var heading = document.getElementsByClassName("heading")[0]
var subHeading = document.getElementsByClassName("subheading")[0]

const defaultSubheadingFontSize = subHeading.style.fontSize;

// trigger this function every time the user scrolls
window.onscroll = function (event) {
    var scroll = window.pageYOffset;
    var windowWidth = window.innerWidth;

    if ((scroll > 1) && (windowWidth > 1000)) {
        heading.style.color = "black";
        heading.style.transition = ".5s";
        subHeading.style.color = "#ff5252";
        subHeading.style.transition = "cubic-bezier(.165,.84,.44,1) 1.5s";
        subHeading.style.fontSize = "1.5rem";

    } else if (windowWidth > 1000) {
        heading.style.color = "white";
        subHeading.style.fontSize = defaultSubheadingFontSize;
        heading.style.transition = "0.5s";
        subHeading.style.transition = "0.5s";
    }
}

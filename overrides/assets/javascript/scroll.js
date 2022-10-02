var heading = document.getElementsByClassName("heading")[0]
var subHeading = document.getElementsByClassName("subheading")[0]

const defaultHeadingColor = heading.style.color;
const defaultSubheadingFontSize = subHeading.style.fontSize;


// trigger this function every time the user scrolls
window.onscroll = function (event) {
    var scroll = window.pageYOffset;
    if (scroll > 1) {
        // green
        heading.style.color = "black";
        heading.style.transition = "1s";

        subHeading.style.color = "#ff5252"; //"white";
        subHeading.style.transition = "1.5s";
        subHeading.style.fontSize = "1.25rem";
        
    } else
    {
        heading.style.color = defaultHeadingColor;
        subHeading.style.fontSize = defaultSubheadingFontSize;
    }
}
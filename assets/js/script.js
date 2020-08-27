// Toggle/hide mobile navbar
var mobile = document.getElementById("mobile-nav");
function toggleMobileNavbar() {
  if (mobile.style.display === "block") {
    mobile.style.display = "none";
  } else {
    mobile.style.display = "block";
  }
}

// If you resize the browser window after clicking on the menu button once, it will bug out still stay visible.
function hideMobileNavbar() {
  mobile.style.display = "none";
}
window.addEventListener("resize", hideMobileNavbar);

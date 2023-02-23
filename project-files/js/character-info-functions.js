function updateHealthNameInLocalStorage() {
    var children = document.getElementById("health-container");
    var healthName = children.querySelector("input").value;
    localStorage.setItem("healthName", healthName);
}

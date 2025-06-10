function loadHTML(id, url) {
    console.log("2nd");
    fetch(url)
        .then((response) => response.text())
        .then((data) => (document.getElementById(id).innerHTML = data))
        .catch((err) => console.error(err));
}

function loadTemplateWithPath(path) {
    console.log("1st");
    loadHTML("header-template", `${path}/hf/header.html`);
    loadHTML("footer-template", `${path}/hf/footer.html`);
}

window.loadTemplateWithPath = loadTemplateWithPath;





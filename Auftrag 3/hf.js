function loadHTML(id, url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => (document.getElementById(id).innerHTML = data))
        .catch((err) => console.error(err));
}

loadHTML("header-template", "/hf/header.html");
loadHTML("footer-template", "/hf/footer.html");

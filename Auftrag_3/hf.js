async function loadHTML(id, url) {
    await fetch(url)
        .then((response) => response.text())
        .then((data) => (document.getElementById(id).innerHTML = data))
        .catch((err) => console.error(err));

    return;
}

async function loadTemplateWithPath(path) {
    await loadHTML("header-template", `${path}/hf/header.html`);
    loadHTML("footer-template", `${path}/hf/footer.html`);
    document.getElementById("home").href = `${path}/`;
    document.getElementById("contact").href = `${path}/contact`;
}

window.loadTemplateWithPath = loadTemplateWithPath;
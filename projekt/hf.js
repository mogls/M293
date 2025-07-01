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
    const headerLinks = document.querySelectorAll("header a");
    for (var i = 0; i < headerLinks.length; i++) {
        const link = headerLinks[i]
        if (link.id === "home") {
            link.href = `${path}/`;
        } else {
            link.href = `${path}/${link.id}`;
        }
    }
}

window.loadTemplateWithPath = loadTemplateWithPath;

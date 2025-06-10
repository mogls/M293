function loadProject() {
    const hash = location.hash.slice(1); // remove '#'
    const match = hash.match(/^\/(\d+)$/); // match #/1, #/2, etc.
    const container = document.getElementById("project-view");
}

window.addEventListener("load", loadProject);
window.addEventListener("hashchange", loadProject);

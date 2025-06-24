function loadProject() {
    const hash = location.hash.slice(1); // remove '#'
    const match = hash.match(/^\/(\d+)$/); // match #/1, #/2, etc.
    const container = document.getElementById("project-view");

    if (match) {
        console.log("matched", match);
        const projectId = match[0];
        console.log(projectId);
        console.log(container);
        container.innerHTML = `<h1>Project ${projectId}</h1>`;
        // Here you can add more logic to load the project details
        // For example, you could fetch project data from an API or a local file
    } else {
        container.innerHTML = "<h1>Project Not Found</h1>";
    }
}

window.addEventListener("load", loadProject);
window.addEventListener("hashchange", loadProject);
window.addEventListener("DOMContentLoaded", loadProject);

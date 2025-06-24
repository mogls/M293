function loadProjectScript() {
    const hash = location.hash.slice(1); // remove '#'
    const match = hash.match(/^\/(\d+)$/); // match #/1, #/2, etc.
    const container = document.getElementById("project-view");

    if (match) {
        const projectId = match[0].slice(1);
        console.log("projectId: ", projectId);
        const script = document.createElement("script");
        script.src = `./projects/project_${projectId}.js`;

        script.onload = () => {
            container.innerHTML = loadProject();
        }

        document.head.appendChild(script)

    } else {
        container.innerHTML = "<h1>Project Not Found</h1>";
    }
}

window.addEventListener("load", loadProjectScript);
window.addEventListener("hashchange", loadProjectScript);
window.addEventListener("DOMContentLoaded", loadProjectScript);

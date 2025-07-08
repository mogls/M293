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
        };

        document.head.appendChild(script);
    }
}

async function fetchAllProjects() {
    const projects = document.getElementById("projects");
    let i = 1;
    while (true) {
        try {
            const response = await fetch(`./previews/preview${i}.html`);
            if (!response.ok) break;
            const data = await response.text();
            projects.innerHTML += data;
            i++;
        } catch (err) {
            break;
        }
    }
}

function filterProjectsByTag() {
    const selectedTag = document.getElementById("tag-filter").value;
    const projectsSection = document.getElementById("projects");
    const projectCards = projectsSection.querySelectorAll(".project");
    projectCards.forEach(card => {
        const tags = card.getAttribute("tags");
        if (selectedTag === "all" || (tags && tags.split(",").includes(selectedTag))) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Dynamically populate the tag filter dropdown based on tags in the projects section
function populateTagFilter() {
    const projectsSection = document.getElementById("projects");
    const projectCards = projectsSection.querySelectorAll(".project");
    const tagSet = new Set();
    projectCards.forEach(card => {
        const tags = card.getAttribute("tags");
        if (tags) {
            tags.split(",").forEach(tag => {
                tag = tag.trim(); 
                if (tag) tagSet.add(tag);
            });
        }
    });
    const tagFilter = document.getElementById("tag-filter");
    // Remove all options except 'All'
    tagFilter.options.length = 1;
    // Add unique tags as options
    Array.from(tagSet).sort().forEach(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

// Call populateTagFilter after projects are loaded
window.addEventListener("load", () => {
    fetchAllProjects().then(() => {
        populateTagFilter();
    });
});
window.addEventListener("load", loadProjectScript);
window.addEventListener("hashchange", loadProjectScript);
window.addEventListener("DOMContentLoaded", loadProjectScript);

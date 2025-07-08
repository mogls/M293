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

async function countFiles(dir) {
    try {
        const response = await fetch(dir);
        if (!response.ok) {
            throw new Error("Failed to fetch directory listing");
        }
        const text = await response.text();
        // Create a temporary DOM to parse the directory listing
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = text;
        // Find all links ending with .html (assuming previews are .html files)
        const links = Array.from(tempDiv.querySelectorAll("a")).filter((link) =>
            link.getAttribute("href").endsWith(".html")
        );
        return links.length;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function fetchAllProjects() {
    const previewCount = await countFiles("./previews/");
    const projects = document.getElementById("projects");
    for (let i = 1; i <= previewCount; i++) {
        await fetch(`./previews/preview${i}.html`)
            .then((response) => {
                console.log(response);
                return response.text();
            })
            .then((data) => (projects.innerHTML += data))
            .catch((err) => console.log(err));
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

document.addEventListener("DOMContentLoaded", function() {
    fetchProjectStructure();

    document.getElementById('searchInput').addEventListener('keyup', searchFunction);
});

function fetchProjectStructure() {
    fetch('../assets/documentation.json')
        .then(response => response.json())
        .then(data => renderProjectStructure(data))
        .catch(error => console.error('Error loading JSON:', error));
}

function renderProjectStructure(data) {
    const documentationContainer = document.getElementById('documentation');
    documentationContainer.innerHTML = '';
    data.forEach(item => {
        documentationContainer.appendChild(createNode(item));
    });
}

function createNode(item) {
    const element = document.createElement('div');
    element.className = item.children ? 'directory' : 'file';
    element.setAttribute('data-name', item.name.toLowerCase());
    element.setAttribute('data-description', item.description.toLowerCase());

    const header = document.createElement('div');
    header.textContent = item.name;
    header.className = 'cursor-pointer';
    element.appendChild(header);

    if (item.children) {
        const childrenContainer = createChildrenContainer(item.children);
        element.appendChild(childrenContainer);
        header.addEventListener('click', () => {
            childrenContainer.style.display = childrenContainer.style.display === 'none' ? 'block' : 'none';
        });
    } else {
        header.addEventListener('click', () => {
            displayDetails(item);
        });
    }

    return element;
}

function createChildrenContainer(children) {
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'children';
    children.forEach(child => {
        childrenContainer.appendChild(createNode(child));
    });
    return childrenContainer;
}

function displayDetails(item) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Purpose:</strong> ${item.details.purpose}</p>
        <div class="details">
            <p><strong>Content:</strong></p>
            <pre>${formatDetails(item.details.content)}</pre>
            <p><strong>Notes:</strong></p>
            <pre>${formatDetails(item.details.notes)}</pre>
        </div>
    `;
}

function formatDetails(details) {
    if (Array.isArray(details)) {
        return details.join('<br>');
    } else if (typeof details === 'object') {
        return JSON.stringify(details, null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    }
    return details;
}

function searchFunction() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const elements = document.querySelectorAll('#documentation .directory, #documentation .file');

    elements.forEach(element => {
        const name = element.getAttribute('data-name');
        const description = element.getAttribute('data-description');
        if (name.includes(input) || description.includes(input)) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

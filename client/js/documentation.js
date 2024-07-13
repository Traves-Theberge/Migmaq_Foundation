document.addEventListener("DOMContentLoaded", function() {
    fetchProjectStructure();

    document.getElementById('searchInput').addEventListener('keyup', searchFunction);
    initializeResizer();
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
            <pre>${typeof item.details.content === 'object' 
                ? JSON.stringify(item.details.content, null, 2) 
                : item.details.content.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
            </pre>
            <p><strong>Notes:</strong> ${item.details.notes}</p>
        </div>
    `;
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

function initializeResizer() {
    const resizer = document.getElementById('resizer');
    const sidebar = document.getElementById('sidebar');
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resizeSidebar);
        document.addEventListener('mouseup', stopResizing);
    });

    function resizeSidebar(e) {
        if (!isResizing) return;
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 400) {
            sidebar.style.width = newWidth + 'px';
        }
    }

    function stopResizing() {
        isResizing = false;
        document.removeEventListener('mousemove', resizeSidebar);
        document.removeEventListener('mouseup', stopResizing);
    }
}

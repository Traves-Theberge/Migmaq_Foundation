document.addEventListener('DOMContentLoaded', function() {
    const wordDetailsContainer = document.getElementById('word-details-container');
    const aiFactContainer = document.getElementById('ai-fact-container');
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const urlParams = new URLSearchParams(window.location.search);
    const word = urlParams.get('word');
    const wordIdInput = document.getElementById('word_id');

    wordIdInput.value = word;

    function fetchWordDetails(word) {
        fetch(`/api/word-details?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(data => {
                displayWordDetails(data);
                fetchAIFact(word);
                fetchComments(word);
            })
            .catch(error => {
                console.error('Error fetching word details:', error);
                wordDetailsContainer.innerHTML = '<p class="text-red-500">Error fetching word details. Please try again later.</p>';
            });
    }

    function fetchAIFact(word) {
        fetch(`/api/fact?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(data => {
                displayAIFact(data.fact);
            })
            .catch(error => {
                console.error('Error fetching AI fact:', error);
                aiFactContainer.innerHTML = '<p class="text-red-500">Error fetching AI fact. Please try again later.</p>';
            });
    }

    function fetchComments(word_id) {
        fetch(`/api/comments?word_id=${encodeURIComponent(word_id)}`)
            .then(response => response.json())
            .then(data => {
                displayComments(data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                commentsContainer.innerHTML = '<p class="text-red-500">Error fetching comments. Please try again later.</p>';
            });
    }

    function displayWordDetails(word) {
        wordDetailsContainer.innerHTML = `
            <h3 class="text-3xl font-extrabold mb-6 text-white">${word.word}</h3>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Part of Speech:</p>
                <p class="text-xl">${word.type}</p>
            </div>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Definitions:</p>
                <p class="text-xl">${word.definitions.join(', ')}</p>
            </div>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Translations:</p>
                <div class="space-y-4">
                    ${word.usages.map(usage => `
                        <div class="mb-6">
                            <p class="text-xl font-semibold mb-2">Mi'gmaq:</p>
                            <p class="text-xl mb-4">${usage.translation}</p>
                            <p class="text-xl font-semibold mb-2">English:</p>
                            <p class="text-xl">${usage.english}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function displayAIFact(fact) {
        aiFactContainer.innerHTML = `
            <p class="text-xl">${fact}</p>
        `;
    }

    function displayComments(comments, container = commentsContainer) {
        container.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment', 'mb-4', 'bg-gray-800', 'p-4', 'rounded-md');
            commentDiv.innerHTML = `
                <p class="text-xl font-semibold">${comment.name}</p>
                <p class="text-gray-500 text-sm">${new Date(comment.created_at).toLocaleString()}</p>
                <p class="mt-2">${comment.content}</p>
                <button class="reply-button text-blue-500 text-sm mt-2">Reply</button>
                <div class="replies ml-4 mt-4"></div>
            `;
            container.appendChild(commentDiv);

            const repliesContainer = commentDiv.querySelector('.replies');
            if (comment.replies && comment.replies.length > 0) {
                displayComments(comment.replies, repliesContainer);
            }

            const replyButton = commentDiv.querySelector('.reply-button');
            replyButton.addEventListener('click', () => {
                const parent_id = comment.id;
                const replyForm = createReplyForm(parent_id);
                repliesContainer.appendChild(replyForm);
            });
        });
    }

    function createReplyForm(parent_id) {
        const form = document.createElement('form');
        form.classList.add('reply-form', 'mt-4');
        form.innerHTML = `
            <input type="hidden" name="parent_id" value="${parent_id}">
            <input type="hidden" name="word_id" value="${wordIdInput.value}">
            <div class="mb-4">
                <input type="text" name="name" placeholder="Your Name" class="px-4 py-2 border-2 border-gray-600 bg-gray-800 rounded-md w-full">
            </div>
            <div class="mb-4">
                <input type="email" name="email" placeholder="Your Email" class="px-4 py-2 border-2 border-gray-600 bg-gray-800 rounded-md w-full">
            </div>
            <div class="mb-4">
                <textarea name="content" placeholder="Your Comment" class="px-4 py-2 border-2 border-gray-600 bg-gray-800 rounded-md w-full" rows="4"></textarea>
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300">Submit Comment</button>
        `;

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const commentData = {
                word_id: formData.get('word_id'),
                parent_id: formData.get('parent_id') || null,
                name: formData.get('name'),
                email: formData.get('email'),
                content: formData.get('content')
            };

            fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            })
                .then(response => response.json())
                .then(data => {
                    form.remove();
                    fetchComments(word);
                })
                .catch(error => {
                    console.error('Error adding comment:', error);
                });
        });

        return form;
    }

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(commentForm);
        const commentData = {
            word_id: formData.get('word_id'),
            parent_id: formData.get('parent_id') || null,
            name: formData.get('name'),
            email: formData.get('email'),
            content: formData.get('content')
        };

        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(response => response.json())
            .then(data => {
                commentForm.reset();
                fetchComments(word);
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    });

    if (word) {
        fetchWordDetails(word);
    } else {
        wordDetailsContainer.innerHTML = '<p class="text-red-500">No word specified. Please go back and select a word.</p>';
    }
});

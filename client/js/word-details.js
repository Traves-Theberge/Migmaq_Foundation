document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const word = queryParams.get('word');

    if (!word) {
        console.error('No word parameter found in URL.');
        return;
    }

    const wordDetailsContainer = document.getElementById('word-details-container');
    const aiFactContainer = document.getElementById('ai-fact-container');
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const wordIdInput = document.getElementById('word_id');
    const parentIdInput = document.getElementById('parent_id');

    if (word) {
        wordIdInput.value = word;
    }

    fetch(`/api/word-details?word=${encodeURIComponent(word)}`)
        .then(response => response.json())
        .then(wordDetails => {
            displayWordDetails(wordDetails);
            fetchComments(word);
        })
        .catch(error => {
            console.error('Error fetching word details:', error);
            displayError();
        });

    function displayWordDetails(wordDetails) {
        const wordHTML = `
            <div class="word-item">
                <div class="p-6 text-white">
                    <h2 class="text-xl font-semibold mb-4">${wordDetails.word}</h2>
                    <div class="mb-4">
                        <strong class="block text-white-600 mb-2">Part of Speech:</strong>
                        <span class="block">${wordDetails.type}</span>
                    </div>
                    <div class="mb-4">
                        <strong class="block text-white-600 mb-2">English Definitions:</strong>
                        <ul class="list-disc list-inside">
                            ${wordDetails.definitions.map(def => `<li>${def}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <strong class="block text-white-600 mb-2">Translations:</strong>
                        <ul>
                            ${wordDetails.usages.map(usage => `
                                <li>
                                    <strong>Mi'gmaq Translation:</strong> ${usage.translation}<br>
                                    <strong>English Translation:</strong> ${usage.english}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        wordDetailsContainer.innerHTML = wordHTML;
    }

    function displayError() {
        wordDetailsContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching word details. Please try again later.</p>';
    }

    function fetchComments(wordId) {
        fetch(`/api/comments?word_id=${encodeURIComponent(wordId)}`)
            .then(response => response.json())
            .then(comments => {
                const nestedComments = buildNestedComments(comments);
                displayComments(nestedComments);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                commentsContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching comments. Please try again later.</p>';
            });
    }

    function buildNestedComments(comments) {
        const commentMap = {};
        comments.forEach(comment => {
            comment.replies = [];
            commentMap[comment.id] = comment;
        });

        const nestedComments = [];
        comments.forEach(comment => {
            if (comment.parent_id) {
                commentMap[comment.parent_id].replies.push(comment);
            } else {
                nestedComments.push(comment);
            }
        });

        return nestedComments;
    }

    function displayComments(comments, parentElement = null, level = 0) {
        const commentsList = parentElement || document.createElement('ul');
        commentsContainer.appendChild(commentsList);
        if (parentElement === null) commentsList.innerHTML = '';

        comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.classList.add('bg-gray-800', 'p-4', 'rounded-md', 'text-white', 'mt-4', 'comment-item', 'flex', 'flex-col', 'space-y-2');
            if (level > 0) {
                commentItem.classList.add('ml-12', 'border-l-2', 'border-gray-700', 'pl-4');
            }

            const avatar = generateAvatar(comment.name);
            const commentHeader = document.createElement('div');
            commentHeader.classList.add('flex', 'items-start', 'space-x-4');

            const avatarWrapper = document.createElement('div');
            avatarWrapper.innerHTML = avatar;
            commentHeader.appendChild(avatarWrapper);

            const commentContent = document.createElement('div');
            commentContent.classList.add('flex', 'flex-col', 'space-y-1', 'flex-grow');

            const commentAuthor = document.createElement('div');
            commentAuthor.classList.add('flex', 'items-center', 'justify-between', 'mt-1');

            const authorNameDate = document.createElement('div');
            authorNameDate.classList.add('flex', 'flex-col');

            const authorName = document.createElement('p');
            authorName.classList.add('text-md', 'font-semibold');
            authorName.textContent = comment.name;

            const commentDate = document.createElement('p');
            commentDate.classList.add('text-sm', 'text-gray-400');
            commentDate.textContent = new Date(comment.created_at).toLocaleString();

            authorNameDate.appendChild(authorName);
            authorNameDate.appendChild(commentDate);

            commentAuthor.appendChild(authorNameDate);

            const commentText = document.createElement('p');
            commentText.classList.add('text-lg', 'font-medium');
            commentText.textContent = comment.content;

            commentContent.appendChild(commentAuthor);
            commentContent.appendChild(commentText);

            commentHeader.appendChild(commentContent);
            commentItem.appendChild(commentHeader);

            const replyButton = document.createElement('button');
            replyButton.classList.add('reply-button', 'mt-2', 'text-blue-400', 'hover:text-blue-300', 'transition', 'duration-200', 'self-start');
            replyButton.setAttribute('data-comment-id', comment.id);
            replyButton.textContent = 'Reply';

            const replyForm = document.createElement('form');
            replyForm.classList.add('reply-form', 'hidden', 'mt-2', 'flex', 'flex-col', 'space-y-2');
            replyForm.setAttribute('data-comment-id', comment.id);

            const replyName = document.createElement('input');
            replyName.classList.add('reply-name', 'w-full', 'p-2', 'rounded-md', 'bg-gray-900', 'text-white');
            replyName.setAttribute('type', 'text');
            replyName.setAttribute('placeholder', 'Your Name');
            replyName.required = true;

            const replyEmail = document.createElement('input');
            replyEmail.classList.add('reply-email', 'w-full', 'p-2', 'rounded-md', 'bg-gray-900', 'text-white');
            replyEmail.setAttribute('type', 'email');
            replyEmail.setAttribute('placeholder', 'Your Email');
            replyEmail.required = true;

            const replyContent = document.createElement('textarea');
            replyContent.classList.add('reply-content', 'w-full', 'p-2', 'rounded-md', 'bg-gray-900', 'text-white');
            replyContent.setAttribute('placeholder', 'Write a reply...');
            replyContent.required = true;

            const replySubmitButton = document.createElement('button');
            replySubmitButton.classList.add('mt-2', 'px-4', 'py-2', 'bg-blue-600', 'text-white', 'rounded-md', 'hover:bg-blue-500', 'transition-colors', 'duration-300');
            replySubmitButton.setAttribute('type', 'submit');
            replySubmitButton.textContent = 'Post Reply';

            replyForm.appendChild(replyName);
            replyForm.appendChild(replyEmail);
            replyForm.appendChild(replyContent);
            replyForm.appendChild(replySubmitButton);

            replyButton.addEventListener('click', () => {
                replyForm.classList.toggle('hidden');
            });

            replyForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const commentId = this.getAttribute('data-comment-id');
                const replyNameValue = this.querySelector('.reply-name').value;
                const replyEmailValue = this.querySelector('.reply-email').value;
                const replyContentValue = this.querySelector('.reply-content').value;
                if (replyNameValue.trim() && replyEmailValue.trim() && replyContentValue.trim()) {
                    postComment(word, commentId, replyNameValue, replyEmailValue, replyContentValue);
                }
            });

            commentItem.appendChild(replyButton);
            commentItem.appendChild(replyForm);

            commentsList.appendChild(commentItem);

            if (comment.replies.length > 0) {
                const replyList = document.createElement('ul');
                commentItem.appendChild(replyList);
                displayComments(comment.replies, replyList, level + 1);
            }
        });
    }

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentName = document.getElementById('name').value;
        const commentEmail = document.getElementById('email').value;
        const commentContent = document.getElementById('content').value;
        const wordId = wordIdInput.value;
        const parentId = parentIdInput.value || null;

        if (commentName.trim() && commentEmail.trim() && commentContent.trim()) {
            postComment(wordId, parentId, commentName, commentEmail, commentContent);
        } else {
            alert('All fields are required.');
        }
    });

    function postComment(wordId, parentId, name, email, content) {
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word_id: wordId, parent_id: parentId, name, email, content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            fetchComments(wordId);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('content').value = '';
            parentIdInput.value = '';
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
    }

    function generateAvatar(name) {
        const firstLetter = name.charAt(0).toUpperCase();
        const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        const color = colors[firstLetter.charCodeAt(0) % colors.length];
        return `
            <div class="avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${color};">
                ${firstLetter}
            </div>
        `;
    }
});
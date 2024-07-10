document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const word = queryParams.get('word'); // Get the 'word' query parameter from the URL

    if (!word) {
        console.error('No word parameter found in URL.');
        return;
    }

    // Get references to various HTML elements
    const wordDetailsContainer = document.getElementById('word-details-container');
    const aiFactContainer = document.getElementById('ai-fact-container');
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const wordIdInput = document.getElementById('word_id');
    const parentIdInput = document.getElementById('parent_id');

    if (word) {
        wordIdInput.value = word; // Set the wordId input value
    }

    // Fetch and display word details, comments, and AI fact
    fetchWordDetails(word);
    fetchComments(word);
    fetchAiFact(word);

    // Add event listeners for comment form and reply button clicks
    commentForm.addEventListener('submit', handleCommentSubmit);
    commentsContainer.addEventListener('click', handleReplyButtonClick);
    commentsContainer.addEventListener('submit', handleReplyFormSubmit);

    // Function to fetch word details from the server
    function fetchWordDetails(word) {
        fetch(`/api/word-details?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(wordDetails => displayWordDetails(wordDetails))
            .catch(error => {
                console.error('Error fetching word details:', error);
                displayError();
            });
    }

    // Function to fetch AI fact from the server
    function fetchAiFact(word) {
        fetch(`/api/fact?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(data => displayAiFact(data.fact))
            .catch(error => {
                console.error('Error fetching AI fact:', error);
                aiFactContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching AI fact. Please try again later.</p>';
            });
    }

    // Function to display word details in the HTML
    function displayWordDetails(wordDetails) {
        const wordHTML = `
            <div class="word-item p-6 text-white">
                <h2 class="text-3xl font-bold mb-6 text-center">${wordDetails.word}</h2>
                <div class="mb-6">
                    <strong class="block text-xl text-white-600 mb-3">Part of Speech:</strong>
                    <span class="block text-lg">${wordDetails.type}</span>
                </div>
                <div class="mb-6">
                    <strong class="block text-xl text-white-600 mb-3">English Definitions:</strong>
                    <ul class="list-disc list-inside text-lg">
                        ${wordDetails.definitions.map(def => `<li>${def}</li>`).join('')}
                    </ul>
                </div>
                <div class="mb-6">
                    <strong class="block text-xl text-white-600 mb-3">Translations:</strong>
                    <ul class="text-lg">
                        ${wordDetails.usages.map(usage => `
                            <li class="mb-4">
                                <strong>Mi'gmaq Translation:</strong> ${usage.translation}<br>
                                <strong>English Translation:</strong> ${usage.english}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        wordDetailsContainer.innerHTML = wordHTML;
    }

    // Function to display AI fact in the HTML
    function displayAiFact(fact) {
        aiFactContainer.innerHTML = `<p class="text-2xl font-medium text-center">${fact}</p>`;
    }

    // Function to display an error message
    function displayError() {
        wordDetailsContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching word details. Please try again later.</p>';
    }

    // Function to fetch comments from the server
    function fetchComments(wordId) {
        fetch(`/api/comments?word_id=${encodeURIComponent(wordId)}`)
            .then(response => response.json())
            .then(comments => {
                commentsContainer.innerHTML = ''; // Clear previous comments
                const nestedComments = buildNestedComments(comments);
                displayComments(nestedComments);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                commentsContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching comments. Please try again later.</p>';
            });
    }

    // Function to build nested comments structure
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

    // Function to display comments in the HTML
    function displayComments(comments, parentElement = null, level = 0) {
        const commentsList = parentElement || document.createElement('ul');
        if (!parentElement) commentsContainer.appendChild(commentsList);

        comments.forEach(comment => {
            const commentItem = createCommentItem(comment, level);
            commentsList.appendChild(commentItem);
            if (comment.replies.length > 0) {
                const replyList = document.createElement('ul');
                commentItem.appendChild(replyList);
                displayComments(comment.replies, replyList, level + 1);
            }
        });
    }

    // Function to create a comment item in the HTML
    function createCommentItem(comment, level) {
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
        authorName.classList.add('flex','text-lg', 'font-semibold');
        authorName.textContent = comment.name;

        const commentDate = document.createElement('p');
        commentDate.classList.add('text-sm', 'text-gray-400');
        commentDate.textContent = new Date(comment.created_at).toLocaleString(); // Format the timestamp to local time

        authorNameDate.appendChild(authorName);
        authorNameDate.appendChild(commentDate);

        commentAuthor.appendChild(authorNameDate);

        const commentText = document.createElement('p');
        commentText.classList.add('flex','text-lg', 'font-medium');
        commentText.textContent = comment.content;

        commentContent.appendChild(commentAuthor);
        commentContent.appendChild(commentText);

        commentHeader.appendChild(commentContent);
        commentItem.appendChild(commentHeader);

        const replyButton = document.createElement('button');
        replyButton.classList.add('reply-button', 'mt-2', 'text-blue-400', 'hover:text-blue-300', 'transition', 'duration-200', 'self-start');
        replyButton.setAttribute('data-comment-id', comment.id);
        replyButton.textContent = 'Reply';

        const replyForm = createReplyForm(comment.id);

        commentItem.appendChild(replyButton);
        commentItem.appendChild(replyForm);

        return commentItem;
    }

    // Function to create a reply form for a comment
    function createReplyForm(commentId) {
        const replyForm = document.createElement('form');
        replyForm.classList.add('reply-form', 'hidden', 'mt-2', 'flex', 'flex-col', 'space-y-2');
        replyForm.setAttribute('data-comment-id', commentId);

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

        return replyForm;
    }

    // Function to handle the comment form submission
    function handleCommentSubmit(event) {
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
    }

    // Function to handle reply button click
    function handleReplyButtonClick(event) {
        if (event.target.classList.contains('reply-button')) {
            const replyForm = event.target.nextElementSibling;
            replyForm.classList.toggle('hidden');
        }
    }

    // Function to handle the reply form submission
    function handleReplyFormSubmit(event) {
        if (event.target.classList.contains('reply-form')) {
            event.preventDefault();
            const commentId = event.target.getAttribute('data-comment-id');
            const replyNameValue = event.target.querySelector('.reply-name').value;
            const replyEmailValue = event.target.querySelector('.reply-email').value;
            const replyContentValue = event.target.querySelector('.reply-content').value;
            if (replyNameValue.trim() && replyEmailValue.trim() && replyContentValue.trim()) {
                postComment(word, commentId, replyNameValue, replyEmailValue, replyContentValue);
                clearForm(event.target); // Clear and hide the form after posting
            }
        }
    }

    // Function to post a new comment to the server
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
            // Ensure the new comment has a replies property
            const newComment = {
                ...data,
                replies: []
            };
            appendNewComment(newComment);
            clearForm(commentForm); // Clear the main comment form
            parentIdInput.value = '';
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
    }

    // Function to clear and hide a form
    function clearForm(form) {
        form.reset();
        form.classList.add('hidden');
    }

    // Function to append a new comment to the DOM
    function appendNewComment(comment) {
        // Find the parent comment if it exists
        if (comment.parent_id) {
            const parentCommentElement = document.querySelector(`button[data-comment-id="${comment.parent_id}"]`).closest('li');
            const replyList = parentCommentElement.querySelector('ul') || document.createElement('ul');
            parentCommentElement.appendChild(replyList);
            displayComments([comment], replyList);
        } else {
            // Append as a new top-level comment
            const nestedComments = buildNestedComments([comment]);
            displayComments(nestedComments);
        }
    }

    // Function to generate an avatar based on the user's name
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

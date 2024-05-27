function setupLikeDislikeButtons(postElement) {
    const thumbsUpButton = postElement.querySelector('.thumbs-up-btn');
    const thumbsDownButton = postElement.querySelector('.thumbs-down-btn');
    const likeCount = postElement.querySelectorAll('.post-rating-count')[0];
    const dislikeCount = postElement.querySelectorAll('.post-rating-count')[1];

    const postId = postElement.dataset.index;
    const username = localStorage.getItem("username");
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
    const userDislikes = JSON.parse(localStorage.getItem('userDislikes')) || {};

    if (userLikes[postId]) {
        thumbsUpButton.classList.add('clicked');
        thumbsDownButton.disabled = true;
    }
    if (userDislikes[postId]) {
        thumbsDownButton.classList.add('clicked');
        thumbsUpButton.disabled = true;
    }

    thumbsUpButton.addEventListener('click', async () => {
        if (thumbsUpButton.classList.contains('clicked')) {
            likeCount.textContent = Number(likeCount.textContent) - 1;
            thumbsUpButton.classList.remove('clicked');
            thumbsDownButton.disabled = false;
            delete userLikes[postId];
            localStorage.setItem('userLikes', JSON.stringify(userLikes));
            await fetch(`/posts/${postId}/unlike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
        } else {
            likeCount.textContent = Number(likeCount.textContent) + 1;
            thumbsUpButton.classList.add('clicked');
            thumbsDownButton.disabled = true;
            userLikes[postId] = true;
            localStorage.setItem('userLikes', JSON.stringify(userLikes));
            await fetch(`/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
        }
    });

    thumbsDownButton.addEventListener('click', async () => {
        if (thumbsDownButton.classList.contains('clicked')) {
            dislikeCount.textContent = Number(dislikeCount.textContent) - 1;
            thumbsDownButton.classList.remove('clicked');
            thumbsUpButton.disabled = false;
            delete userDislikes[postId];
            localStorage.setItem('userDislikes', JSON.stringify(userDislikes));
            await fetch(`/posts/${postId}/undislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
        } else {
            dislikeCount.textContent = Number(dislikeCount.textContent) + 1;
            thumbsDownButton.classList.add('clicked');
            thumbsUpButton.disabled = true;
            userDislikes[postId] = true;
            localStorage.setItem('userDislikes', JSON.stringify(userDislikes));
            await fetch(`/posts/${postId}/dislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
        }
    });
}

module.exports = { setupLikeDislikeButtons };

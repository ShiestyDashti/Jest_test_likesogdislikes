function handleLike(postElement) {
    const likeButton = postElement.querySelector('.thumbs-up-btn');
    const dislikeButton = postElement.querySelector('.thumbs-down-btn');
    const likeCount = postElement.querySelector('.like-count');
    const dislikeCount = postElement.querySelector('.dislike-count');
    const username = 'testUser'; // Replace with actual username logic if available

    likeButton.addEventListener('click', async () => {
        if (likeButton.classList.contains('clicked')) {
            likeCount.textContent = Number(likeCount.textContent) - 1;
            likeButton.classList.remove('clicked');
            dislikeButton.disabled = false;
        } else {
            likeCount.textContent = Number(likeCount.textContent) + 1;
            likeButton.classList.add('clicked');
            dislikeButton.disabled = true;
        }
    });
}

function handleDislike(postElement) {
    const likeButton = postElement.querySelector('.thumbs-up-btn');
    const dislikeButton = postElement.querySelector('.thumbs-down-btn');
    const likeCount = postElement.querySelector('.like-count');
    const dislikeCount = postElement.querySelector('.dislike-count');
    const username = 'testUser'; // Replace with actual username logic if available

    dislikeButton.addEventListener('click', async () => {
        if (dislikeButton.classList.contains('clicked')) {
            dislikeCount.textContent = Number(dislikeCount.textContent) - 1;
            dislikeButton.classList.remove('clicked');
            likeButton.disabled = false;
        } else {
            dislikeCount.textContent = Number(dislikeCount.textContent) + 1;
            dislikeButton.classList.add('clicked');
            likeButton.disabled = true;
        }
    });
}

module.exports = { handleLike, handleDislike };

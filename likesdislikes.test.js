const { JSDOM } = require('jsdom');
const { handleLike, handleDislike } = require('./likedislike.js');

let document;
let window;
let container;

beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body><div class="container"></div></body></html>`);
    window = dom.window;
    document = window.document;

    container = document.querySelector('.container');

    global.document = document;
    global.window = window;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        })
    );
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Post like/dislike functionality', () => {
    test('should like a post', () => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.index = '1';

        const likeButton = document.createElement('button');
        likeButton.classList.add('thumbs-up-btn');
        likeButton.innerHTML = '&#128077;';
        postElement.appendChild(likeButton);

        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('thumbs-down-btn');
        dislikeButton.innerHTML = '&#128078;';
        postElement.appendChild(dislikeButton);

        const likeCount = document.createElement('span');
        likeCount.classList.add('like-count');
        likeCount.textContent = '0';
        postElement.appendChild(likeCount);

        const dislikeCount = document.createElement('span');
        dislikeCount.classList.add('dislike-count');
        dislikeCount.textContent = '0';
        postElement.appendChild(dislikeCount);

        container.appendChild(postElement);

        handleLike(postElement);
        handleDislike(postElement);

        likeButton.click();

        expect(likeButton.classList.contains('clicked')).toBe(true);
        expect(Number(likeCount.textContent)).toBe(1);
        expect(dislikeButton.disabled).toBe(true);

        likeButton.click();

        expect(likeButton.classList.contains('clicked')).toBe(false);
        expect(Number(likeCount.textContent)).toBe(0);
        expect(dislikeButton.disabled).toBe(false);
    });

    test('should dislike a post', () => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.index = '1';

        const likeButton = document.createElement('button');
        likeButton.classList.add('thumbs-up-btn');
        likeButton.innerHTML = '&#128077;';
        postElement.appendChild(likeButton);

        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('thumbs-down-btn');
        dislikeButton.innerHTML = '&#128078;';
        postElement.appendChild(dislikeButton);

        const likeCount = document.createElement('span');
        likeCount.classList.add('like-count');
        likeCount.textContent = '0';
        postElement.appendChild(likeCount);

        const dislikeCount = document.createElement('span');
        dislikeCount.classList.add('dislike-count');
        dislikeCount.textContent = '0';
        postElement.appendChild(dislikeCount);

        container.appendChild(postElement);

        handleLike(postElement);
        handleDislike(postElement);

        dislikeButton.click();

        expect(dislikeButton.classList.contains('clicked')).toBe(true);
        expect(Number(dislikeCount.textContent)).toBe(1);
        expect(likeButton.disabled).toBe(true);

        dislikeButton.click();

        expect(dislikeButton.classList.contains('clicked')).toBe(false);
        expect(Number(dislikeCount.textContent)).toBe(0);
        expect(likeButton.disabled).toBe(false);
    });
});

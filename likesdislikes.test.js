// likesdislikes.test.js

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { setupLikeDislikeButtons } = require('./likedislike.js');

// Mock the fetch function globalt
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve('Success')
  })
);

// Læs HTML-filen
const html = fs.readFileSync(path.resolve(__dirname, './post.html'), 'utf8');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

let document;
let window;

beforeEach(() => {
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  document = dom.window.document;
  window = dom.window;

  // Tildel mock localStorage til window
  window.localStorage = localStorageMock;

  // Sørg for, at localStorage er tilgængelig globalt
  global.localStorage = localStorageMock;

  // Ryd localStorage før hver test
  localStorageMock.clear();
});

describe('Post like/dislike functionality', () => {
  test('should like a post', async () => {
    const postElement = document.getElementById('post-1');
    setupLikeDislikeButtons(postElement);

    const thumbsUpButton = postElement.querySelector('.thumbs-up-btn');
    const likeCount = postElement.querySelectorAll('.post-rating-count')[0];

    expect(thumbsUpButton.classList.contains('clicked')).toBe(false);

    thumbsUpButton.click();

    expect(thumbsUpButton.classList.contains('clicked')).toBe(true);
    expect(parseInt(likeCount.textContent)).toBe(1);
  });

  test('should dislike a post', async () => {
    const postElement = document.getElementById('post-1');
    setupLikeDislikeButtons(postElement);

    const thumbsDownButton = postElement.querySelector('.thumbs-down-btn');
    const dislikeCount = postElement.querySelectorAll('.post-rating-count')[1];

    expect(thumbsDownButton.classList.contains('clicked')).toBe(false);

    thumbsDownButton.click();

    expect(thumbsDownButton.classList.contains('clicked')).toBe(true);
    expect(parseInt(dislikeCount.textContent)).toBe(1);
  });

  test('should only allow a user to like once', async () => {
    const postElement = document.getElementById('post-1');
    setupLikeDislikeButtons(postElement);

    const thumbsUpButton = postElement.querySelector('.thumbs-up-btn');
    const likeCount = postElement.querySelectorAll('.post-rating-count')[0];

    thumbsUpButton.click();
    expect(thumbsUpButton.classList.contains('clicked')).toBe(true);
    expect(parseInt(likeCount.textContent)).toBe(1);

    thumbsUpButton.click();
    expect(thumbsUpButton.classList.contains('clicked')).toBe(false);
    expect(parseInt(likeCount.textContent)).toBe(0);
  });

  test('should only allow a user to dislike once', async () => {
    const postElement = document.getElementById('post-1');
    setupLikeDislikeButtons(postElement);

    const thumbsDownButton = postElement.querySelector('.thumbs-down-btn');
    const dislikeCount = postElement.querySelectorAll('.post-rating-count')[1];

    thumbsDownButton.click();
    expect(thumbsDownButton.classList.contains('clicked')).toBe(true);
    expect(parseInt(dislikeCount.textContent)).toBe(1);

    thumbsDownButton.click();
    expect(thumbsDownButton.classList.contains('clicked')).toBe(false);
    expect(parseInt(dislikeCount.textContent)).toBe(0);
  });

  test('should allow a user to switch between like and dislike', async () => {
    const postElement = document.getElementById('post-1');
    setupLikeDislikeButtons(postElement);

    const thumbsUpButton = postElement.querySelector('.thumbs-up-btn');
    const thumbsDownButton = postElement.querySelector('.thumbs-down-btn');
    const likeCount = postElement.querySelectorAll('.post-rating-count')[0];
    const dislikeCount = postElement.querySelectorAll('.post-rating-count')[1];

    thumbsUpButton.click();
    expect(thumbsUpButton.classList.contains('clicked')).toBe(true);
    expect(thumbsDownButton.disabled).toBe(true);
    expect(parseInt(likeCount.textContent)).toBe(1);

    thumbsUpButton.click(); // Unlike
    expect(thumbsUpButton.classList.contains('clicked')).toBe(false);
    expect(thumbsDownButton.disabled).toBe(false);
    expect(parseInt(likeCount.textContent)).toBe(0);

    thumbsDownButton.click();
    expect(thumbsDownButton.classList.contains('clicked')).toBe(true);
    expect(thumbsUpButton.disabled).toBe(true);
    expect(parseInt(dislikeCount.textContent)).toBe(1);
  });
});

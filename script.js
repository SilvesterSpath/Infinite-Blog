const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

let posts = [];

// Fetch post from api
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// Show posts in DOM
async function showPost() {
  const posts = await getPosts();

  posts.forEach((i) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = ` <div class="number">${i.id}</div>
    <div class="post-info">
      <h2 class="post-title">${i.title}</h2>
      <p class="post-body">${i.body}
      </p>
    </div>`;
    postContainer.appendChild(postEl);
  });
}

showPost();

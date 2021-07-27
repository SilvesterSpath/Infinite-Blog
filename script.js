const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 4;
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
    postEl.innerHTML = `<div class="number">${i.id}</div>
    <div class="post-info">
      <h2 class="post-title">${i.title}</h2>
      <p class="post-body">${i.body}
      </p>
    </div>`;
    postContainer.appendChild(postEl);
  });
}

showPost();

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPost();
    }, 100);
  }, 1000);
}

// Filter posts by input
function filterPost(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  console.log(posts);
  posts.forEach((i) => {
    const title = i.querySelector('.post-title').innerText.toUpperCase();
    const body = i.querySelector('.post-body').innerText.toUpperCase();
    if (title.includes(term) || body.includes(term)) {
      i.style.display = 'flex';
    } else {
      i.style.display = 'none';
    }
  });
}

// Scroll functionality
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  console.log('scrollTop', scrollTop);
  console.log('scrollHeight', scrollHeight);
  console.log('clientHeight', clientHeight);

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', (e) => {
  filterPost(e);
});

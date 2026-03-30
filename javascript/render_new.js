function renderNews(News, containerId) {
  const container = document.getElementById(containerId);

  const html = News.map(New => `
      <div class="col">
                    <div class="news-menu"  data-id="${New.id}">
                        <div class="news-item--img">
                            <img src="${New.image}" alt="">
                        </div>
                        <h3 class="news-item--title">${New.title}</h3>
                    </div>
                </div>
  `).join('');

  container.innerHTML = html;
}

async function getNews() {
  const res = await fetch('../data/new.json');
  return await res.json();
}

async function init() {
  const News = await getNews();

  renderNews(News, 'news');

}
init();
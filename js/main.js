const quote = document.getElementById('quote');
const author = document.getElementById('author');
const h2 = document.getElementById('h2--citacao');
let hashtags = '';
async function getQuote(url = 'https://api.api-ninjas.com/v2/quotes')
{
  const apiKey = 'dmk8QkIHB3xGcoCE6kFaRvQPHiXMzcM87dWxH65R';

  try
  {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        data:
        { categories:
          `wisdom,
          philosophy,
          life,
          truth,
          inspirational,
          relationships,
          love,
          faith,
          humor,
          success,
          courage,
          happiness,
          art,
          writing,
          fear,
          nature,
          time,
          freedom,
          death,
          leadership`
        }
      }
    );
    if (!response.ok) { throw new Error('Erro de HTTP. Status:' + response.status); }
    const data = await response.json();
    url === 'https://api.api-ninjas.com/v2/quotes' ? h2.textContent = 'Citação do dia' : h2.textContent = 'Citação aleatória';
    author.textContent = data[0].author;
    quote.textContent = data[0].quote;
    data[0].categories.forEach(category =>
    {
      hashtags += category;
    });
  }
  catch(error)
  {
    console.error(error);
  }
}


document.querySelector('.quote-box button:not(:has(> img))').addEventListener('click', () => getQuote('https://api.api-ninjas.com/v2/randomquotes?'));
document.querySelector('.quote-box button:has(> img)').addEventListener('click', () =>
{
  if (quote.textContent === 'Loading...') return;
  const contentToShare = quote.textContent + '\n' + author.textContent;
  const urlToShare = window.location.href;
  const hashtagsToUrl = 'quote,' + hashtags;
  const xShareUrl = 'https://x.com';
  const finalUrl = `${xShareUrl}?text=${encodeURIComponent(contentToShare)}&url=${encodeURIComponent(urlToShare)}&hashtags=${encodeURIComponent(hashtagsToUrl)}`;
  window.open(finalUrl, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
});
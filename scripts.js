const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);

let request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {
    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
            const p = document.createElement('p');
            p.setAttribute('style', 'white-space: pre;');
            movie.director = movie.director.substring(0, 100);
            p.textContent = `Director: ${movie.director}\r\n`;
            movie.producer = movie.producer.substring(0, 100);
            p.textContent += `Producer: ${movie.producer}\r\n`;
            movie.release_date = movie.release_date.substring(0, 100);
            p.textContent += `Release date: ${movie.release_date}\r\n`;
            movie.rt_score = movie.rt_score.substring(0, 100);
            p.textContent += `Rating IMDb: ${movie.rt_score}\r\n`;
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `No answer, please, try again :(`;
        app.appendChild(errorMessage);
    }
}
request.send();
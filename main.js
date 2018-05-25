/**
 * Load Json File example
 */
const loadJson = () => {
  return fetch('movies.json')
    .then((response) => {
      loadMenu();
      return response.json()
    })
    .then((res) => {
      const moviesList = document.querySelector('ul');
      for (let i = 0; i < res.movies.length; i++) {
        const movie = document.createElement('li');
        movie.innerHTML = `<h3>${res.movies[ i ].title}</h3>`;
        movie.innerHTML += `<p> Episode ${res.movies[ i ].episode_number}</p>`;
        movie.innerHTML += `<p> ${res.movies[ i ].description}</p>`;
        let castList = '<ul>';
        res.movies[ i ].main_characters.forEach((character) => {
          castList += `<li><img src="./falcon.png" class="falcon">${character}</li>`;
        })
        castList += '</ul>'
        movie.innerHTML += ` Cast: ${castList}`;
        moviesList.appendChild(movie);
      }
    })
}

/**
 * Array Buffer example with a great SoundTrack
 */
// define variables
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createBufferSource();
const loadSoundView = () => {
  const play = document.querySelector('.play');
  const stop = document.querySelector('.stop');
  loadMenu();

  if (play) {
    play.onclick = () => {
      getAudioData();
      source.start(0);
      play.setAttribute('disabled', 'disabled');
    }
  }

  if (stop) {
    stop.onclick = () => {
      source.stop(0);
      play.removeAttribute('disabled');
    }
  }
}

const getAudioData = () => {
  fetch('opening-sound.ogg')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      audioCtx.decodeAudioData(buffer, (decodedData) => {
        source.buffer = decodedData;
        source.connect(audioCtx.destination);
      });
    });
};

/**
 * Clone response example (Vader)
 */
const loadTropper = () => {
  const tropperImage = document.querySelector('.tropper-image');
  const clone = document.querySelector('.clone');
  const sectionImages = document.getElementById('section-images');
  // let cloneResponse = new Response();
  loadMenu();
  fetch('stormtropper.png')
    .then(function (response) {
      const cloneResponse = response.clone();

      response.blob().then(myBlob => {
        const objectURL = URL.createObjectURL(myBlob);
        tropperImage.src = objectURL;
      });

      if (clone) {
        clone.onclick = () => {
          const clonedResponse = cloneResponse;
          clonedResponse.blob().then(myBlob => {
            const objectURL = URL.createObjectURL(myBlob);
            const newImage = new Image(100, 100);
            newImage.src = objectURL;
            sectionImages.appendChild(newImage);
          });
        }
      }
    });
}

/**
 * HTML response example (So nice web sample)
 */
const loadANiceWeb = () => {
  const sectionWeb = document.getElementById('web-section');
  const loadPage = document.getElementById('btn-load-page');
  loadMenu();
  if (loadPage) {
    loadPage.onclick = () => {
      getAudioData();
      fetch('./nice-web.html')
        .then(function (response) {
          source.start(0);
          return response.text();
        })
        .then(function (text) {
          sectionWeb.innerHTML = text;
        });
    }
  }
}

/**
 * HTML menu response example (So nice web sample)
 */
const loadMenu = () => {
  const menu = document.getElementById('menu');
  fetch('./menu.html')
    .then(function (response) { return response.text() })
    .then(function (text) {
      menu.innerHTML = text;
      const burger = document.getElementById('burger');
      const nav = document.getElementById('nav');
      if (burger) {
        burger.onclick = () => {
          burger.classList.toggle('active');
          nav.classList.toggle('show');
        }
      }
    });
}

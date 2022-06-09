let check = 0;
const URLINIT = new URL("https://ws.audioscrobbler.com/2.0/");
const CONTAINER = document.querySelector(".container");
const SEARCHBAR = document.querySelector(".search-bar");

/**
 * Название трека и исполнителя
 */
function createNameItem(item) {
    const ITEMNAME = document.createElement("summary");
    ITEMNAME.className = "description_card";
    ITEMNAME.textContent = item.name;
    return ITEMNAME;
}

/**
 * Формирование оболочки для ссылки на исполнителя
 */
function createPerformerLink(item) {
    const PERFORMERLINK = document.createElement("a");
    PERFORMERLINK.className = "link_source";
    PERFORMERLINK.href = item.artist.url;
    PERFORMERLINK.rel = "noopener";
    PERFORMERLINK.target = "_blank";
    return PERFORMERLINK;
}

/**
 * Формирование имени исполнителя
 */
function createPerformer(item) {
    const PERFORMER = document.createElement("li");
    PERFORMER.textContent = "Исполнитель: " + item.artist.name;
    return PERFORMER;
}


/**
 * Формирование листа с информацией о треке или исполнителе
 */
function createList() {
    const LISTCARD = document.createElement("ul");
    LISTCARD.className = "list_card";
    return LISTCARD;
}

/**
 * Формирование поля с кол-вом прослушиваний трека или исполнителя
 */
function createAuditions(item) {
    const AUDITIONS = document.createElement("li");
    AUDITIONS.textContent = "Прослушивания: " + item.playcount;
    return AUDITIONS;
}

/**
 * Формирование оболочки для ссылки на трек или исполнителя
 */
function createLink(item) {
    const TRACKLINK = document.createElement("a");
    TRACKLINK.className = "link_source";
    TRACKLINK.href = item.url;
    TRACKLINK.target = "_blank";
    TRACKLINK.rel = "noopener";
    return TRACKLINK;
}

/**
 * Формирование поля с ссылкой на Last FM
 */
function createLastFMLink() {
    const LASTFMLINK = document.createElement("li");
    LASTFMLINK.textContent = "Подробнее на Last FM...";
    return LASTFMLINK;
}

/**
 * Обработчик события поиска по треку или исполнителю
 */
function addEvent(){
    SEARCHBAR.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (event.target.value === "") {
            switch (check) {
                case 0:
                    setTopMusic();
                    break;
                case 1:
                    setTopPerformer();
                    break;
                default:
                    break;
            }
        }
        else {
            switch (check) {
                case 0:
                    setSearchedMusic(event.target.value);
                    break;
                case 1:
                    setSearchedPerformer(event.target.value);
                    break;
                default:
                    break;
            }
        }
    }
});
}

/**
 * Очистка контейнера
 */
function clearContainer() {
    if (CONTAINER.firstChild) {
      while (CONTAINER.firstChild) {
        CONTAINER.removeChild(CONTAINER.lastChild);
      }
    }
}

/**
 * Очистка контейнера, установка параметров и последующий GET-запрос формирующий список лучших треков
 */
function setTopMusic() {
    clearContainer();
    URLINIT.search = "?method=chart.gettoptracks&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json";
    check = 0;
    fetch(URLINIT)
      .then((result) => result.json())
      .then((data) =>
        data.tracks.track.forEach((track) => {
          const TEMPCARD = document.createElement("details");
          TEMPCARD.className = "card";
          const LIST = createList();
          const TRACKLINK = createLink(track);
          TEMPCARD.appendChild(createNameItem(track));
          const PERFORMERLINK = createPerformerLink(track)
          PERFORMERLINK.appendChild(createPerformer(track));
          LIST.appendChild(PERFORMERLINK);
          LIST.appendChild(createAuditions(track));
          TRACKLINK.appendChild(createLastFMLink());
          LIST.appendChild(TRACKLINK);
          TEMPCARD.appendChild(LIST);
          CONTAINER.append(TEMPCARD);
        })
    );
}

/**
 * Очистка контейнера, установка параметров и последующий GET-запрос для поиска по трекам
 */
function setSearchedMusic(val) {
    clearContainer();
    URLINIT.search = `?method=track.search&limit=50&track=${val}&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json`;
    fetch(URLINIT)
      .then((result) => result.json())
      .then((data) =>
        data.results.trackmatches.track.forEach((track) => {
          const TEMPCARD = document.createElement("details");
          TEMPCARD.className = "card_small";
          const LIST = createList();
          const TRACKLINK = createLink(track);
          TEMPCARD.appendChild(createNameItem(track));
          TRACKLINK.appendChild(createLastFMLink());
          LIST.appendChild(TRACKLINK);
          TEMPCARD.appendChild(LIST);
          CONTAINER.append(TEMPCARD);
        })
    );
}

/**
 * Очистка контейнера, установка параметров и последующий GET-запрос формирующий список лучших исполнителей
 */
function setTopPerformer() {
    clearContainer();
    URLINIT.search = "?method=chart.gettopartists&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json";
    check = 1;
    fetch(URLINIT)
      .then((result) => result.json())
      .then((data) =>
        data.artists.artist.forEach((artist) => {
          const TEMPCARD = document.createElement("details");
          TEMPCARD.className = "card_medium";
          const LIST = createList();
          const PERFORMERLINK = createLink(artist);
          TEMPCARD.appendChild(createNameItem(artist));
          LIST.appendChild(createAuditions(artist));
          PERFORMERLINK.appendChild(createLastFMLink());
          LIST.appendChild(PERFORMERLINK);
          TEMPCARD.appendChild(LIST);
          CONTAINER.append(TEMPCARD);
        })
    );
}

/**
 * Очистка контейнера, установка параметров и последующий GET-запрос для поиска по исполнителям
 */
function setSearchedPerformer(val) {
    clearContainer();
    URLINIT.search = `?method=artist.search&artist=${val}&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json`;
    fetch(URLINIT)
      .then((result) => result.json())
      .then((data) =>
        data.results.artistmatches.artist.forEach((artist) => {
          const TEMPCARD = document.createElement("details");
          TEMPCARD.className = "card_small";
          const LIST = createList();
          const PERFORMERLINK = createLink(artist);
          TEMPCARD.appendChild(createNameItem(artist));
          PERFORMERLINK.appendChild(createLastFMLink());
          LIST.appendChild(PERFORMERLINK);
          TEMPCARD.appendChild(LIST);
          CONTAINER.append(TEMPCARD);
        })
    );
}

addEvent();
setTopMusic();

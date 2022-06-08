let check = 0;
const INITURL = new URL("https://ws.audioscrobbler.com/2.0/");
const CONTAINER = document.querySelector(".container");
const SEARCHBAR = document.querySelector(".search-bar");

function createNameItem(item) {
    const ITEMNAME = document.createElement("summary");
    ITEMNAME.className = "description_card";
    ITEMNAME.textContent = item.name;
    return ITEMNAME;
}

function createPerformerLink(item) {
    const PERFORMERLINK = document.createElement("a");
    PERFORMERLINK.className = "link_source";
    PERFORMERLINK.href = item.artist.url;
    PERFORMERLINK.rel = "noopener";
    PERFORMERLINK.target = "_blank";
    return PERFORMERLINK;
}

function createPerformer(item) {
    const PERFORMER = document.createElement("li");
    PERFORMER.textContent = "Исполнитель: " + item.artist.name;
    return PERFORMER;
}

function createList() {
    const LISTCARD = document.createElement("ul");
    LISTCARD.className = "list_card";
    return LISTCARD;
}

function createAuditions(item) {
    const AUDITIONS = document.createElement("li");
    AUDITIONS.textContent = "Прослушивания: " + item.playcount;
    return AUDITIONS;
}

function createLink(item) {
    const TRACKLINK = document.createElement("a");
    TRACKLINK.className = "link_source";
    TRACKLINK.href = item.url;
    TRACKLINK.target = "_blank";
    TRACKLINK.rel = "noopener";
    return TRACKLINK;
}

function createLastFMLink() {
    const LASTFMLINK = document.createElement("li");
    LASTFMLINK.textContent = "Подробнее на Last FM...";
    return LASTFMLINK;
}

SEARCHBAR.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (event.target.value === "") {
            setTopMusicSettings();
        }
        else {
            switch (check) {
                case 0:
                    setSearchedMusicSettings(event.target.value);
                    break;
                case 1:
                    setSearchedArtistsSettings(event.target.value);
                    break;
                default:
                    break;
            }
        }
    }
});

function clearContainer() {
    if (CONTAINER.firstChild) {
      while (CONTAINER.firstChild) {
        CONTAINER.removeChild(CONTAINER.lastChild);
      }
    }
}

function setTopMusicSettings() {
    clearContainer();
    INITURL.search = "?method=chart.gettoptracks&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json";
    check = 0;
    getTopMusic();
}

function getTopMusic() {
    fetch(INITURL)
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

function setSearchedMusicSettings(val) {
    clearContainer();
    INITURL.search = `?method=track.search&limit=50&track=${val}&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json`;
    getSearchedMusic();
}

function getSearchedMusic() {
    fetch(INITURL)
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

function setTopArtistsSettings() {
    clearContainer();
    INITURL.search = "?method=chart.gettopartists&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json";
    check = 1;
    getTopArtists();
}

function getTopArtists() {
    fetch(INITURL)
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

function setSearchedArtistsSettings(val) {
    clearContainer();
    INITURL.search = `?method=artist.search&artist=${val}&api_key=1eb25db4baa96f9d49e827d603c2b54f&format=json`;
    getSearchedArtists();
}

function getSearchedArtists() {
    fetch(INITURL)
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

setTopMusicSettings();
import React from 'react';
import Card from './Card';

class ListMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        };
      }
      componentDidMount() {
        const URL = (process.env.REACT_APP_API_URL)
        const KEY = (process.env.REACT_APP_API_KEY)
        const getLists = async () => {
            const answer = this.props.request === "" ? await fetch(
                `${URL}?method=chart.gettoptracks&limit=25&api_key=${KEY}&format=json`
            ) : await fetch(
                `${URL}?method=track.search&limit=25&track=${this.props.request}&api_key=${KEY}&format=json`
            )
            const lists = await answer.json();
            const informationTracks = lists.tracks ? lists.tracks :  lists.results.trackmatches;
            this.setState({ songs: informationTracks.track })
        };
        getLists();
    }

    componentDidUpdate() {
        const URL = (process.env.REACT_APP_API_URL)
        const KEY = (process.env.REACT_APP_API_KEY)
        const getLists = async () => {
            const answer = this.props.request === "" ? await fetch(
                `${URL}?method=chart.gettoptracks&limit=25&api_key=${KEY}&format=json`
            ) : await fetch(
                `${URL}?method=track.search&limit=25&track=${this.props.request}&api_key=${KEY}&format=json`
            )
            const lists = await answer.json();
            const informationTracks = lists.tracks ? lists.tracks :  lists.results.trackmatches;
            this.setState({ songs: informationTracks.track })
        };
        getLists();
    }

    render() {
    return (this.state.songs.map(song => <Card key={song.name} name={song.name} artist={song.artist.name || song.artist} playcount={song.playcount}/>))
    }
}

export default ListMusic;

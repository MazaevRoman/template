import React from 'react';
import Card from './Card'

class ArtistList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        };
      }
      componentDidMount() {
        const URL = (process.env.REACT_APP_API_URL)
        const KEY = (process.env.REACT_APP_API_KEY)
        const getLists = async () => {
            const answer = this.props.request === "" ? await fetch(
                `${URL}?method=chart.gettopartists&api_key=${KEY}&format=json`
            ) : await fetch(
                `${URL}?method=artist.search&limit=25&artist=${this.props.request}&api_key=${KEY}&format=json`
            )
            const lists = await answer.json();
            const informationArtists = lists.results ? lists.results.artistmatches :  lists.artists;
            this.setState({ artists: informationArtists.artist })
        };
        getLists(); 
    }
    componentDidUpdate() {
        const URL = (process.env.REACT_APP_API_URL)
        const KEY = (process.env.REACT_APP_API_KEY)
        const getLists = async () => {
            const answer = this.props.request === "" ? await fetch(
                `${URL}?method=chart.gettopartists&api_key=${KEY}&format=json`
            ) : await fetch(
                `${URL}?method=artist.search&limit=25&artist=${this.props.request}&api_key=${KEY}&format=json`
            )
            const lists = await answer.json();
            const informationArtists = lists.results ? lists.results.artistmatches :  lists.artists;
            this.setState({ artists: informationArtists.artist })
        };
        getLists(); 
    }
    render() {
    return (this.state.artists.map(song => <Card name={song.name} key={song.name} playcount={song.playcount}/>))
    }
}

export default ArtistList;
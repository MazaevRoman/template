import React from 'react';
import ListMusic from './ListMusic';
import ArtistList from './ArtistList';
import { MyContext } from "../Context";

class Content extends React.Component {
    static contextType = MyContext
    render() {
    const {music, request} =this.context;
    return (
        <div className='content'>
            {music
                ? <ListMusic request={request}/>
                : <ArtistList request={request}/>
            }
        </div>
    );
    }
}

export default Content;
import React from 'react';
import Content from './Content';

class Main extends React.Component {
    render() {
    return (
        <main class="content">
            <div class="container">
            <Content contentType={this.props.music} request={this.props.request}/>
            </div>
        </main>
    );
    }
}


export default Main;
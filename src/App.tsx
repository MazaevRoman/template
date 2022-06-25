import React, { useState } from 'react';
import Footer from './componets/Footer';
import Header from './componets/Header';
import Main from './componets/Main';
import Aside from './componets/Aside';
import { MyContext } from './Context';

function App() {
    const [music, setMusic] = useState(true);
    const [request, setRequest] = useState("");
    const provider = React.useMemo(() => ({
        music, 
        setMusic,
        request, 
        setRequest,
    }), [music, request]);

    return (
        <div className="app">
            <MyContext.Provider value={provider}>
                <Header />
                <Main/>
                <Aside />
            </MyContext.Provider>
            <Footer />
        </div>
    );
}

export default App;

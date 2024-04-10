import React from 'react'; //ES2015 module syntax



const Home = () => {
    return (
        <div>
            <div>
                I am the best Home
            </div>
            <button onClick={() => console.log('Hi')}>Press Me</button>
        </div>
    )
}

export default Home;
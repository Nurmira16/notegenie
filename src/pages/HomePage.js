import React from 'react';
import logo from '../assets/logo.png'
import PixelText from '../components/PixelText';
 
const HomePage = () => {
  return (
    <>
        <div className='container'> 
            <main>
                <div className='description'>
                    <img src={logo} alt='logo'/>
                    <h1>NoteGenie</h1>
                    <h2>Simplify Your Lecture Notes</h2>
                    <p>Organize your lecture notes and convert images to searchable text.</p>
                </div>
              
                    <PixelText/>
           
            </main>

        </div>

    </>
  );
}

export default HomePage;

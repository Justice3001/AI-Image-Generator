import React, { useState, useEffect } from 'react';
import '../../styles/land.css';
import ocean from '../../img/ocean.jpg';
import WelcomeJumbotron from '../component/welcome';
import RetroGames from '../../img/RetroGames.jpg';
import Cubism from '../../img/Cubism.jpg';
import Phantasmal  from '../../img/Phantasmal.jpg';
import Steampunk from '../../img/Steampunk.jpg';
import Paper from '../../img/Paper.jpg';
import House from '../../img/House.jpg';
import Cyberpunk from '../../img/Cyberpunk.jpg';
import Bunny from '../../img/Bunny.jpg';
import Deco from '../../img/Deco.jpg';
import Mouse from '../../img/Mouse.jpg';
import Amor from '../../img/Amor.jpg';
import Bear from '../../img/Bear.jpg';

const Land = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { url: ocean, text: 'A 15th century priest driving a spaceship under the sea, Surrealism' },
    { url: RetroGames, text: 'The inside of a medieval dungeon, 32-bit isometric, 1990s point and click 16bit adventure --ar 3:2' },
    { url: Cubism, text: 'A labrador dog in a space suit on the moon, Cubism' },
    { url: Phantasmal, text: 'A close-up portrait of an elegant female vampire in a library staring at the moon by the window, phantasmal iridescent' },
    { url: Steampunk, text: 'Flying cars in Times Square in steampunk style --ar 3:2' },
    { url: Paper, text: 'Layered paper of bubbles, pastel tones, sparkles of blue paint' },
    { url: House, text: 'A wooden cabin in an oak forest in Bauhaus style, hyper realistic, volumetric lighting --ar 3:2' },
    { url: Cyberpunk, text: 'A street-food seller selling pop-corn to a robot in a rainy city, cyberpunk style --ar 3:2' },
    { url: Bunny, text: 'A rabbit as a train conductor' },
    { url: Deco, text: 'The Eiffel Tower surrounded by floating islands in the style of Art Deco' },
    { url: Mouse, text: 'A retrowave portrait of a dormouse mouse' },
    { url: Amor, text: 'Infographic drawing of a medieval warrior armor' },
    { url: Bear, text: 'A bear playing a MiniMoog Synthesizer, naive art' },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main">
      <header>
        <WelcomeJumbotron />
        {/* ... (header code) */}
      </header>

      <h3 style={{marginLeft:"90%"}}>prompt used </h3>

      <div className="cd-slider">
        <ul>
          {images.map((image, index) => (
            <li key={index} className={index === currentSlide ? 'current' : ''}>
              <div className="image" style={{ backgroundImage: `url(${image.url})` }}></div>
              <div className="content">
                <h2 style={{ maxWidth: '400px',marginLeft:"1000px" }}>{image.text}</h2>
              </div>
            </li>
          ))}
        </ul>

       
      </div>

      <button className="enter-site-button">Enter Site</button>
    </div>
  );
};

export default Land;

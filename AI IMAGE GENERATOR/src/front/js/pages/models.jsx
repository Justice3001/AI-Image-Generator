import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../component/nav";
import "./models.css";
import Bob from '../../img/Bob.webp';
import Dog from '../../img/Dog.webp';
import Wolf from '../../img/Wolf.webp';
import Couple from '../../img/Couple.webp';
import Cray from '../../img/Cray.webp';

const Models = () => {
  // Constant array for image sources and corresponding text
  const images = [
    { src: Bob, text: 'Samaritan 3D XL is an exceptional AI model designed to breathe life into the world of 3D cartoon characters. Based on the powerful SDXL framework, this model specializes in creating adorable cartoon characters, each brimming with a range of emotions. It\'s a perfect tool for animators, game developers, digital artists, and anyone passionate about bringing cartoon characters to life in a 3D space.' },
    { src: Dog, text: 'LoRA Dog SSD 1B specializes in generating photorealistic images of dogs. Based on the robust SSD 1B framework, this model is meticulously trained on dog images, ensuring each creation is as lifelike and authentic as possible.' },
    { src: Wolf, text: '(MODEL USED BY DEFAULT). The Segmind Stable Diffusion Model (SSD-1B) sets a new standard in AI-driven image generation, offering a compact, efficient solution for transforming text into high-quality visuals. At 50% smaller and 60% faster than the Stable Diffusion XL (SDXL), it provides quick and seamless performance without sacrificing image quality. For those seeking a reliable and versatile text-to-image tool, Segmind’s SSD-1B is a top choice, ensuring both speed and visual excellence.' },
    { src: Couple, text: 'The Realistic Vision V3 model is a state-of-the-art AI model based on Stable Diffusion 1.5 that is capable of creating super realistic portraits that look like real photos. It can generate portraits in different styles, ages, and clothing, and can even create people with specific clothing. The portraits created by the model are described as absolutely amazing and mind-blowing.' },
    { src: Cray, text: 'Crayon Style - SDXL LoRA is an innovative AI model that turns the art of crayon drawing into a digital reality. This unique model is designed to convert any text prompt into a vibrant, crayon-style drawing, blending the simplicity of crayons with the complexity of AI technology.' },
    // Add other image sources and corresponding text here
  ];

  return (
    <div className="container mt-5">
      <Navbar />

      {/* Cards */}
      <div className="row mt-4">
        {images.map((image, index) => (
          <div key={index} className="col-md-3">
            <div className="card">
              <img src={image.src} className="card-img-top" alt={`Card ${index + 1}`} />
              <div className="overlay">
                <button className="btn btn-primary">Use Model</button>
                
              </div>
              <div className="card-body">
                <h5 className="card-title">Model</h5>
                <p className="card-text">
                  {image.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Models;

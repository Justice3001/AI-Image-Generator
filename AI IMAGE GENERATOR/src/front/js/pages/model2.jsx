import React, { useState } from "react";
import axios from "axios";
import Navbar from "../component/nav";
import girl from "../../../../public/assests/girl.webp"; 
import boat from "../../../../public/assests/boat.webp";

const Model1 = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [additionalText, setAdditionalText] = useState("");
  const [isLoading, setLoading] = useState(false); // Added loading state

 

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * predeterminedPrompts.length);
    setPrompt(predeterminedPrompts[randomIndex]);
  };

  const generateImage = async () => {
   
    const url = "https://api.segmind.com/v1/ramsrigouthamg-lora-dog-SSD-1B";
    setLoading(true); // Set loading to true when generating image
  
    // Record the start time
    const startTime = new Date().getTime();
  
    // Request payload
    const data = {
      prompt: prompt,
      negative_prompt:
        "(worst quality, low quality:1.4), signature, artist name, text, web address, logo, error, cropped, artifacts, watermark, username, blurry, collage, grid, lens, camera lens, car, truck, road, fat, obese, armor, badges, patches, usa, nasa",
      samples: 1,
      scheduler: "UniPC",
      num_inference_steps: 25,
      guidance_scale: "7",
      seed: "1502673077",
      img_width: "1024",
      img_height: "1024",
      base64: false,
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "SG_b7bb2a720c61dc53", // Include the API key in the headers
        },
        responseType: "arraybuffer", // specify the expected response type as arraybuffer
      });
  
      // Record the end time
      const endTime = new Date().getTime();
  
      // Calculate the time difference
      const elapsedTime = endTime - startTime;
      console.log(`Image generation took ${elapsedTime} milliseconds`);
  
      // Convert the array buffer to base64
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
  
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
      setError(null); // Reset error state if the request is successful
    } catch (error) {
      setError(`Error while fetching Gen AI model API: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };
  

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated_image.jpg";
    link.click();
  };

  const handleCardButtonClick = (cardNumber) => {
    let cardContent = "";
    let additionalTextForCard = "";

    //update this with new pics you generate..
    switch (cardNumber) {
      case 1:
        cardContent =
          "LINE ART, An elegant woman in a 1920s flapper dress, pearls, and a feathered headband, capturing the Roaring Twenties, sleek black lines on a champagne paper, 2D sketched, stylish and ornate, jazz club in the backdrop, lively and decadent, reminiscent of Art Deco, chic, the Jazz Age embodied, detailed depiction of sequins and fringes, ornate backdrop, figure in a dynamic pose, emphasis on fashion, intricate, celebratory, golden age, graphic, precision in detailing, gleaming chandeliers above.";
        additionalTextForCard =
          "Negative Prompt(Prompts to exclude, eg. 'bad anatomy, bad hands, missing fingers'):scary, cartoon, painting ";
        break;
      case 2:
        cardContent =
          "Seaside Town, clay boats bobbing on the gentle waves, fisherfolk mending nets, seagulls overhead, captured in Craft Clay style.";
        additionalTextForCard = "Additional text for Card 2."; // boat
        break;
      case 3:
        cardContent =
          "STICKER, An energetic portrayal of a dancing cactus with a sombrero, amidst a desert sunset, warm twilight glow, summer festival 2024, gradient orange to purple hues, 3D digital drawing, cheerful and vibrant, desert fiesta theme, cartoon shading, glittering sand effect, using Autodesk SketchBook, sticker, 2D animated, lively desert, vector illustration, 2D front view, spotlighted by the setting sun, by Hayao Miyazaki, playful, bright, festive, graphic, outlined edges, vector design.";
        additionalTextForCard = "Additional text for Card 3."; //catus
        break;
      case 4:
        cardContent =
          "Fox, orange and white paper, pointed ears, curled tail, sly expression with sharp folded eyes.";
        additionalTextForCard = "Additional text for Card 4."; //fox
        break;
      // Add more cases for additional cards if needed
     

      default:
        break;
    }

    setModalContent(cardContent);
    setAdditionalText(additionalTextForCard);
    setModalOpen(true);
  };

  return (
    <div className="container mt-5">
      <Navbar />

      {/* Left card with text area and Generate Image button */}
      <div className="card p-4 mt-3">
        <div className="text-center">
          <h1 className="mb-4">Axiom Mind</h1>
          <p>Unleash your creativity with Axiom Mind's image generation.</p>
          <p>Become the artist you always wanted to be.</p>
          <div className="card p-4 mt-3">
            <h2 className="mb-4">FEW TIPS</h2>

            <p>
              1. Use simple and common words like king, queen, knight, wizard,
              dragon.
            </p>

            <p>
              2. Your phrase needs to be specific. Take the “A rainbow-coloured
              butterfly flying across a field of flowers during a sunset” phrase
              as an example.
            </p>

            <p>
              3. Ensure you combine adjectives that best describe the image you
              want. Words like “Beautiful, colourful, detailed, intricate,
              massive, powerful”.
            </p>

            <p>
              4. If you want an art style, add the name of an artist. Names like
              Vincent Van Gogh, Picasso, Salvador Dali, M.C. Escher.
            </p>

            <p>
              5. Illustrate the style you want. Words like “Abstract,
              Contemporary, Cubism, Cyberpunk, Fantasy, Impressionism, Minimal,
              Modern, Realism, Surrealism” will help.
            </p>

            <p>
              6. For a more accurate result, be specific with the computer
              graphics type like Octane render, Unreal Engine, and Ray tracing.
            </p>

            <p>
              7. Share with others be creative and most importantly enjoy and
              have fun!
            </p>
          </div>
        </div>


        <div className="card p-4 mt-3 text-center">
            <h2 className="mb-4">Using Model: LoRA Dog SSD-1B</h2>

            <p>
            Photorealistic Dog Imagery: Expertly generates images of dogs that are strikingly realistic and detailed.

Breed-Specific Precision:Trained on a diverse range of dog breeds for nuanced and accurate representation.

Versatile Applications: Suitable for various uses, from pet photography enhancement to creative dog-themed art.
            
            </p>

           
            
          </div>

        <div className="form-group">
          <label
            htmlFor="prompt"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Prompt:
          </label>

          <textarea
            className="form-control"
            id="prompt"
            rows="4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt that sparks your imagination. It can be as concise as a few words or as elaborate as two sentences. Unleash your creativity!"
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          {/* Button to generate image */}
          <button
            className="btn btn-primary"
            style={{ height: "60px", width: "150px", marginLeft: "400px" }}
            onClick={generateImage}
          >
            Generate Image
          </button>

          {/* Button to generate images with predetermined prompts */}
          <button
            className="btn btn-secondary"
            style={{ height: "60px", width: "250px", marginRight: "420px" }}
            onClick={generateRandomPrompt}
          >
            Generate Random Prompt (Professional)
          </button>
        </div>

        {/* Error message display */}
        {error && (
          <div className="mt-3" style={{ color: "red" }}>
            <p>Error: {error}</p>
          </div>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="spinner-border text-primary"
              style={{ width: "8rem", height: "8rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Generated Image display */}
        {generatedImage && (
          <div className="mt-3">
            <h2>Generated Image:</h2>
            <div className="card">
              <img
                src={generatedImage}
                alt="Generated"
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <p className="card-text">
                  Download and Share with Your Friends.
                </p>
                <button
                  className="btn btn-success mr-2"
                  onClick={handleDownload}
                >
                  Download
                </button>
                <button className="btn btn-info">Share</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Four Bootstrap cards with images, text, and buttons */}
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card">
            <img src={girl} alt="Card 1" className="card-img-top" />
            <div className="card-body">
              <p className="card-text">Text for Card 1.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleCardButtonClick(1)}
              >
                Button 1
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-3">
          <div className="card">
            <img src={boat} alt="Card 2" className="card-img-top" />
            <div className="card-body">
              <p className="card-text">Text for Card 2.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleCardButtonClick(2)}
              >
                Button 2
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              alt="Card 3"
              className="card-img-top"
            />
            <div className="card-body">
              <p className="card-text">Text for Card 3.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleCardButtonClick(3)}
              >
                Button 3
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              alt="Card 4"
              className="card-img-top"
            />
            <div className="card-body">
              <p className="card-text">Text for Card 4.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleCardButtonClick(4)}
              >
                Button 4
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          
        </div>

        <div className="col-md-3">
          
        </div>

        

        <div className="col-md-3">
          
        </div>
      </div>

      {/* Bootstrap modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ background: "black", color: "white" }}
            >
              <h5 className="modal-title">Prompt Used For the Image</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "18px" }}>{modalContent}</p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                {additionalText}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model1;

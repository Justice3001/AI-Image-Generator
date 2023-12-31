import React, { useState } from "react";
import axios from "axios";
import Navbar from '../component/nav';
import girl from "../../../../public/assests/girl.webp";
import boat from "../../../../public/assests/boat.webp";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [additionalText, setAdditionalText] = useState("");
  const [isLoading, setLoading] = useState(false); // Added loading state
  const [generationTime, setGenerationTime] = useState(null);


  const predeterminedPrompts = [
    "a quasar forms at the end of a long hallway + liminal space + hyperrealistic + unreal engine",
    "a little girl with light brown short wavy curly hair and blue eyes floating in space, gazing in wonder at a quasar, Clear, detailed face. Clean Cel shaded vector art by lois van baarle, artgerm, Helen huang, by makoto shinkai and ilya kuvshinov, rossdraws, illustration",
    " sci-fi cosmic diarama of a quasar and jellyfish in a resin cube, volumetric lighting, high resolution, hdr, sharpen, Photorealism",
    "maze, Narrow steep staircase, Old Building, Floating buildings, Urban, City rain, art by miyazaki and Ian McQue and Akihiko Yoshida and Katsuya Terada, colorful, trending on artstation, gorgeous, ultra-detailed, realistic, 8k, octane render, hyper detailed, cinematic",
    "Extreme close up of an eye that is the mirror of the nostalgic moments, nostalgia expression, sad emotion, tears, made with imagination, detailed, photography, 8k, printed on Moab Entrada Bright White Rag 300gsm, Leica M6 TTL, Leica 75mm 2.0 Summicron-M ASPH, Cinestill 800T",
    "abstract image, Bauhaus style, 3D, phages, black, white, red and blue, 8K",
    "curved building facade made from transparent smooth and endless fluidity style parametric future architecture, concept art, highly detailed, beautiful scenery, cinematic, beautiful light, hyperreal, octane render, hdr, long exposure, 8K, realistic, fog, moody, gopro",
    "a cover photography, body and face photo, a beautiful young woman covered in water and liquid, clothes old and ragged, half buried on trash and garbage, hyper realistic, model photography, 500px poses, detailed, intricate",
    "ontrasting liquid transparent wings of a beautiful fantasy darkness butterfly highly detailed, intricate design, intricate detail, hyper realistic, high definition, extremely detailed, ultra realistic, cinematic lighting. uhd 3d, vray render, cinematic, HDR, photorealistic, 8k",
    "The parametric hotel lobby is a sleek and modern space with plenty of natural light. The lobby is spacious and open with a variety of seating options. The front desk is a sleek white counter with a parametric design. The walls are a light blue color with parametric patterns. The floor is a light wood color with a parametric design. There are plenty of plants and flowers throughout the space. The overall effect is a calm and relaxing space. occlusion, moody, sunset, concept art, octane rendering, 8k, highly detailed, concept art, highly detailed, beautiful scenery, cinematic, beautiful light, hyperreal, octane render, hdr, long exposure, 8K, realistic, fog, moody, fire and explosions, smoke, 50mm f2.8",
    "albino girl wrapped in kelp algae seaweeds in a white minimalist room, theatrical lighting",
    "happy marshmallows, in style of adventure time, intricate detail, concept art",
    "man in a ruin of an ancient city invaded by the jungle, light, unreal engine 5 and Octane Render,highly detailed, photorealistic, cinematic",
    "graffiti art of cartoon Frankenstein monster, elaborate acrylic spray paint by Yoji shinkawa + nick Edwards style with bold brushstrokes, romantic, glazing, orange, green, yellow, white",
    "A white color house, wood joinery style house. high end, custom home, glass, columns, one floor, big deck, terrace, , tropical island, front view, Tom Kundig architect, daylight time, palm trees architecture. Beautiful natural wildflower lawn. Expensive, trending on archdaily, dezeen. Photorealistic, 8k, architectural photography",
    "cyberpunk girl in jacket, colorful tattoos, harlequin cyberpunk, highly detailed, Anna-Lou Leibovitz, dark environment, neon colors, back lighting, Cinematic scene, Cinematic lighting, movie poster, dramatic color variations, strong contrast lighting, 8K, hypermaximalist, detailed intricate, ray tracing, insane detailse ink illustration",
    "a melting apple –v 4",
    "humanoid android, covered in white porcelain skin, blue eyes, white wispy ghost wearing ornate armour 4k realistic fantasy, insane details, ghost phantom effect, hyper detailed, photoreal, photography, cinematic lighting, hdr, hd, cinematography, realism, fine art digital, HD, Mark Molnar mystical, redshift rendering, 8k –v 4",
    "a close up of a helmet on a person, digital art, inspired by Han Gan, cloisonnism, female, victorian armor, ultramarine, best of behance, anton fadeev 8 k, fined detail, sci-fi character, elegant armor, fantasy art behance –v 4",
    "Beautiful Impressionist painting of a dark dramatic character, Fusion between Jeremy Mann and Marta Dahlig and Daniel F Gerhartz, Annie Leibovitz, Long shot –v 4",
    "Mural Painted of Prince in Purple Rain on side of 5 story brick building next to zen garden vacant lot in the urban center district, rgb",
    "beautiful woman sniper, wearing soviet army uniform, one eye on sniper lens, in snow ground",
    "Editorial photoshoot of a old woman, high fashion 2000s fashion",
    "A very attractive and natural woman, sitting on a yoka mat, breathing, eye closed, no make up, intense satisfaction, she looks like she is intensely relaxed, yoga class, sunrise, 35mm, F1: 4",
    "A New Zealand female business owner stands and is happy that his business is growing by having good VoIP and broadband supplied by Voyager Internet. This business owner is dressed semi casual and is standing with a funky office space in the background. The image is light and bright and is well lit. This image needs to be shot like a professional photo shoot using a Canon R6 with high quality 25mm lens. This image has a shallow depth of field",
    "Outdoor style fashion photo, full – body shot of a man with short brown hair, happy and smiling, he is standing on his hipster bicycle wearing a light blue long sleeved blouse with closed buttons and dark blue jeans trousers, in the background the exterior of an Aldi store, fully lit background, natural afternoon lighting",
    "A close up of a branch of a tree and a golden bug on the top a leaf, shutterstock contest winner,ecological art, depth of field, shallow depth of field, macro photography",
    "32 – bit pixelated future Hiphop producer in glowing power street ware, noriyoshi ohrai, in the style of minecraft tomer hanuka",
    "Isometric, photography, photorealistic, The trend of the elements of Taipei night market, people are wandering around, 3d icon clay render, Adjust the size scale of the character according to the environment, octane render, 32 k",
    "Street style centered straight shot photo shot on Afga Vista 400, lense 50mm, of a two women,skin to skin touch face, emotion, hughing, natural blond hair, natural features, ultra detailed, skin texture, Rembrandt light, soft shadows",
    "very expensive cult restaurant booking app, green and gold, mobile app, user interface, Figma, HQ, 4K, clean UI q 5",
    "modern living room minimalistic, marble, white and black, architectural, living room with kitchen colour palette in barcelona Colors palettes aesthetic, details in yellow and teal, sharp graphic, photorealistic, 8 k, bright, octane render, unreal engine, low contrasted, 8k",
    "water, flow, dreams, universe, watercolor",
    "Wearable architecture, architectural fashion accessories exoskeleton, structured, skeletal futuristic streetwear fashion runway look, elegant, intricate, 3d printed, bone like structured fashion, slits, fragments, fractures, geometric, wireframe fashion, skin underneath, see through, (MAGAZINE NAME) japan, gundam, hd, cover, epic, focus, ultra sharp, hyper detailed, epic, focus, ultra sharp, hyper detailed, dystopian fashion, fifth element, futuristic, luxury, elite, cinematic, exoskeleton fashion,  (BRAND NAME)",
    "Oiled metal, graffiti – inspired, poster – like, damp misty alleyways, neon lights Dark studio photography closeup paper quilling brushed iron robot pointing directly at the camera, fisheye lens portrait photography by (ARTIST NAME) and closeup Japanese minimalism",
    "Cyberpunk style, a beautiful 16 year old girl, wearing a gospel warrior style mecha with clear texture, is another street city in Hong Kong. Behind it is a GTR Transformers super robot sports car, which is brilliant, dreamy, daytime effect, complex details, children’s words, body image, noise reduction 8K. HD, 35mm lens, realistic, panoramic lens",
    "A chrome metallic robot sitting in a director’s chair on the set of a classic Western movie. He’s talking to two human cowboy actors. In the background is the scene of a shootout on the dusty Main Street of a small western town. cinematic, matrix filter, photorealistic, 8k, cinematic lighting,cinematic filter",
    "A girl in a high school student uniform and skirt is holding on her swords, in the style of photorealistic detailing, anime – inspired characters, transfixing marine scenes, hyper – realistic sculptures, dark teal and light beige, traditional japanese art, dramatic use of shadows",
    "The girl looks at the light in front of her eyes in the window, in the style of yuumei, light black and amber, letras y figuras, sparkling water reflections, cabincore, joel robison, light orange and red",
    "Portrait of a geisha, soft background, gorgeous, mystical, red lips and black hair, wearing a traditional japanese kimono, cinematic, 8K, hyper realistic, award winning photography",
    "A blonde girl wearing glasses a t shirt and a blue beanie, in the style of anime art, blue and white,xiaofei yue, chromepunk, ferrania p30, social media portraiture, victor nizovtsev, off – white patterned background –v 5",
    "pixel cubes vector svg, brain as brain cloud with colorful flashes social impact and with a total white background photo in Kodak Color 400, professional photography, insta style, photographic style, Unreal Engine, Cinematic, Color Grading, Editorial Photography, Photography, Photoshoot, White Balance, background white, 32k –v 5",
    "make a pop art deco epic city, tilt shift, with trees and topiary, a river running through the city, Cinematography, ultra detailed, 8k, photorealistic,hd, octane render, digitally rendered, award-winning photograph, timeless beauty, cinematic lighting, sophisticated color palette, cinematic focus, symmetrical balance, glowing, octane render, trending on artstation, 3d rendered, 3d",
    "hyper-photorealistic one floor house interior looking like a manta ray in Tokyo city settings, living room, stair, art nouveau, white, wood, parametric pattern, colorful , art highly detailed, fine details, hyper quality, trending on artstation, award-winning, megapixel, elegant, high quality, de-noise, post-processing, post-production, ultra-wide angle lens, wide angle view, super resolution, megapixel, DSLR, Nikon D750, shot on 70mm, lens, distortion, F/22, shutter speed 1/1000, long exposure, sharpened, photoshopped, vibrant colors, 32K resolution, sharp details, octane render, vray engine, unreal engine 5",
    "modern living room ceiling, wood patterns, organic classic, ornamental, fractal, koch lines, indirect lighting",
    "interiors of a modern beauty and wellness healthcare, futuristic, wood, architectural awards, intricate details, minimalistic, as designed by (ARTIST NAME), ultra realistic, high details, vray, hd, 8k",
    "parametric voronoi dedign bedroom, bed headboard continue with the ceiling"
    
  ];

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * predeterminedPrompts.length);
    setPrompt(predeterminedPrompts[randomIndex]);
  };


  const generateImage = async () => {
    const api_key = 'SG_b7bb2a720c61dc53'; // Update this line with your new API key
    const url = 'https://api.segmind.com/v1/ssd-1b'; // Updated URL
    const startTime = performance.now(); // Record start time
    setLoading(true);

    // Request payload
    const data = {
      prompt: prompt,
      negative_prompt: 'scary, cartoon, painting', // Adjust this according to your needs
      samples: 1,
      scheduler: 'UniPC',
      num_inference_steps: 25,
      guidance_scale: 9,
      seed: 36446545871,
      img_width: 1024,
      img_height: 1024,
      base64: false,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': api_key,
        },
        responseType: 'arraybuffer',
      });

      // Convert the array buffer to base64
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
      setError(null);
    } catch (error) {
      setError(`Error while fetching Gen AI model API: ${error.message}`);
    } finally {
      const endTime = performance.now(); // Record end time
      const elapsedTime = endTime - startTime; // Calculate elapsed time in milliseconds
      setGenerationTime(elapsedTime); // Set the elapsed time in the state
      setLoading(false);
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
  
    switch (cardNumber) {
      case 1:
        cardContent = "LINE ART, An elegant woman in a 1920s flapper dress, pearls, and a feathered headband, capturing the Roaring Twenties, sleek black lines on a champagne paper, 2D sketched, stylish and ornate, jazz club in the backdrop, lively and decadent, reminiscent of Art Deco, chic, the Jazz Age embodied, detailed depiction of sequins and fringes, ornate backdrop, figure in a dynamic pose, emphasis on fashion, intricate, celebratory, golden age, graphic, precision in detailing, gleaming chandeliers above.";
        additionalTextForCard = "Negative Prompt(Prompts to exclude, eg. 'bad anatomy, bad hands, missing fingers'):scary, cartoon, painting ";
        break;
      case 2:
        cardContent = "Seaside Town, clay boats bobbing on the gentle waves, fisherfolk mending nets, seagulls overhead, captured in Craft Clay style.";
        additionalTextForCard = "Additional text for Card 2."; // boat
        break;
      case 3:
        cardContent = "STICKER, An energetic portrayal of a dancing cactus with a sombrero, amidst a desert sunset, warm twilight glow, summer festival 2024, gradient orange to purple hues, 3D digital drawing, cheerful and vibrant, desert fiesta theme, cartoon shading, glittering sand effect, using Autodesk SketchBook, sticker, 2D animated, lively desert, vector illustration, 2D front view, spotlighted by the setting sun, by Hayao Miyazaki, playful, bright, festive, graphic, outlined edges, vector design.";
        additionalTextForCard = "Additional text for Card 3."; //catus
        break;
      case 4:
        cardContent = "Fox, orange and white paper, pointed ears, curled tail, sly expression with sharp folded eyes.";
        additionalTextForCard = "Additional text for Card 4."; //fox
        break;
      // Add more cases for additional cards if needed
      case 5:
        cardContent = "Enchanted Library, a mysterious girl with flowing hair, reading an ancient tome, surrounded by floating books, illuminating runes, and curious magical creatures, depicted in Anime style, with soft, radiant glows, intricately patterned magical symbols, and the girl's expressive eyes capturing a sense of wonder.";
        additionalTextForCard = "Additional text for Card 4."; //moon girl
        break;
        case 6:
        cardContent = "Medieval Castle, standing tall on a hill, surrounded by a moat, with banners flying and a drawbridge leading to it, evoking feelings of chivalry and bygone eras, designed in Low Poly style, with angular structures, flat color regions, and clear geometric definitions without intricate carvings.";
        additionalTextForCard = "Additional text for Card 4."; //castle
        break;
        case 7:
        cardContent = "Tropical Resort, bungalows over clear waters, palm trees, sunbathers on sandy beaches, rendered in Isometric style.";
        additionalTextForCard = "Additional text for Card 4."; //beach
        break;
        case 8:
        cardContent = "WATERCOLOR, Flamenco dancer in mid-twirl, vivid reds and blacks of her attire, passion captured in her posture, warm oranges and yellows of stage lights, on high-quality watercolor paper, intense and dynamic, movement captured in swirling colors, inspired by Spanish traditions, energetic, ruffles of the dress given depth by color layering, spontaneous brushwork, with audience shadows hinted in background, dramatic, expressive, with splatters to emphasize the raw emotion.";
        additionalTextForCard = "Additional text for Card 4."; //dancing dress women
        break;
  
      default:
        break;
    }
  
    setModalContent(cardContent);
    setAdditionalText(additionalTextForCard);
    setModalOpen(true);
  };

  return (
   
    
    <div className="container mt-5">
      <Navbar/>

      {/* Left card with text area and Generate Image button */}
      <div className="card p-4 mt-3">
        <div className="text-center">
          <h1 className="mb-4">Axiom Mind</h1>
          <p>Unleash your creativity with Axiom Mind's image generation.</p>
          <p>Become the artist you always wanted to be.</p>
          <div className="card p-4 mt-3">
      <h2 className="mb-4">FEW TIPS</h2>

      <p>1. Use simple and common words like king, queen, knight, wizard, dragon.</p>

      <p>2. Your phrase needs to be specific. Take the “A rainbow-coloured butterfly flying across a field of flowers during a sunset” phrase as an example.</p>

      <p>3. Ensure you combine adjectives that best describe the image you want. Words like “Beautiful, colourful, detailed, intricate, massive, powerful”.</p>

      <p>4. If you want an art style, add the name of an artist. Names like Vincent Van Gogh, Picasso, Salvador Dali, M.C. Escher.</p>

      <p>5. Illustrate the style you want. Words like “Abstract, Contemporary, Cubism, Cyberpunk, Fantasy, Impressionism, Minimal, Modern, Realism, Surrealism” will help.</p>

      <p>6. For a more accurate result, be specific with the computer graphics type like Octane render, Unreal Engine, and Ray tracing.</p>
      
      <p>7. Share with others be creative and most importantly enjoy and have fun!</p>
    </div>

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
    style={{ height: "60px", width: "150px", marginLeft:"400px" }}
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
    <div className="spinner-border text-primary" style={{ width: "8rem", height: "8rem" }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)}

{/* Generation time display */}
{generationTime && (
          <div className="mt-3">
            <p>Generation Time: {`${(generationTime / 1000).toFixed(3)}s`}</p>
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
              style={{
                width: '100%',
                height: 'auto',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Add box shadow
              }}
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

        
      </div>

      

      {/* Bootstrap modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" >
            <div className="modal-header" style={{background:"black",color:"white"}}>
              <h5 className="modal-title" >Prompt Used For the Image</h5>
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

export default ImageGenerator;

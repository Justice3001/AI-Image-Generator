import React, { useState, useEffect } from "react";
import Deco from "../../img/Deco.jpg";

const GenerateTextPage = () => {
  const [customText, setCustomText] = useState("");
  const [result, setResult] = useState("");
  const [randomTexts, setRandomTexts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselRunning, setIsCarouselRunning] = useState(false);

  const apiKey = "AIzaSyAQa3mUUSnOYbkOQ5cGQxApEwcHhRNIj68";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${apiKey}`;

  const samplePrompts = [
    "Generate a captivating introduction for a blog post on artificial intelligence in healthcare.",
    "Craft a product description for a revolutionary smart home device that enhances security and convenience.",
    "Compose a creative and engaging social media caption for a travel agency promoting a tropical vacation package.",
    "Write an informative and concise summary of the benefits of adopting renewable energy sources for a sustainability report.",
    "Create a persuasive script for a video advertisement promoting a new fitness app that emphasizes its unique features.",
    "Develop a dialogue between two characters discussing the impact of technology on society in the next decade.",
    "Formulate a thought-provoking opening statement for a TED Talk on the future of virtual reality in education.",
    "Draft a product review for a cutting-edge tech gadget, highlighting its key features and user experience.",
    "Generate an attention-grabbing headline and subheading for a tech news article covering the latest advancements in artificial intelligence.",
    "Write a motivational quote for an inspirational poster encouraging creativity and innovation in the workplace.",
  ];

  const samplePrompts2 = [
    "Write a catchy slogan for a new coffee shop.",
    "Create a short description for a personal blog about travel adventures.",
    "Craft a fun and engaging tweet about your favorite hobby.",
    "Generate a brief introduction for a social media profile.",
    "Describe your ideal weekend getaway in just a few sentences.",
    "Write a brief dialogue between two friends making plans for the weekend.",
    "Create a caption for a photo of a delicious homemade meal.",
    "Summarize the plot of your favorite book in a few sentences.",
    "Write a short product review for a new smartphone.",
    "Come up with a headline for a news article about the benefits of laughter.",
  ];
  

  useEffect(() => {
    
    fetchRandomTexts();
  }, []);

  useEffect(() => {
    
    let intervalId;
    if (isCarouselRunning) {
      intervalId = setInterval(() => {
        handleSlide(currentIndex + 1);
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [currentIndex, isCarouselRunning]);

  const fetchRandomTexts = async () => {
    
    setRandomTexts(samplePrompts2);
  };

  const handleSlide = (index) => {
    setCurrentIndex(index >= randomTexts.length ? 0 : index);
  };

  const generateCustomText = () => {
    const requestData = {
      prompt: {
        text: customText,
      },
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const html = convertJsonToHtml(data);
        setResult(html);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const generateSampleText = (prompt) => {
    setCustomText(prompt);
    generateCustomText();
  };

  const generateRandomSample = () => {
    // Select a random prompt from samplePrompts2
    const randomPrompt = samplePrompts2[Math.floor(Math.random() * samplePrompts2.length)];
    // Set the customText state with the random prompt
    setCustomText(randomPrompt);
  };

  const convertJsonToHtml = (json) => {
    // Exclude safetyRatings
    delete json.candidates[0].safetyRatings;

    return `<div>${renderJson(json)}</div>`;
  };

  const renderJson = (json) => {
    let html = "";
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key];
        html += `<p><strong>${key}:</strong> ${
          typeof value === "object" ? renderJson(value) : value
        }</p>`;
      }
    }
    return html;
  };

  const startCarousel = () => {
    setIsCarouselRunning(true);
  };

  return (
    <div className="container justify-content-center align-items-center">
      <div className="card-deck">
        <div className="jumbotron text-center">
          <h1 className="display-4">Generative AI Writer (Experimental)</h1>
          <p className="lead">
            Experience the power of AI-driven content generation. Input your
            requirements, and our advanced algorithms will craft tailored,
            coherent, and contextually relevant content for you to review and
            edit collaboratively.
          </p>
        </div>

        <div className="card mb-3">
  <div className="card mb-3">
  <div className="card-body ">
    <h5 className="card-title text-center" > <strong>How It Works:</strong></h5>
    <ul className="list-unstyled" style={{ padding: 0 }}>
      <li className="mb-3">
        <strong>1. Input Your Requirements:</strong> Provide specific details
        about your project, including tone, style, and any key points you want
        to be covered.
      </li>
      <li className="mb-3">
        <strong>2. AI Content Generation:</strong> Our advanced AI algorithms
        get to work, analyzing your inputs to produce tailored, coherent, and
        contextually relevant content. You can adjust the response length and
        language to meet your preferences by specifying these requirements.
      </li>
      <li className="mb-3">
        <strong>3. Review and Edit:</strong> Preview the generated content and
        make any necessary edits. Our platform is designed to be collaborative,
        ensuring the final output meets your expectations. If you have any
        questions or need further customization, feel free to ask our chatbot.
      </li>
      <li className="mb-3">
        <strong>4. Adjust Response Length:</strong> Specify the desired length
        of the generated content by providing instructions like "Generate a
        short paragraph" or "Create a detailed article."
      </li>
      <li className="mb-3">
        <strong>5. Ask Questions:</strong> Our chatbot is very powerful and
        capable of answering all your questions. Feel free to ask anything,
        whether it's related to the content generation process, platform
        features, or general information. Here are a few examples to get you
        started:
        <ul>
          <li>"Tell me about popular tourist attractions in Paris."</li>
          <li>"What's the population of Tokyo?"</li>
          <li>"How fast can a cheetah run?"</li>
          <li>"Where is New York located?"</li>
          <li>"Explain the process of content generation in more detail."</li>
        </ul>
      </li>
    </ul>

    <button
      className="btn btn-primary mt-3"
      onClick={startCarousel}
    >
      See Sample Prompts
    </button>
  </div>
</div>

</div>


        <div className="card mb-3 text-center">
          <div className="card-body">
            <h5 className="card-title">Enter Custom Prompt Here:</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                generateCustomText();
              }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <div className="form-group">
                <label htmlFor="customText"></label>
                <input
                  type="text"
                  className="form-control"
                  id="customText"
                  placeholder="Type your text here"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  style={{
                    width: "200%",
                    marginRight: "700px",
                    maxWidth: "1000px",
                  }}
                />
              </div>

              <div className="form-group d-flex flex-row">
  <button
    type="submit"
    className="btn btn-primary mt-3 align-self-center"
    style={{marginRight:"10px"}}
  >
    Generate Text
  </button>

  {/* Button to fill input field with random prompt */}
  <button
    type="button"
    className="btn btn-secondary mt-3 ml-2 align-self-center"
    onClick={generateRandomSample}
  >
    Use Random Prompt
  </button>
</div>

            </form>
          </div>
        </div>

        {/* Card for the result output */}
        <div className="card mb-3">
          <h3>Output:</h3>
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>

        {/* Carousel Card with Image */}
        <div className="card mb-3">
          <div
            id="textCarousel"
            className="carousel slide"
            data-ride="carousel"
            style={{ maxHeight: "200px" }}
          >
            <div className="carousel-inner">
              {randomTexts.map((text, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  <div className="card-body">
                    <p className="card-text">
                      <strong>{text}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <a
              className="carousel-control-prev"
              href="#textCarousel"
              role="button"
              data-slide="prev"
              onClick={() => handleSlide(currentIndex - 1)}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#textCarousel"
              role="button"
              data-slide="next"
              onClick={() => handleSlide(currentIndex + 1)}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
            
          </div>
        </div>

        
      </div>


      <div className="card-deck ">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Sample Prompts</h5>
            <ul className="list-group">
              {samplePrompts.map((prompt, index) => (
                <li key={index} className="list-group-item">
                  {prompt}
                  <button
                    className="btn btn-link btn-sm"
                    onClick={() => generateSampleText(prompt)}
                  >
                    Use this
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateTextPage;

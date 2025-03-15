import { useState, useEffect } from "react";
import "./App.css";
import slangDictionary from "./slangDictionary";
import FunnyPopup from "./FunnyPopup";

const memes = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjL55abH9qyNgdr5xc9PcyY0AnKIjdZaDpGQ&s", // cat meme
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-VlS3dQFBm36YiDWSuiJMz4gfPDvAbDBsQ&s", //  cat meme
  "https://i.chzbgr.com/thumb800/24822789/h90ADC2E1/cat-lying-down-with-its-paws-crossed-let-me-explain-something-to-you-i-am-not-your-pet-you-are-mine", // Smiling cat meme
  "https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltcd74acc1d0a99f3a/blt0c8e0c8ad8266718/64ff5b6ddd584c0b3cdc28f4/max-fosh-uno.jpeg", // Uno reverse card meme
  "https://i.imgflip.com/4/2gnnjh.jpg", // Gru plan meme
  "https://i.imgflip.com/4/26am.jpg", // Distracted boyfriend meme
  "https://i.imgflip.com/4/4t0m5.jpg", // Expanding brain meme
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-Du8utHbu2hgbfY5B9v-NVtWzsut2-1xeg&s", // Woman yelling at cat meme
  "https://i.pinimg.com/736x/2e/14/f4/2e14f42c34b3012d3858121aee55b6c8.jpg", // powerbank meme
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCv0bEr9bOL3lPpd47V2n1f-5xKkpunR9hlg&s"  // Surprised Pikachu meme
];

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [randomMeme, setRandomMeme] = useState("");

  const preprocessText = (text) => {
    const words = text.split(" ");
    return words.map(word => slangDictionary[word.toLowerCase()] || word).join(" ");
  };

  const translateText = () => {
    const preprocessedText = preprocessText(inputText);
    setTranslatedText(preprocessedText);
  };

  useEffect(() => {
    const randomInterval = () => Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    const showRandomPopup = () => {
      setRandomMeme(memes[Math.floor(Math.random() * memes.length)]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    };
    
    const interval = setInterval(showRandomPopup, randomInterval());
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {showPopup && <FunnyPopup message={<img src={randomMeme} alt="Meme" style={{ maxWidth: "300px" }} />} onClose={() => setShowPopup(false)} />} 
      <h1>Brainrot Translator 🤪</h1>
      <textarea 
        placeholder="Type something normal..." 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={translateText}>Translate</button>
      <div className="output">
        <h2>Brainrot Version:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default App;

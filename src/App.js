import { useState, useEffect } from "react";
import "./App.css";
import slangDictionary from "./slangDictionary";
import FunnyPopup from "./FunnyPopup";

const memes = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjL55abH9qyNgdr5xc9PcyY0AnKIjdZaDpGQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-VlS3dQFBm36YiDWSuiJMz4gfPDvAbDBsQ&s",
  "https://i.chzbgr.com/thumb800/24822789/h90ADC2E1/cat-lying-down-with-its-paws-crossed-let-me-explain-something-to-you-i-am-not-your-pet-you-are-mine",
  "https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltcd74acc1d0a99f3a/blt0c8e0c8ad8266718/64ff5b6ddd584c0b3cdc28f4/max-fosh-uno.jpeg",
  "https://i.imgflip.com/4/2gnnjh.jpg",
  "https://i.imgflip.com/4/26am.jpg",
  "https://i.imgflip.com/4/4t0m5.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-Du8utHbu2hgbfY5B9v-NVtWzsut2-1xeg&s",
  "https://i.pinimg.com/736x/2e/14/f4/2e14f42c34b3012d3858121aee55b6c8.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCv0bEr9bOL3lPpd47V2n1f-5xKkpunR9hlg&s"
];

const soundEffects = [
  "https://www.myinstants.com/media/sounds/vine-boom.mp3",
  "https://www.myinstants.com/media/sounds/roblox-oof.mp3",
  "https://www.myinstants.com/media/sounds/metal_pipe.mp3",
  "https://www.myinstants.com/media/sounds/among-us-drip-theme.mp3",
  "https://www.myinstants.com/media/sounds/bruh.mp3"
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

  const playRandomSound = () => {
    const randomSound = soundEffects[Math.floor(Math.random() * soundEffects.length)];
    const audio = new Audio(randomSound);
    audio.play();
  };

  useEffect(() => {
    const showRandomPopup = () => {
      setRandomMeme(memes[Math.floor(Math.random() * memes.length)]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    };

    const interval = setInterval(showRandomPopup, Math.random() * (10000 - 5000) + 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      playRandomSound();
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="app cartoonish">
      {showPopup && (
        <FunnyPopup 
          message={<img src={randomMeme} alt="Meme" className="meme-popup animated" />} 
          onClose={() => setShowPopup(false)} 
        />
      )} 
      <h1 className="title bubble-text">Brainrot Translator 🤪</h1>
      <textarea 
        className="text-area bubble-input"
        placeholder="Type something normal..." 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="translate-btn bubble-btn" onClick={translateText}>Translate</button>
      <div className="output bubble-output">
        <h2>Brainrot Version:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default App;

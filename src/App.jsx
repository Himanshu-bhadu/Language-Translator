import { useState, useEffect, useRef } from 'react';
import './App.css';

const language = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
};

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en-GB');
  const [targetLang, setTargetLang] = useState('hi-IN');
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const handleTranslate = async () => {
    if (sourceLang === targetLang) {
      alert("SELECTED SAME LANGUAGE TO TRANSLATE!!!!!");
      return;
    }

    setOutputText(inputText); // Show original text while loading

    try {
      const apiurl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLang}|${targetLang}`;
      const response = await fetch(apiurl);
      const data = await response.json();
      setOutputText(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setOutputText("Translation failed. Please try again.");
    }
  };

  const speakText = (text, lang) => {
    const speech = new SpeechSynthesisUtterance(text);
    
    if (lang) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === lang);
      if (voice) {
        speech.voice = voice;
      } else {
        alert("Voice not found for selected language");
      }
    }
    
    window.speechSynthesis.speak(speech);
  };

  const copyText = (ref) => {
    if (ref.current) {
      ref.current.select();
      document.execCommand('copy');
    }
  };

  useEffect(() => {
    // Load voices when component mounts
    window.speechSynthesis.getVoices();
  }, []);

  return (
    <div className="container">
      <div className="box">
        <h1>Language Translator</h1>
        
        <div className="content">
          {/* Input Section */}
          <div className="input">
            <div className="textcontainer">
              <textarea 
                ref={text1Ref}
                id="text1" 
                placeholder="Write what you want to Translate"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <img 
                src="https://www.svgrepo.com/show/524469/copy.svg" 
                className="icon copy1" 
                alt="Copy"
                onClick={() => copyText(text1Ref)}
              />
              <img 
                src="https://www.svgrepo.com/show/486849/sound-loud.svg" 
                className="icon sound1" 
                alt="Speak"
                onClick={() => speakText(inputText)}
              />
            </div>
            
            <select 
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {Object.entries(language).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
          
          {/* Transfer Button */}
          <div className="image">
            <button id="transfer" onClick={handleTranslate}>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthtwBNonyRxnS_iV2DKSN2wneMXzqL10R1g&s" 
                alt="Translate" 
              />
            </button>
          </div>
          
          {/* Output Section */}
          <div className="output">
            <div className="textcontainer">
              <img 
                src="https://www.svgrepo.com/show/486849/sound-loud.svg" 
                className="icon sound2" 
                alt="Speak"
                onClick={() => speakText(outputText, targetLang)}
              />
              <img 
                src="https://www.svgrepo.com/show/524469/copy.svg" 
                className="icon copy2" 
                alt="Copy"
                onClick={() => copyText(text2Ref)}
              />
              <textarea 
                ref={text2Ref}
                id="text2" 
                placeholder="Converted Language"
                value={outputText}
                readOnly
              />
            </div>
            
            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {Object.entries(language).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 
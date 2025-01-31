"use client";
import { useState } from "react";
import { Loader2, Mic, Volume2, RefreshCcw, ArrowLeftRight } from "lucide-react";

export default function Translator() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("si");
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "si", name: "Sinhala" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "pa", name: "Punjabi" },
    { code: "ur", name: "Urdu" },
    { code: "vi", name: "Vietnamese" },
    { code: "tr", name: "Turkish" },
    { code: "nl", name: "Dutch" },
    { code: "pl", name: "Polish" },
    { code: "th", name: "Thai" },
    { code: "sv", name: "Swedish" },
    { code: "fi", name: "Finnish" },
    { code: "el", name: "Greek" },
    { code: "he", name: "Hebrew" }
  ];

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const translateText = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation API Error:", error);
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = sourceLang;
    recognition.start();
    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
  };

  const speakTranslation = () => {
    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = targetLang;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 flex flex-col gap-6 border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-blue-600">Translator</h1>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        rows={4}
        placeholder="Enter text or use voice input..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <button onClick={handleSpeechRecognition} className="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2 hover:bg-gray-800">
          <Mic size={18} /> Voice Input
        </button>
        <button onClick={() => setText("")} className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2 hover:bg-red-600">
          <RefreshCcw size={18} /> Clear
        </button>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div>
          <label className="block text-gray-600 font-medium">From</label>
          <select className="border border-gray-300 p-2 rounded-md w-full" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.name}</option>))}
          </select>
        </div>
        <button onClick={swapLanguages} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
          <ArrowLeftRight size={24} />
        </button>
        <div>
          <label className="block text-gray-600 font-medium">To</label>
          <select className="border border-gray-300 p-2 rounded-md w-full" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.name}</option>))}
          </select>
        </div>
      </div>
      <button onClick={translateText} className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full text-lg" disabled={loading || !text.trim()}>
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Translate"}
      </button>
      {translatedText && (
        <div className="bg-gray-100 p-4 rounded-md border-l-4 border-blue-500">
          <h2 className="text-gray-700 font-semibold">Translation:</h2>
          <p className="text-lg text-gray-800">{translatedText}</p>
          <button onClick={speakTranslation} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600">
            <Volume2 size={18} /> Listen
          </button>
        </div>
      )}
    </div>
  );
}

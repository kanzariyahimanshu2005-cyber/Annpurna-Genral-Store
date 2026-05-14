import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Bot, Sparkles, Mic, Loader2, Utensils, IndianRupee, Languages, Receipt } from "lucide-react";
import { useCart } from "../context/CartContext";

// Ensure AI client uses the correct API key from standard Vite variables or direct assignment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", text: "Hi! I'm your AI Shopping Assistant. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("English");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Gather context
      const cartContext = cart.length > 0 
        ? `Current Cart: ${cart.map(i => `${i.quantity}x ${i.name}`).join(", ")}.` 
        : "Cart is empty.";
      
      const ordersStr = localStorage.getItem("user_orders") || "[]";
      let pastOrdersContext = "";
      try {
        const orders = JSON.parse(ordersStr);
        if (orders.length > 0) {
          const items = orders.flatMap((o: any) => o.items.map((i: any) => i.name));
          pastOrdersContext = `Past purchase history includes: ${Array.from(new Set(items)).join(", ")}.`;
        }
      } catch(e) {}

      const promptContext = `
        You are a highly intelligent, helpful grocery shopping assistant. You help users plan meals, find products, detect low-stock items based on their history, suggest budget-friendly alternatives, and provide nutritional info.
        The user wants to converse in: ${language} (if it is Hindi or Gujarati, please reply strictly in that language, but keep product names recognizable).
        Context:
        - ${cartContext}
        - ${pastOrdersContext}
        
        Keep answers concise, friendly, and formatted nicely in markdown or plain text. 
      `;

      // Call Gemini using the specified pattern
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: promptContext,
          temperature: 0.7,
        },
      });

      // Pass previous history minus the initial greeting
      const historyItems = messages.slice(1).map(msg => `${msg.role === 'user' ? 'User: ' : 'You: '}${msg.text}`);
      const fullHistoryStr = historyItems.join('\n');
      
      const combinedInput = fullHistoryStr 
        ? `Previous conversation summary:\n${fullHistoryStr}\n\nCurrent User input:\n${text}`
        : text;

      const response = await chat.sendMessage({ message: combinedInput });
      
      const newModelMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "model", 
        text: response.text || "I'm sorry, I couldn't process that."
      };
      
      setMessages(prev => [...prev, newModelMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "model", text: "Sorry, I am having trouble connecting to my servers right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    handleSendMessage(actionText);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === "Hindi" ? "hi-IN" : language === "Gujarati" ? "gu-IN" : "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setInputMessage(speechResult);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition isn't supported in your browser.");
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "English" ? "Hindi" : prev === "Hindi" ? "Gujarati" : "English");
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AI Shopping Assistant</h3>
                  <p className="text-xs text-gray-400">Online • Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleLanguage}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors title='Change Language'"
                  title={`Current: ${language}`}
                >
                  <Languages className="w-4 h-4" />
                  <span className="sr-only">Toggle Language</span>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/20 text-cyan-50 border border-cyan-500/30' 
                      : 'bg-white/5 text-gray-200 border border-white/10'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-medium tracking-wide">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions / Custom Chips */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar py-2">
              <button onClick={() => handleQuickAction("Plan a meal for me based on my cart items")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium hover:bg-orange-500/20 transition-colors">
                <Utensils className="w-3.5 h-3.5" /> Plan Meals
              </button>
              <button onClick={() => handleQuickAction("What household items might I be running low on based on past orders?")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors">
                <Receipt className="w-3.5 h-3.5" /> Predict Low Stock
              </button>
              <button onClick={() => handleQuickAction("Suggest budget-friendly alternatives for the items in my cart.")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">
                <IndianRupee className="w-3.5 h-3.5" /> Budget Mode
              </button>
              <button onClick={() => handleQuickAction("Can you provide nutrition recommendations for my current cart?")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors">
                <Sparkles className="w-3.5 h-3.5" /> Nutrition Check
              </button>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2 py-1 focus-within:border-cyan-500/50 transition-colors">
                <button 
                  onClick={startVoiceRecognition}
                  className={`p-2 rounded-lg transition-colors ${isListening ? 'text-red-400 bg-red-400/10 animate-pulse' : 'text-gray-400 hover:text-white'}`}
                  title="Voice command"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputMessage);
                    }
                  }}
                  placeholder={`Ask me anything in ${language}...`}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 py-2.5"
                  disabled={isTyping}
                />
                <button 
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <Send className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

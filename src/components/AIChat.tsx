
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatProps {
  userId?: string;
  onGenerateGuide?: (topic: string) => void;
}

const AIChat = ({ userId, onGenerateGuide }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your personal GlamBot assistant! 💄✨ I'm here to help you with all your makeup needs. Ask me about:\n\n🎨 Makeup techniques for your skin type\n💋 Product recommendations\n🌟 Occasion-specific looks\n📚 Step-by-step tutorials\n🔍 Skin analysis and care\n\nWhat would you like to know about makeup today?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "What's the best foundation for oily skin?",
        "How do I create a natural everyday look?",
        "What makeup suits a wedding?",
        "Help me with eye makeup for beginners"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Makeup-specific responses based on keywords
    if (lowerMessage.includes('skin type') || lowerMessage.includes('oily') || lowerMessage.includes('dry') || lowerMessage.includes('combination')) {
      const responses = [
        "For oily skin, I recommend oil-free, matte foundations with salicylic acid. Try powder foundations or long-wear liquid formulas. Don't forget a mattifying primer! Would you like specific product recommendations?",
        "Dry skin needs hydrating foundations with hyaluronic acid or glycerin. Look for dewy or luminous finishes, and always use a moisturizing primer. Cream blushes work better than powder for dry skin.",
        "Combination skin can be tricky! Use a mattifying primer on your T-zone and a hydrating one on dry areas. Consider mixing foundation formulas or using different products for different face zones."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('eye') || lowerMessage.includes('eyeshadow') || lowerMessage.includes('eyeliner')) {
      const responses = [
        "For beginner eye makeup: Start with neutral eyeshadows, use an eyeshadow primer, blend in windshield wiper motions, and practice thin eyeliner lines. Would you like a step-by-step tutorial?",
        "Eye makeup tips: Use transition shades to blend, apply shimmer to the center of lids for brightness, and don't forget to curl your lashes before mascara! What's your eye shape?",
        "Creating depth: Use a darker shade in the outer V, highlight the inner corners and brow bone, and blend everything seamlessly. Practice makes perfect!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes('wedding') || lowerMessage.includes('special occasion') || lowerMessage.includes('party')) {
      return "For special occasions, go for long-wearing, photo-friendly makeup! Use primer, setting powder, and setting spray. Choose slightly more dramatic looks than everyday - think defined eyes, perfect base, and long-lasting lip color. Would you like me to create a custom guide for your event?";
    }
    
    if (lowerMessage.includes('beginner') || lowerMessage.includes('start') || lowerMessage.includes('basic')) {
      return "Welcome to makeup! Start with: 1) Good skincare routine, 2) Tinted moisturizer or light foundation, 3) Concealer for blemishes, 4) Mascara, 5) Neutral eyeshadow, 6) Lip balm or tinted lip product. Build your skills gradually and have fun experimenting!";
    }
    
    if (lowerMessage.includes('product') || lowerMessage.includes('recommend')) {
      return "I'd love to recommend products! First, tell me your skin type, budget range, and any specific concerns. Are you looking for drugstore or high-end options? What's the specific product category you need help with?";
    }

    // Default responses
    const defaultResponses = [
      "That's a great makeup question! Based on your query, I'd recommend focusing on products that match your skin tone and type. Would you like me to help you identify your undertones?",
      "Makeup is all about enhancing your natural beauty! For the best results, always start with clean, moisturized skin. What specific look are you trying to achieve?",
      "Every makeup look starts with good preparation! Make sure to prep your skin, use quality brushes, and blend well. What's your current makeup routine like?",
      "Beauty is personal, and makeup should make YOU feel confident! I can help you find techniques that work for your features. Would you like personalized recommendations?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Check if we should suggest generating a guide
      if (inputValue.toLowerCase().includes('guide') || inputValue.toLowerCase().includes('tutorial') || inputValue.toLowerCase().includes('how to')) {
        toast({
          title: "💡 Generate Custom Guide",
          description: "Would you like me to create a personalized guide based on our conversation?",
          action: (
            <Button 
              size="sm" 
              onClick={() => onGenerateGuide?.(inputValue)}
              className="bg-neon-green/20 text-neon-green hover:bg-neon-green/30 border border-neon-green/50"
            >
              <Wand2 className="h-3 w-3 mr-1" />
              Create Guide
            </Button>
          ),
        });
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing your request right now. Please try again in a moment! 💄",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] glass-effect rounded-lg border border-white/20">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-neon-pink/20 flex items-center justify-center border border-neon-pink/50">
            <Bot className="h-5 w-5 text-neon-pink animate-glow" />
          </div>
          <div>
            <h3 className="font-semibold text-neon-pink neon-text">GlamBot AI</h3>
            <p className="text-xs text-white/60">Your Personal Makeup Assistant</p>
          </div>
        </div>
        <Sparkles className="h-5 w-5 text-neon-cyan animate-float" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                message.isUser 
                  ? 'bg-neon-blue/20 border-neon-blue/50' 
                  : 'bg-neon-pink/20 border-neon-pink/50'
              }`}>
                {message.isUser ? (
                  <User className="h-4 w-4 text-neon-blue" />
                ) : (
                  <Bot className="h-4 w-4 text-neon-pink" />
                )}
              </div>
              <div className={`chat-bubble rounded-lg p-3 ${
                message.isUser 
                  ? 'bg-neon-blue/10 border-neon-blue/30' 
                  : 'bg-neon-pink/10 border-neon-pink/30'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <span className="text-xs text-white/50 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                
                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-white/70 mb-2">Try asking:</p>
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs bg-white/5 border-white/20 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all duration-300"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-neon-pink/20 border border-neon-pink/50 flex items-center justify-center">
                <Bot className="h-4 w-4 text-neon-pink" />
              </div>
              <div className="chat-bubble bg-neon-pink/10 border-neon-pink/30 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about makeup..."
            className="flex-1 bg-white/5 border-white/20 focus:border-neon-pink/50 focus:ring-neon-pink/50 text-white placeholder-white/50"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-neon-pink/20 text-neon-pink border border-neon-pink/50 hover:bg-neon-pink/30 hover:scale-105 transition-all duration-300 neon-glow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

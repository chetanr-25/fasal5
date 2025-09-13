import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Bot, User, Loader2, Minimize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { chatService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: language === 'hi' 
        ? 'नमस्ते! मैं आपका कृषि सलाहकार हूं। मैं फसल, मिट्टी, मौसम और कृषि से संबंधित किसी भी प्रश्न में आपकी सहायता कर सकता हूं।'
        : 'Hello! I\'m your agriculture advisor. I can help you with questions about crops, soil, weather, and farming practices.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // In a real implementation, we would call the API
      // const response = await chatService.sendMessage(newMessage);
      // const botResponse = response.reply; // Assuming the response structure matches our API
      
      // For now, use mock response until backend is fully connected
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponse = generateBotResponse(newMessage, language);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = language === 'hi' ? [
    "मेरी फसल में पीले पत्ते हैं",
    "गेहूं की बुआई का सही समय क्या है?",
    "मिट्टी का pH कैसे सुधारें?",
    "कीट नियंत्रण के उपाय"
  ] : [
    "My crop has yellow leaves",
    "Best time to plant wheat?",
    "How to improve soil pH?",
    "Pest control measures"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          variant="floating"
          size="icon-lg"
          className="fixed bottom-6 right-6 z-50 shadow-[var(--shadow-glow)]"
          onClick={onToggle}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] z-50 shadow-[var(--shadow-hero)] flex flex-col">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className={`text-lg ${language === 'hi' ? 'font-hindi' : ''}`}>
              {t('chatWithExpert')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onToggle} className="text-primary-foreground hover:bg-primary-foreground/20">
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggle} className="text-primary-foreground hover:bg-primary-foreground/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[75%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted text-foreground'
                    } ${language === 'hi' ? 'font-hindi' : ''}`}
                  >
                    {message.content}
                  </div>

                  {message.isUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted text-foreground p-3 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{language === 'hi' ? 'सोच रहा हूं...' : 'Thinking...'}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t">
                <div className="text-sm font-medium mb-2 text-muted-foreground">
                  {language === 'hi' ? 'त्वरित प्रश्न:' : 'Quick Questions:'}
                </div>
                <div className="space-y-2">
                  {quickQuestions.slice(0, 2).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`w-full text-left justify-start h-auto whitespace-normal text-xs ${language === 'hi' ? 'font-hindi' : ''}`}
                      onClick={() => setNewMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <form onSubmit={handleSend} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t('askQuestion')}
                  className={`flex-1 ${language === 'hi' ? 'font-hindi' : ''}`}
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  variant="default" 
                  size="icon"
                  disabled={!newMessage.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}

// Mock AI response generator - will be replaced by API call when backend is connected
function generateBotResponse(userMessage: string, language: string): string {
  const message = userMessage.toLowerCase();

  const responses = {
    hi: {
      yellow_leaves: "पीले पत्ते कई कारणों से हो सकते हैं:\n\n1. नाइट्रोजन की कमी - यूरिया का छिड़काव करें\n2. पानी की कमी या अधिकता\n3. कीट-रोग की समस्या\n\nमैं सुझाता हूं कि आप अपने नजदीकी कृषि विशेषज्ञ से मिलें।",
      wheat_planting: "गेहूं की बुआई का सबसे अच्छा समय:\n\n🌾 उत्तर भारत: नवंबर का दूसरा पखवाड़ा\n🌾 मध्य भारत: नवंबर अंत से दिसंबर प्रारंभ\n🌾 दक्षिण भारत: दिसंबर का पहला सप्ताह\n\nमिट्टी का तापमान 18-20°C होना चाहिए।",
      soil_ph: "मिट्टी का pH सुधारने के उपाय:\n\n🧪 अम्लीय मिट्टी के लिए: चूना (लाइम) डालें\n🧪 क्षारीय मिट्टी के लिए: जिप्सम और जैविक खाद डालें\n🧪 नियमित मिट्टी की जांच कराएं\n\nआदर्श pH: 6.0-7.5",
      pest_control: "कीट नियंत्रण के प्रभावी उपाय:\n\n🐛 निम का तेल स्प्रे करें\n🐛 जैविक कीटनाशक का उपयोग करें\n🐛 फसल चक्र अपनाएं\n🐛 साफ-सफाई रखें\n\nरासायनिक दवाइयों का सीमित उपयोग करें।",
      default: "कृषि संबंधी आपका प्रश्न बहुत दिलचस्प है। कृपया अधिक जानकारी दें ताकि मैं आपकी बेहतर सहायता कर सकूं। आप मुझसे फसल, मिट्टी, मौसम, कीट-रोग, और खाद के बारे में पूछ सकते हैं।"
    },
    en: {
      yellow_leaves: "Yellow leaves can occur due to several reasons:\n\n1. Nitrogen deficiency - Apply urea fertilizer\n2. Water stress (too much or too little)\n3. Pest or disease issues\n\nI recommend consulting with your local agricultural expert for proper diagnosis.",
      wheat_planting: "Best time to plant wheat:\n\n🌾 North India: Second fortnight of November\n🌾 Central India: Late November to early December\n🌾 South India: First week of December\n\nSoil temperature should be 18-20°C.",
      soil_ph: "Ways to improve soil pH:\n\n🧪 For acidic soil: Add lime\n🧪 For alkaline soil: Add gypsum and organic matter\n🧪 Regular soil testing is important\n\nIdeal pH range: 6.0-7.5",
      pest_control: "Effective pest control measures:\n\n🐛 Use neem oil spray\n🐛 Apply organic pesticides\n🐛 Practice crop rotation\n🐛 Maintain field hygiene\n\nUse chemical pesticides judiciously.",
      default: "That's an interesting agricultural question! Please provide more details so I can assist you better. You can ask me about crops, soil, weather, pests, diseases, and fertilizers."
    }
  };

  const langResponses = responses[language as keyof typeof responses] || responses.en;

  if (message.includes('yellow') || message.includes('पीले') || message.includes('पत्ते')) {
    return langResponses.yellow_leaves;
  }
  if (message.includes('wheat') || message.includes('गेहूं') || message.includes('बुआई')) {
    return langResponses.wheat_planting;
  }
  if (message.includes('ph') || message.includes('soil') || message.includes('मिट्टी')) {
    return langResponses.soil_ph;
  }
  if (message.includes('pest') || message.includes('कीट') || message.includes('control')) {
    return langResponses.pest_control;
  }

  return langResponses.default;
}
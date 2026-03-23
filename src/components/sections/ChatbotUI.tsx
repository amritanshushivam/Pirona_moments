'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: 'user' | 'bot' }>
  >([
    {
      id: '1',
      text: 'Hi! 👋 How can I help you with your wedding planning today?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: inputValue,
          sender: 'user',
        },
      ]);

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev: any[]) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: 'Thanks for your question! Our team will get back to you shortly. 😊',
            sender: 'bot',
          },
        ]);
      }, 500);

      setInputValue('');
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-premium-lg flex items-center justify-center hover:shadow-premium transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-8 z-40 w-96 max-w-[calc(100vw-2rem)]"
          >
            <Card className="h-96 md:h-[500px] bg-white rounded-3xl shadow-premium-lg overflow-hidden flex flex-col">
              {/* Header with Tabs */}
              <div className="bg-primary text-primary-foreground p-4 md:p-6">
                <h3 className="font-headline font-bold text-lg mb-4">Pirona Support</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30 font-body"
                    onClick={() => {
                      setMessages([
                        {
                          id: '1',
                          text: 'Hi! 👋 How can I help you with your wedding planning today?',
                          sender: 'bot',
                        }
                      ]);
                    }}
                  >
                    AI Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30 font-body"
                    onClick={() => {
                      setMessages([
                        {
                          id: '1',
                          text: 'Connecting you to a live agent... 🤝',
                          sender: 'bot',
                        },
                        {
                          id: '2',
                          text: 'Hello! I am a live agent. How can I assist you today?',
                          sender: 'bot',
                        }
                      ]);
                    }}
                  >
                    Live Agent
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message: any) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground'
                      } font-body text-sm`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-border p-4 flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask something..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 font-body"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 rounded-full"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

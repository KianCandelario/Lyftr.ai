"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { poppins, instrument_sans } from "@/lib/fonts/fonts";
import { Button } from "@/components/ui/button";
import MoreIcon from "@/components/chat/buttons/MoreIcon";
import StartNewConversation from "@/components/chat/buttons/StartNewConversation";
import ReactMarkdown from "react-markdown";

interface UserData {
  id: string;
  email: string;
}

interface Message {
  sender: string;
  content: string;
}

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageSender, setMessageSender] = useState<string>("user")
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user data from data attributes
    const container = document.querySelector("[data-user-id]");
    if (container) {
      const userId = container.getAttribute("data-user-id");
      const userEmail = container.getAttribute("data-user-email");

      if (userId && userEmail) {
        setUserData({ id: userId, email: userEmail });
        
        // Fetch existing messages for this user
        fetchExistingMessages(userId);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const last_message = messages[messages.length - 1];

      if (last_message.sender === userData?.id) {
        setMessageSender("user")
      }
      else {
        setMessageSender("bot")
      }
    }
  }, [messages]);
  
  const fetchExistingMessages = async (userId: string) => {
    try {
      const response = await fetch(`/api/messages?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data.map((msg: any) => ({
            sender: msg.sender,
            content: msg.content
          })));
        } else {
          console.error("Unexpected response format:", data);
        }
      } else {
        const errorData = await response.json();
        console.error("Error fetching messages:", errorData);
      }
    } 
    catch (err) {
      console.error("Failed to fetch existing messages:", err);
    }
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userData) return;
  
    const userMessage = { sender: userData.id, content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);
    setError(null);
    const currentInput = input;
    setInput("");
  
    try {
      // Send the message to the API
      const response = await fetch("/api/chatbot/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userData.id, prompt: currentInput }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }
      
      // Add bot response to messages
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: data.response },
      ]);
    } 
    catch (err) {
      console.error("Error in handleSendMessage:", err);
      setError("There was an error sending your message");
      // Remove the user message if there was an error
      setMessages((prev) => prev.slice(0, -1));
    } 
    finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = async () => {
    if (!userData) return;
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Start a new conversation
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userData.id }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to start new conversation");
      }
  
      // Clear local messages state
      setMessages([]);
    } 
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("There was an error starting a new conversation");
      }
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 mb-5">
          <h1 className={`${poppins.className} text-4xl font-bold`}>
            hello, I'm Lyftr.ai
          </h1>
          <h3 className={`${poppins.className} text-zinc-700`}>
            How can I help you today?
          </h3>
        </div>
        <Card className="shadow-md w-[60%]">
          <CardContent className="p-0">
            <div className="p-4 h-80 overflow-y-auto transition-all ease-in-out">
              {messages.map((msg, index) => (
                <div
                  className={`mb-2 ${msg.sender === "user" || msg.sender === userData?.id ? "text-right" : "text-left"} ${instrument_sans.className} text-xs transition-all ease-in-out`}
                  key={index}
                >
                  <span
                    className={`inline-block p-2 rounded-lg max-w-[75ch] leading-5 ${
                      msg.sender === "user" || msg.sender === userData?.id ? "bg-zinc-500 text-white" : "bg-gray-200 text-black"
                    } transition-all ease-in-out`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </span>
                </div>
              ))}
              {error && <div className="text-red-500 text-center p-2">{error}</div>}
            </div>
            <form onSubmit={handleSendMessage}>
              <Textarea
                className={`${instrument_sans.className}`}
                placeholder="Start asking..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <CardFooter className="flex justify-between p-4">
                <div className="flex items-center gap-2">
                  <StartNewConversation disabled={isLoading} handleNewConversation={handleNewConversation} />
                  <MoreIcon disabled={isLoading} />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  disabled={isLoading || !userData}
                >
                  {isLoading ? "Sending..." : <SendIcon />}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotPage;
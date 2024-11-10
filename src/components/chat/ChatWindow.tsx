import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image } from 'lucide-react';
import { format } from 'date-fns';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';

interface ChatWindowProps {
  taskId: string;
}

const ChatWindow = ({ taskId }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuthStore();
  const { messages, sendMessage, fetchMessages, markAsRead } = useChatStore();

  useEffect(() => {
    fetchMessages(taskId);
    markAsRead(taskId);
  }, [taskId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() && attachments.length === 0) return;

    try {
      // In real app, upload attachments first
      const attachmentUrls = attachments.map(file => URL.createObjectURL(file));
      await sendMessage(taskId, message, attachmentUrls);
      setMessage('');
      setAttachments([]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const taskMessages = messages[taskId] || [];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-lg font-semibold">Task Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {taskMessages.map((msg) => {
          const isOwnMessage = msg.senderId === user?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwnMessage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="break-words">{msg.content}</p>
                {msg.attachments?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.attachments.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt="Attachment"
                        className="max-w-full rounded"
                      />
                    ))}
                  </div>
                )}
                <span className={`text-xs ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                  {format(new Date(msg.timestamp), 'HH:mm')}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="relative group bg-gray-100 rounded p-2 flex items-center"
              >
                <Image className="h-4 w-4 mr-2" />
                <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t">
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            className="p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
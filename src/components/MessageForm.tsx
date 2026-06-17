"use client";

import { useState } from 'react';
import { Relationship } from '@/types';
import confetti from 'canvas-confetti';
import { Send } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (data: { senderName: string; relationship: Relationship; messageText: string }) => void;
}

const RELATIONSHIPS: Relationship[] = ["Waalid", "Walal", "Saaxib", "Xiriir", "Macallin", "Jaar"];

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState<Relationship | ''>('');
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !relationship || !messageText) return;

    onSubmit({
      senderName,
      relationship: relationship as Relationship,
      messageText
    });

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7A303F', '#D4AF37', '#FFFFFF']
    });

    // Reset form
    setSenderName('');
    setRelationship('');
    setMessageText('');
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] border border-burgundy/5 h-fit sticky top-8">
      <h2 className="font-serif text-2xl text-burgundy mb-6">Leave a Message</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-text-dark/70 mb-1.5 uppercase tracking-wide">Your Name</label>
          <input
            id="name"
            type="text"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="e.g. Aisha"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all text-sm"
          />
        </div>

        <div>
          <label htmlFor="relationship" className="block text-xs font-medium text-text-dark/70 mb-1.5 uppercase tracking-wide">Relationship</label>
          <select
            id="relationship"
            required
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as Relationship)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all text-sm appearance-none bg-white"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto' }}
          >
            <option value="" disabled>Select Relationship...</option>
            {RELATIONSHIPS.map(rel => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-medium text-text-dark/70 mb-1.5 uppercase tracking-wide">Your Message</label>
          <textarea
            id="message"
            required
            maxLength={500}
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Share your wishes..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all text-sm resize-none"
          />
          <div className="text-right text-[10px] text-text-dark/40 mt-1">
            {messageText.length}/500
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-burgundy hover:bg-burgundy-hover text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-burgundy/20"
        >
          <Send size={16} />
          Post Message
        </button>
      </form>
    </div>
  );
}

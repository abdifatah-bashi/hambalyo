import { Message } from '@/types';

interface MessageCardProps {
  message: Message;
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-burgundy/5 flex flex-col justify-between hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-300">
      <p className="text-text-dark/90 text-[15px] leading-relaxed mb-8 italic">
        "{message.messageText}"
      </p>
      
      <div className="flex items-end justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-burgundy">{message.senderName}</h3>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-wider">
          {message.relationship}
        </div>
      </div>
    </div>
  );
}

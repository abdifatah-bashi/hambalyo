"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MessageForm from '@/components/MessageForm';
import MessageCard from '@/components/MessageCard';
import { useMessages } from '@/hooks/useMessages';

export default function Home() {
  const { messages, addMessage, isLoaded } = useMessages();

  return (
    <>
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <MessageForm onSubmit={addMessage} />
          </div>

          {/* Right Column: Message Wall */}
          <div className="lg:col-span-8">
            {!isLoaded ? (
              <div className="flex items-center justify-center h-64 text-burgundy/50">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-xl font-serif text-burgundy mb-2">No messages yet</p>
                <p className="text-text-dark/60">Be the first to leave a wish for the happy couple!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
                {messages.map(msg => (
                  <MessageCard key={msg.id} message={msg} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { Message, Relationship } from '@/types';
import { supabase } from '@/lib/supabase';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
      } else if (data) {
        setMessages(data as Message[]);
      }
      setIsLoaded(true);
    };

    fetchMessages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          setMessages((prev) => {
            const newMsg = payload.new as Message;
            // Avoid duplicate from optimistic update
            if (prev.some(m => m.id === newMsg.id)) {
              return prev;
            }
            return [newMsg, ...prev].sort((a, b) => b.createdAt - a.createdAt);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addMessage = async (data: { senderName: string; relationship: Relationship; messageText: string }) => {
    const tempId = crypto.randomUUID();
    const newMessage: Message = {
      id: tempId,
      ...data,
      createdAt: Date.now(),
    };
    
    // Optimistic UI update
    setMessages(prev => [newMessage, ...prev].sort((a, b) => b.createdAt - a.createdAt));

    // Insert to Supabase
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          id: tempId,
          senderName: data.senderName,
          relationship: data.relationship,
          messageText: data.messageText,
          createdAt: newMessage.createdAt,
        }
      ]);

    if (error) {
      console.error('Error adding message:', error);
      // Revert optimistic update on error
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    }
  };

  return {
    messages,
    addMessage,
    isLoaded
  };
}

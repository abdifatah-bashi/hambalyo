-- Create the messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "senderName" TEXT NOT NULL,
  relationship TEXT NOT NULL,
  "messageText" TEXT NOT NULL,
  "createdAt" BIGINT NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous access for this use case
-- (Since anyone can view and post messages without logging in)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON messages FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Enable Realtime for the messages table
-- This is required for the live sync to work
begin;
  -- remove the supabase_realtime publication if it exists
  drop publication if exists supabase_realtime;

  -- re-create the publication
  create publication supabase_realtime;
commit;

-- Add the messages table to the publication
alter publication supabase_realtime add table messages;

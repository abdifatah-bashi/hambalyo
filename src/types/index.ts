export type Relationship = "Waalid" | "Walal" | "Saaxib" | "Xiriir" | "Macallin" | "Jaar";

export interface Message {
  id: string;
  senderName: string;
  relationship: Relationship;
  messageText: string;
  createdAt: number;
}

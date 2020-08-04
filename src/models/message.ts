export interface Message {
  id: string;
  type: MessageType;
  language: MessageLanguageType;
  text: string;
}

export type MessageLanguageType = "da" | "en";

export type MessageType = "newmembercompletion";

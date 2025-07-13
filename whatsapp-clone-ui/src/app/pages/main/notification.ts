export interface Notification {
  chatId?: string;
  content?: string;
  senderId?: string;
  receiverId?: string;
  messageType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO';
  type?: 'SEEN' | 'IMAGE' | 'MESSAGE' | 'VIDEO' | 'AUDIO';
  chatName?: string;
  media?: Array<string>;
}

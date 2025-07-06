import { Component, OnInit } from '@angular/core';
import {ChatListComponent} from '../../components/chat-list/chat-list.component';
import {ChatResponse} from '../../services/models/chat-response';
import {ChatService} from '../../services/services/chat.service';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';
import { MessageService } from '../../services/services/message.service';
import { MessageResponse } from '../../services/models/message-response';
import {DatePipe} from '@angular/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-main',
  imports: [
    ChatListComponent,
    DatePipe,
    PickerComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

    chats: Array<ChatResponse> = [];
    selectedChat: ChatResponse = {} as ChatResponse;
    chatMessages: MessageResponse[] = [];
    showEmojis: boolean = false;

    constructor(
      private chatService: ChatService,
      private keycloakService: KeycloakService,
      private messageService: MessageService
    ) {}

    ngOnInit(): void {
      this.getAllChats();
    }

    private getAllChats() {
      this.chatService.getChatsByReceiver()
        .subscribe({
          next: (res) => {
            this.chats = res;
          }
        })
    }

    logout() {
      this.keycloakService.logout();
    }

    userProfile() {
      this.keycloakService.accountManagement();
    }

    chatSelected(chat: ChatResponse) {
      this.selectedChat = chat;
      this.getAllChatMessages(chat.id as string);
     // this.setMessagesToSeen();
     // this.selectedChat.unreadCount = 0;
    }
  
    private getAllChatMessages(chatId: string) {
      this.messageService.getMessages({"chat-id": chatId})
        .subscribe({
          next: (messages) => {
            this.chatMessages = messages;
          },
          error: (err) => {
            console.error('Error fetching messages:', err);
          }
        });
    }

    private setMessagesToSeen() {
      throw new Error('Method not implemented.');
    }

    isSelfMessage(message: MessageResponse): boolean {
      return message.senderId === this.keycloakService.userId;
    }

    uploadMedia(event: EventTarget | null) {
      
      
    }

    onSelectEmojis(emojiSelected: any) {
      
    }
}

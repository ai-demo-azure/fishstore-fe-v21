import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fish } from '../services/fish';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule, MarkdownComponent],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class ChatbotComponent {
  isLoading = signal(false);
  isOpen = signal(false); // Trạng thái đóng/mở chat
  userInput = signal('');
  messages = signal<{ role: string; text: string }[]>([
    { role: 'bot', text: 'Xin chào! Tôi là trợ lý FishStore. Tôi có thể giúp gì cho bạn?' },
  ]);

  constructor(private fishService: Fish) {}

  toggleChat() {
    this.isOpen.update((v) => !v);
  }

  async sendMessage() {
    if (!this.userInput().trim()) return;

    const question = this.userInput();
    // Thêm tin nhắn user vào danh sách
    this.messages.update((m) => [...m, { role: 'user', text: question }]);
    this.userInput.set('');
    this.isLoading.set(true);
    // Gọi service
    this.fishService.askChatbot(question).subscribe({
      next: (answer: string) => {
        const cleanAnswer = answer.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
        this.messages.update((m) => [...m, { role: 'bot', text: cleanAnswer }]);
      },
      error: () => {
        this.messages.update((m) => [...m, { role: 'bot', text: 'Lỗi rồi!' }]);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}

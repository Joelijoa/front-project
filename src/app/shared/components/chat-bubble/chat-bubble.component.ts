import { Component, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Message {
    content: string;
    timestamp: Date;
    sender: 'user' | 'bot';
}

@Component({
    selector: 'app-chat-bubble',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-bubble.component.html',
    styleUrls: ['./chat-bubble.component.scss'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ transform: 'translateY(20px)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateY(20px)', opacity: 0 }))
            ])
        ])
    ]
})
export class ChatBubbleComponent implements AfterViewChecked {
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
    
    showChat = false;
    currentMessage = '';
    isTyping = false;
    private shouldScroll = false;
    messages: Message[] = [
        {
            content: 'Bonjour ! Comment puis-je vous aider ?',
            timestamp: new Date(),
            sender: 'bot'
        }
    ];

    constructor(private cdr: ChangeDetectorRef) {}

    onToggleChat(): void {
        this.showChat = !this.showChat;
        if (this.showChat) {
            this.shouldScroll = true;
            this.cdr.detectChanges();
        }
    }

    onSendMessage(event: Event): void {
        event.preventDefault();
        if (this.currentMessage.trim()) {
            // Ajouter le message de l'utilisateur
            this.messages.push({
                content: this.currentMessage.trim(),
                timestamp: new Date(),
                sender: 'user'
            });

            // Réinitialiser le message
            this.currentMessage = '';

            // Indiquer qu'un défilement est nécessaire
            this.shouldScroll = true;

            // Simuler la réponse du bot
            this.isTyping = true;
            setTimeout(() => {
                this.isTyping = false;
                this.messages.push({
                    content: 'Bonjour, un agent prendra contact avec vous dans quelques minutes...',
                    timestamp: new Date(),
                    sender: 'bot'
                });
                this.shouldScroll = true;
                this.cdr.detectChanges();
            }, 2000);
        }
    }

    private scrollToBottom(): void {
        if (this.scrollContainer && this.scrollContainer.nativeElement && this.shouldScroll) {
            try {
                this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
                this.shouldScroll = false;
            } catch (err) {
                console.error('Erreur lors du défilement:', err);
            }
        }
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }
} 
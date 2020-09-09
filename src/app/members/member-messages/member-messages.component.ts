import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId:number;
  messages: Message[] = [];
  newMessage: any = {};
  constructor(private userService: UserService, private authService: AuthService, private alerify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages()
  {
    const currentId = +this.authService.decodedToken.nameid;
      this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          for(let i=0;i<messages.length;i++){
            if(messages[i].isRead === false && messages[i].recipientId === currentId){
              this.userService.markAsRead(currentId, messages[i].id);
            }
          }
        })
      )
      .subscribe(messages =>{
        console.log(messages);
        this.messages = messages;
      }, error => {
        this.alerify.error(error);
      });
  }

  sendMessage()
  {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) =>{
      console.log(message);
      debugger;
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alerify.error(error);
    })
  }

}
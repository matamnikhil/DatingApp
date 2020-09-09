import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/Message';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessage(){
    this.userService.getMessage(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteMessage(id: number)
  {
    this.alertify.confirm('Are you sure you want to delete this meg',()=>{
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(()=>{
        console.log(this.messages);
        debugger;
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('message deleted');
      }, error => {
        this.alertify.error('failed message deleted');
      })
    })
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessage();
  }

}

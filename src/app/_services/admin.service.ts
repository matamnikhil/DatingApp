import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PhotoEditorComponent } from '../members/photo-editor/photo-editor.component';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsersWithRoles(){
  return this.http.get(this.baseUrl + 'admin/UsersWithRoles');
}

updateUserRoles(user: User, roles:{}){
  return this.http.post(this.baseUrl + 'admin/editRoles/'+user.userName, roles);
}

getPhotosForApproval(){
  return this.http.get(this.baseUrl + 'admin/photoForModeration');
}

approvePhoto(photoId){
  debugger;
  return this.http.get(this.baseUrl + 'admin/approvePhoto/'+photoId,{});
}

rejectPhoto(photoId){
  return this.http.post(this.baseUrl + 'admin/rejectPhoto/'+photoId,{});
}
}

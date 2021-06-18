import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostPayload } from './post-payload';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
   url =  environment.baseUrl + "/posts";
  
  constructor(private httpClient: HttpClient) {

   }
   addPost(postPayload:PostPayload){
    return this.httpClient.post(this.url + "/create" ,postPayload);
   }
   getAllPost(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>(this.url + "/all");
   }
   getPost(permaLink:Number):Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(this.url + "/get/"+ permaLink);
   }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
  ) { }

  url = "http://127.0.0.1:8000/";
  getUrl(): any {
    return this.url;
  }
  
}
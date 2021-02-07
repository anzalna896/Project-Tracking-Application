import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';
import { List } from "./models/list.model";
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
list:List;
lis:List[];
  constructor(private webReqService:WebrequestService) { }
  createList(title: string,lang:string,pro:number) {
      // We want to send a web request to create a list
      return this.webReqService.post('lists', { title,lang,pro });
    }
getList(){
  return this.webReqService.get('lists');
}
updateList(id: string, pro: string) {
  // We want to send a web request to update a list
  return this.webReqService.patch(`lists/${id}`, { pro });
}
}

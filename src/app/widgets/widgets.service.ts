import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Widget} from '../widget';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getWidgets() {
    return this.request('get', `${baseUrl}/widget`);
  }

  getWidget(id: string) {
    return this.request('get', `${baseUrl}/widget/${id}`);
  }

  createWidget(widget: Widget) {
    console.log('createWidget ' + JSON.stringify(widget));
    return this.request('post', `${baseUrl}/widget`, widget);
  }

  updateWidget(widget: Widget) {
    console.log('updateWidget ' + JSON.stringify(widget));
    return this.request('post', `${baseUrl}/widget/${widget.id}`, widget);
  }

  deleteWidget(id: string) {
    return this.request('delete', `${baseUrl}/widget/${id}`);
  }
}

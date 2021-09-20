import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private http: HttpClient) {}

  score: number = 0;

  httpReq(apiUrl: string, url: string, params: any) {
    return this.http.get(apiUrl + url, params).pipe(map(
      (res: any) => {
        return res;
      },
      (err: any) => {
        console.log(err);
      }
    ));
  }

  test(){
    return this.httpReq(environment.url, '', {});
  }

  getSong(params: any) {
    return this.httpReq(environment.url, 'getSong', params);
  }
}

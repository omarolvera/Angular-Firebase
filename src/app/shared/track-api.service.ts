import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ITrack } from '../models/track';


@Injectable()
export class TrackApiService {
    private baseUrl = 'https://mtech-25ce6.firebaseio.com/'

    constructor(
        private http: HttpClient) {

    }

    getTracks():Observable<ITrack[]> {
        return  this.http.get<ITrack[]>(`${this.baseUrl}/tracks.json`)
                .map((res) => res);
      
    }

    updateTrack(item: ITrack, index: any, isNew: boolean) {
        let data = JSON.stringify(item);
        
            return  this.http.patch(`${this.baseUrl}/tracks/${index}.json`, data)
                    .map((response) => response)
         
    }

    addTrack(item: ITrack, index: any, isNew: boolean){
         let data = JSON.stringify(item);
          return   this.http.put(`${this.baseUrl}/tracks/${index}.json`,data)
                    .map((res) => res);
          
    }

}
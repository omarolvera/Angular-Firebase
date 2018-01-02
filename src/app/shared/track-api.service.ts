import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { map  } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ITrack } from '../models/track';


@Injectable()
export class TrackApiService {
    private baseUrl = 'https://mtech-25ce6.firebaseio.com/';

    constructor(
        private http: HttpClient) {

    }

    getTracks(): Observable<any> {
        return this.http.get<ITrack[]>(`${this.baseUrl}tracks.json`)
        .pipe(
            map((res) => res),
            catchError(this.handleError('Get tracks', this.baseUrl))
        );

    }

    updateTrack(item: ITrack, index: any, isNew: boolean) {
        const data = JSON.stringify(item);

        return this.http.patch(`${this.baseUrl}tracks/${index}.json`, data)
        .pipe(
            map((response) => response),
            catchError(this.handleError('Update track', this.baseUrl))
        );

    }

    addTrack(item: ITrack, index: any, isNew: boolean) {
        const data = JSON.stringify(item);
        return this.http.put(`${this.baseUrl}tracks/${index}.json`, data)
        .pipe(
            map((res) => res),
            catchError(this.handleError('Add track', this.baseUrl))
        );
    }

    private handleError(method: String, URL: string): any {
        return (err: any) => {
          const errMsg = `error in ${method}() retrieving ${URL}`;
          console.log(`${errMsg}:`, err);
          if (err instanceof HttpErrorResponse) {
            console.log(`status: ${err.status}, ${err.statusText}`);
          }
          return Observable.throw(errMsg);
        };
      }

}

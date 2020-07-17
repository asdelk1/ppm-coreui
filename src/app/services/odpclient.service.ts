import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {EntityRecord} from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class ODPClientService {

  private readonly BASE_END_POINT: string = 'http://localhost:8080/ppm-odata-provider/PpmService.svc/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public readEntitySet(entitySet: string, conditions?: string, expand?: string[]): Observable<any> {
    const url: string = this.BASE_END_POINT + entitySet;
    let params: HttpParams = new HttpParams();
    if (conditions) {
      // url += '?$filter=' + conditions;
      params = params.set('$filter', conditions);
    }

    if (expand) {
      params = params.set('$expand', expand.join(','));
    }

    return this.httpClient.get(url, {
      observe: 'body',
      params: params
    }).pipe(
      map((response) => {
          return this.getEntityResponse(response);
        }
      )
    );
  }

  public saveEntity(entitySet: string, record: EntityRecord): Observable<any> {
    const url: string = this.BASE_END_POINT + entitySet;
    return this.httpClient.post(url, record, {
      observe: 'body'
    }).pipe(
      map((response: Object) => this.getEntityResponse(response))
    );
  }

  // private getEntityRecord(response: Object): any {
  //   let singleton: boolean = false;
  //   let data: EntityRecord | EntityRecord[];
  //   if (response['value']) {
  //     data = [];
  //     for (const obj of Object.values(response['value'])) {
  //       data.push(obj as EntityRecord);
  //     }
  //   } else {
  //     singleton = true;
  //     data = {};
  //     for (const prop of Object.keys(response)) {
  //       data[prop] = response[prop];
  //     }
  //   }
  //   return {
  //     data: data,
  //     isSingleton: singleton,
  //     oDataContext: response['@odata.context']
  //   };
  // }

  public getEntityResponse(httpResponse: Object): any {
      let singleton: boolean = false;
      let data: EntityRecord | EntityRecord[];
      if (httpResponse['value']) {
        data = [];
        for (const obj of Object.values(httpResponse['value'])) {
          data.push(new EntityRecord(obj));
        }
      } else {
        singleton = true;
       data = new EntityRecord(httpResponse);
      }
      return {
        data: data,
        isSingleton: singleton,
        oDataContext: httpResponse['@odata.context']
      };
    }

}

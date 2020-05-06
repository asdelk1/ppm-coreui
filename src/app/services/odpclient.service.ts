import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {EntityRecord} from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class ODPClientService {

  private readonly BASE_END_POINT: string = 'http://localhost:8080/ppmodataprovider/PpmService.svc/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public readEntitySet(entitySet: string, conditions?: string): Observable<any> {
    let url: string = this.BASE_END_POINT + entitySet;
    if (conditions) {
      url += '?$filter=' + conditions;
    }
    return this.httpClient.get(url, {
      observe: 'body'
    }).pipe(
      map((response) => {
          let singleton: boolean = false;
          let data: EntityRecord | EntityRecord[];
          if (response['value']) {
            data = [];
            for (const obj of Object.values(response['value'])) {
              const record: EntityRecord = {};
              for (const prop of Object.keys(obj)) {
                record[prop] = obj[prop];
              }
              data.push(record);
            }
          } else {
            singleton = true;
            const record: EntityRecord = {};
            for (const prop of Object.keys(response)) {
              record[prop] = response[prop];
            }
          }
          return {
            data: data,
            isSingleton: singleton,
            oDataContext: response['@odata.context']
          };
        }
      )
    );
  }
}

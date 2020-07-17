export interface EntityResponse {
  data: EntityRecord | EntityRecord[];
  oDataContext: string;
  isSingleton: boolean;
}

export interface Entity {
  [name: string]: string | number | EntityRecord;
}


export class EntityRecord {
  private readonly entity: Entity = {};

  constructor(data: Object) {
    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'object') {
        const subEntity: EntityRecord = new EntityRecord(data[key]);
        this.entity[key] = subEntity;
      }
      this.entity[key] = data[key];
    }
  }

  public getProperty(name: string): EntityRecord | string | number | null {
    if (!this.entity[name]) {
      return null;
    }
    return this.entity[name];
  }

  public getEntityBody(): string {
    return JSON.stringify(this.entity);
  }

  public getEntity(): Entity {
    return this.entity;
  }

  public getId(): string | null {
    return this.entity && this.entity['entityId'] ? this.entity['entityId'] as string : null;
  }

  public setId(id: string): void {
    if (this.getId() === null) {
      this.entity['entityId'] = id;
    }
    // might need to throw an exception.
  }
}


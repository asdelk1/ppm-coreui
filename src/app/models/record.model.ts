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
        this.entity[key] = new EntityRecord(data[key]);
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

  public getEntity(): string {
    const primitiveProperties: { [key: string]: string | number } = {};
    for (const key of Object.keys(this.entity)) {
      if (typeof this.entity[key] === 'string') {
        primitiveProperties[key] = this.entity[key] as string;
      } else if (typeof this.entity[key] === 'number') {
        primitiveProperties[key] = this.entity[key].toString();
      } else {
        primitiveProperties[key] = (this.entity[key] as EntityRecord).getEntity();
      }
    }

   return JSON.stringify(primitiveProperties);
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

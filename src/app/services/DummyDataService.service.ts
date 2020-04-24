import {Task} from '../models/task.model';

export class DummyDataService {
  public getTaskData(): Task[] {
    return [new Task('1', 'TASK101', 'Test Task 1', 'Open'),
      new Task('2', 'TASK102', 'Test Task 2', 'Close')];
  }
}

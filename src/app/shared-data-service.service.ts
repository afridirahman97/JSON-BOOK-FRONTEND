import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private rowData = new BehaviorSubject(null);
  currentRowData = this.rowData.asObservable();

  constructor() {}

  updateRowData(data: any) {
    this.rowData.next(data);
  }
  
}
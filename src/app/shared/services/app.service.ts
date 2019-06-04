import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
    private loadingSource = new BehaviorSubject<boolean>(false);
    loading = this.loadingSource.asObservable();

    constructor() {
    }

    updateLoadingStatus(status: boolean) {
        this.loadingSource.next(status);
    }
}
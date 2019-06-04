import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {
  loadingData: any;
  loader: any;
  loadersList: any[] = [];
  constructor(public loadingController: LoadingController) {}

  async present(message: string) {
    this.loadingData = await this.loadingController.create({
        message: message,
      });
    await this.loadingData.present();
    return this.loadingData;
  }

  dismiss() {
    console.log('dismiss');
    this.loadingData && this.loadingData.dismiss();
  }
}
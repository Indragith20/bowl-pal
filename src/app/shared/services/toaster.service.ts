import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToasterService {
    constructor(public toastController: ToastController) { }
    // TODO: Customize this toast to accept classes and all the parameters for styling
    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
            closeButtonText: 'ok'
        });
        toast.present();
    }
}

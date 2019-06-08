import { Component, OnDestroy } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './shared/services/app.service';
import { Subscription, Observable } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AutoUnsubscribe } from './shared/utils/autounsubscribe';
import { Loader } from './shared/utils/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
@AutoUnsubscribe()
@Loader({ loadingProperty: 'loadingData'})
export class AppComponent implements OnDestroy {
  routeSubscription: Subscription;
  loadingStatus = new Observable<boolean>();
  loadingData: HTMLIonLoadingElement;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appService: AppService,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
    this.intializeLoadingStatus();
    this.intializeRouteSubscription();
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  intializeLoadingStatus() {
    this.loadingStatus = this.appService.loading;
    this.appService.loading.subscribe((data) => {
      if (data === true) {
        if (this.loadingData) {
          this.loadingData.present();
        }
      } else {
        this.loadingData && this.loadingData.dismiss();
      }
    });
  }

  intializeRouteSubscription() {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.appService.updateLoadingStatus(true);
      } else if(event instanceof NavigationEnd) {
        this.appService.updateLoadingStatus(false);
      }
    })
  }

  ngOnDestroy() {
  }
}

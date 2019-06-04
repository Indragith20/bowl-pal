import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './shared/services/app.service';
import { Subscription, Observable } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AutoUnsubscribe } from './shared/utils/autounsubscribe';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
@AutoUnsubscribe()
export class AppComponent implements OnDestroy {
  routeSubscription: Subscription;
  loadingStatus = new Observable<boolean>();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appService: AppService,
    private router: Router
  ) {
    this.initializeApp();
    this.intializeLoadingStatus();
    this.intializeRouteSubscription();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  intializeLoadingStatus() {
    this.loadingStatus = this.appService.loading;
    this.appService.loading.subscribe((data) => {
      console.log(data);
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

import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Loader } from 'src/app/shared/utils/loader';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
@Loader({})
export class LoginPageComponent implements OnInit, OnDestroy {
  loadingData: any;
  constructor(private router: Router, private loginService: LoginService,
    private navCtrl: NavController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  login() {
    this.goToHome();
  }

  goToHome() {
    //TODO: Modify the below line
    /* this.router.navigate(['/home']); */
    this.loadingData.present();
    this.loginService.login('test@test.com', 'test1234').then((data) => {
      console.log(data);
      //this.router.navigate(['/team']);
      this.navCtrl.navigateRoot('/team/' + data.user.uid);
      this.loadingData.dismiss();

    }).catch((err) => {
      console.log(err);
    });
  }

  register() {
    this.router.navigate(['login/register']);
  }

  forgotPass() {}

  ngOnDestroy() {
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})

export class LoginPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private loginService: LoginService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  login() {
    this.goToHome();
  }

  goToHome() {
    //TODO: Modify the below line
    /* this.router.navigate(['/home']); */
    this.loginService.login('test@test.com', 'test1234').then((data) => {
      console.log(data);
      //this.router.navigate(['/team']);
      this.navCtrl.navigateRoot('/team/' + data.user.uid);
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

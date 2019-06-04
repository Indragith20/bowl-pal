import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICoachDetails } from 'src/app/shared/interfaces/coach.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  userData: ICoachDetails;
  userForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private loginService: LoginService, private alertController: AlertController,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.intializeForm();
  }

  intializeForm() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      password: [''],
      phoneNumber: ['']
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  async register() {
    console.log(this.userForm.value);
    const userDetails = this.userForm.value;
    const loader = await this.loaderService.present('Please Wait');
    this.loginService.register(userDetails).then((data) => {
      loader.dismiss();
      if(data) {
        this.presentAlert();
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'User Registration',
      message: 'User Registered Successfully',
      buttons: [{
        text: 'Login',
        role: 'cancel',
        handler: () => {
          this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();
  }

}

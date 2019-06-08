import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IManageTeamDetails, ICoachDetails } from 'src/app/shared/interfaces/coach.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/shared/utils/autounsubscribe';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Loader } from 'src/app/shared/utils/loader';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
@AutoUnsubscribe()
export class AddPlayerComponent implements OnInit, OnDestroy {
  userData: ICoachDetails;
  playerForm: FormGroup;
  selectedTeamId: string;
  teamSubscription: Subscription;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private teamService: TeamService, private router: Router, private toast: ToasterService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    const teamDetails: IManageTeamDetails = this.route.snapshot.parent.data.teams;
    this.teamSubscription = this.route.params.subscribe((params) => {
      this.selectedTeamId = params['teamId'];
    });
    this.userData = teamDetails.userDetails;
    this.intializeForm();
  }

  intializeForm() {
    this.playerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      addedBy: [this.userData.coachId],
      competencyLevel: [''],
      emailId: [''],
      hand: [''],
      height: [''],
      phoneNumber: [''],
      representationalLevel: [''],
      role: ['teamplayer'],
      bowlerType: [''],
      weight: [''],
      coachId: [this.userData.coachId],
      // TODO: Need to discuss
      teamId: [this.selectedTeamId],
      spinnerType: ['']
    });
  }

  async addNewPlayer() {
    console.log(this.playerForm.value);
    const loader = await this.loadingController.create({ message: 'Adding Player' });
    loader.present();
    this.teamService.addPlayer(this.playerForm.value).then((data) => {
      console.log(data);
      if(data && data.path) {
        this.resetForm();
        this.toast.presentToast('Player Added');
      } else {
        this.toast.presentToast('Something Bad Happened');
      }
    }).catch((err) => {
      console.log(err);
      this.toast.presentToast('Something Bad Happened');
    }).finally(() => {
      loader.dismiss();
    });
  }

  resetForm() {
    this.playerForm.reset();
  }

  backToPlayerList() {
    this.router.navigate(['../../player-list/' + this.selectedTeamId], { relativeTo: this.route });
  }

  ngOnDestroy() {}

}

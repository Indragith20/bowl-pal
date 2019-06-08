import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ICoachDetails, IManageTeamDetails } from 'src/app/shared/interfaces/coach.interface';
import { TeamService } from '../services/team.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Loader } from 'src/app/shared/utils/loader';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  userData: ICoachDetails;
  teamForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private teamService: TeamService, private toaster: ToasterService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    const teamDetails: IManageTeamDetails = this.route.snapshot.parent.data.teams;
    this.userData = teamDetails.userDetails;
    this.teamForm = this.fb.group({
      coachId: [this.userData.coachId],
      phoneNumber: [''],
      teamEmailId: [''],
      teamName: [''],
      league: ['']
    });
  }

  async addNewTeam() {
    const loader = await this.loadingController.create({ message: 'Adding New Team' });
    loader.present();
    this.teamService.createTeam(this.teamForm.value).then((data) => {
      if(data) {
        this.toaster.presentToast('Team Added Successfully');
      }
    }).catch((err) => {
      this.toaster.presentToast('Something Bad Happened');
    }).finally(() => {
      loader.dismiss();
    })
  }

  resetForm() {
    this.teamForm.reset();
  }

  backToTeams() {
    this.router.navigate(['../home'], { relativeTo: this.route });
  }

}

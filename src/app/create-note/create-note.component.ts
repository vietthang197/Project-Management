import { Component, OnInit , ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.css'],
    providers: [AppService]
})
export class CreateNoteComponent implements OnInit {
    @ViewChild(LoginComponent)
    loginChild: LoginComponent;

    listProjects = [];
    listJobs = ['task', 'fix bug', 'other'];
    selectProject: Number;
    selectJob: String;

    constructor(
        private appService: AppService,
        private router: Router 
    ) { 
        this.appService.sendGetProjects()
        .then(listProject => {
            var arr = Object.keys(listProject).map(function(key) {
                return [Number(key), listProject[key]];
            });
            this.listProjects = arr;
        })
        .catch(error => console.log(error))
    }

    ngOnInit() {
        this.selectProject = 1;
        this.selectJob = 'task';
    }

    onSubmit(form) {
        console.log(form.value);
        console.log(this.loginChild.id);
        this.appService.sendLogTimeSheet(form.value)
            .then(result => {
                if (result.status == 'true') {
                    alert('Bạn đã tạo chú thích thành công.');
                    this.router.navigate(['my-dashboard']);
                }
                else {
                    alert('Tạo chú thích không thành công.');
                }
            })
            .catch(error => console.log(error))
    }
}

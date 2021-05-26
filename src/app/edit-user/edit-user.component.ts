import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  
  public editForm: FormGroup;
  userRef: any

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: ['']
    })
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

    this.userService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.userRef.name],
        phone: [this.userRef.phone],
        coffee: [this.userRef.coffee],
        size: [this.userRef.size],
        temp: [this.userRef.temp]
      })      
    })
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    
    this.userService.updateUser(this.editForm.value, id);
    this.router.navigate(['list-users']);
  };

}
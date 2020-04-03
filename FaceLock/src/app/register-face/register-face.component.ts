import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  '../services/upload.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register-face',
  templateUrl: './register-face.component.html',
  styleUrls: ['./register-face.component.css', '../dropzone/dropzone.css']
})
export class RegisterFaceComponent implements OnInit {
  virus = false;
  user: Object;

  form: FormGroup;
  uploadResponse;


  constructor(private formBuilder: FormBuilder, private uploadService: UploadService, private authService:AuthService){}




  ngOnInit() {
    this.form = this.formBuilder.group({
      image: ['']

    });
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user
    },
    err => {
      console.log(err);
      return false;

    });
    
  }

  onFileSelect(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);

      const formData = new FormData();
      formData.append('file', this.form.get('image').value);
      formData.append('apikey', '1da1130c53e022006f3224b5e9facf1bd9cb9a8d6e3be2c6f9b56697be936ffe');
      this.uploadService.checkFile(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
            //console.log(res);
            //check results
            //var data = res.data.resource;
            const resource = JSON.parse(JSON.stringify(res));
           // console.log(resource.resource);
            const formData = new FormData();
            formData.append('resource', resource.resource);
            formData.append('apikey', '1da1130c53e022006f3224b5e9facf1bd9cb9a8d6e3be2c6f9b56697be936ffe');
            this.uploadService.checkResults(formData).subscribe(
              (res) => {
                this.uploadResponse = res;
                //console.log(res);   
                const result = JSON.parse(JSON.stringify(res));
                console.log(result.positives); 
               // console.log(this.user['username'])
                if(result.positives != 0){
                  this.virus = true;
                }
              },
              (err) => {  
                console.log(err);
              }
            );

        },
        (err) => {  
          console.log(err);
        }
      );
    }
  }

  onSubmit() {
    console.log(this.virus);
    if(this.virus == false){
      console.log(this.virus);
      const formData = new FormData();
      formData.append('image', this.form.get('image').value);
      formData.append('username', this.user['username']);

      this.uploadService.uploadFile(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
          console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );

    }
    else
    {
      console.log("Virus Detected");
    }
    
  }

}

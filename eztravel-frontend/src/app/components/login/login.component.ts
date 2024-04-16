import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserGet } from '../../interfaces/user-get';
import { UserProfileService } from '../../services/user-profile.service';
import { GetUserProfile } from '../../interfaces/get-user-profile';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ImageSliderComponent, FontAwesomeModule, RouterOutlet, FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  validationForm: FormGroup;
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;

  errorMessage: string = '';

  userNotFound: boolean = false;
  incorrectPass: boolean = false;

  userRole: number;

  slides: any[] = [
    {
      url: '../assets/slideshowPic.jpg',
      title: 'First slide',
    },
    {
      url: '../assets/slideshowPic6.jpg',
      title: 'Second slide',
    },
    {
      url: '../assets/slideshowPic2.jpg',
      title: 'Third slide',
    },
    {
      url: '../assets/slideshowPic3.jpg',
      title: 'Fourth slide',
    },
    {
      url: '../assets/slideshowPic4.jpg',
      title: 'Fifth slide',
    },
    {
      url: '../assets/slideshowPic5.jpg',
      title: 'Sixth slide',
    },
  ];

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService, private userProfileService: UserProfileService) {
    this.validationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.userRole = 0;
  }

  async login(){
    if(this.validationForm.valid){
      const user = {
        username: this.validationForm.value.username,
        password: this.validationForm.value.password
      };
  
      this.resetChecks();
    
      try{
        await this.authService.login(user).toPromise();
        console.log("Successful login!");
        await this.findUserProfile(user.username);
        localStorage.setItem('username', user.username);
        this.navigateToHome();
      } catch (error) {
        if(error instanceof HttpErrorResponse){
          this.checkErrorType(error.status);
        }
        console.error("Login error:", error);
      }
    }
    
  }
  
  findUserProfile(username: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.userService.getUsers().subscribe((users: UserGet[]) => {
            const foundUser = users.find(user => user.userName === username);
            if (foundUser) {
                console.log('User found:', foundUser);
                const userID = foundUser.id;
                this.userProfileService.getUserProfiles().subscribe((userProfiles: GetUserProfile[]) => {
                    const foundUserProfile = userProfiles.find(userProfile => userProfile.userId === userID);
                    if (foundUserProfile) {
                        console.log('User Profile:', foundUserProfile);
                        this.userRole = foundUserProfile.type;
                        localStorage.setItem('profileID', foundUserProfile.id);
                    } else {
                        console.log('User profile not found!');
                    }
                    resolve();
                }, (error) => {
                    reject(error);
                });
                localStorage.setItem('userID', foundUser.id);
            } else {
                console.log("User not found");
                resolve();
            }
        }, (error) => {
            console.log(error);
            reject(error);
        });
    });
}

  checkErrorType(status: number){
    if(status == 400 || status == 401 || 404){
      this.resetChecks();
      this.userNotFound = true;
    }
  }

  resetChecks(){
    this.userNotFound = false;
    this.incorrectPass = false
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
  navigateToLanding(){
    this.router.navigate(['']);
  }
  navigateToHome(){
    if(this.userRole == 0){
      this.router.navigate(['/home']);
    } else{
      this.router.navigate(['/vendor-home']);
    }
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}

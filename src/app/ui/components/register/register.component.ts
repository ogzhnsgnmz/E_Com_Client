import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base/base.component';
import { Create_User } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entities/user';
import { LanguageService } from 'src/app/services/common/language.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, TaostrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit{

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService) {
    super(spinner)
  }

  frm!: FormGroup;
  ngOnInit(): void{
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
      [
        Validators.required
      ]],
      passwordConfirm: ["",
      [
        Validators.required
      ]],
      province: ["",
      [
        Validators.required
      ]],
      title: ["",
      [
        Validators.required
      ]],
      district: ["",
      [
        Validators.required
      ]],
      neighborhood: ["",
      [
        Validators.required
      ]],
      street: ["",
      [
        Validators.required
      ]],
      number: ["",
      [
        Validators.required
      ]],
      postalCode: ["",
      [
        Validators.required
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    });
  }

  get component(){
    return this.frm.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User){
    this.submitted = true;
    
    if (this.frm.invalid)
      return;

    const result: Create_User = await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message || '', "Kullanıcı Kaydı Başarılı", {
        messageType: TaostrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message || '', "Hata", {
        messageType: TaostrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }
}

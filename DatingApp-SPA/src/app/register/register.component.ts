import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/_services/auth.service";
import { AlertifyService } from "src/_services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output()
  cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(() => {
        this.alertify.success('Registerd successfully.');
      },
      error => {
        this.alertify.error(error);
      }
    );

    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output()
  cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(() => {
        console.log('Registerd successfully.');
      },
      error => {
        console.log(error);
      }
    );

    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
   
  }
}
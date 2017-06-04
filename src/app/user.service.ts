import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  user = {};

  constructor() {
    this.user = {
      "id": "104276062754647800930",
      "token": "ya29.GltUBGyaLFX20jY0aG6zJHlgb7IM--i2RxLEkyFiuzRDFRtMogWRW4K7UoTkprjCN0y-l8GUDOLzOG3EbIgvpR3YDnbfXBXQrEPuHREgx96soKBZk0hzwhlJE4Hl",
      "name": "Shashith Darshana",
      "picture": "https://lh3.googleusercontent.com/-kZ1z9OMkfpk/AAAAAAAAAAI/AAAAAAAAA-I/Wi6X5WTqd9s/photo.jpg?sz=50",
      "email": "shashithd@gmail.com",
      "_id": "5925ee83d83c7f7502bfa908"
    }
  }

  getUser() {
    return this.user;
  }
}

import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from '../services/user-service/user.service';

@Pipe({
    name: 'isLogged'
})
export class IsLoggedPipe implements PipeTransform {

    transform(userService: UserService) {
        return userService.isAuthenticated();
    }
}

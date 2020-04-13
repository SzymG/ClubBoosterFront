import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from '../services/user-service/user.service';

@Pipe({
    name: 'isLogged'
})
export class IsLoggedPipe implements PipeTransform {

    async transform(userService: UserService) {
        return await userService.getToken();
    }
}

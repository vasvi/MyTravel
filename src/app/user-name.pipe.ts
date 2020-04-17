import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'userName'
})
export class UserNamePipe implements PipeTransform {
    transform(value: string): string {
        return value.charAt(0);
    }
}
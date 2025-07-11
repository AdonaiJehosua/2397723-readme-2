import {IsEmail, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {API, AUTH, VALIDATION_USER} from '../authentication.constant';

export class LoginUserDto {

  @ApiProperty({
    description: API.EMAIL,
    example: API.EMAIL_EXAMPLE,
  })
  @IsEmail({}, {
    message: AUTH.USER_EMAIL_NOT_VALID,
  })
  public email: string;

  @ApiProperty({
    description: API.PASSWORD,
    example: API.PASSWORD_EXAMPLE,
  })
  @Length(VALIDATION_USER.MIN_PASS_LENGTH, VALIDATION_USER.MAX_PASS_LENGTH, {
    message: AUTH.USER_PASSWORD_LENGTH_WRONG,
  })
  @IsString()
  public password: string;
}

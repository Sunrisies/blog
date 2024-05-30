import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 30, {
    message: '用户名长度必须在 2 到 30 个字符之间',
  })
//   @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
//     message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符',
//   })
  user_name: string;

  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 30, {
    message: '密码长度必须在 6 到 30 个字符之间',
  })
  pass_word: string;

  image: string;
  phone: string;
  email: string;
}
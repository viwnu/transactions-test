import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangeBalanceDto } from './dto/change-balance.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from '@app/api-doc';
import { ApiDocExceptions } from '@app/api-doc/reponses';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiDoc({
    title: 'Change balance',
    response: { status: 201, description: 'Empty response' },
    exceptions: [ApiDocExceptions.badRequest],
  })
  @Post()
  changeBalance(@Body() changeBalanceDto: ChangeBalanceDto): Promise<void> {
    return this.usersService.changeBalance(changeBalanceDto);
  }
}

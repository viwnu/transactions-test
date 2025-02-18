import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/db/models';
import { ChangeBalanceDto } from './dto/change-balance.dto';
import { CacheService } from '@app/cashe';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly cacheService: CacheService,
  ) {}

  async changeBalance({ amount }: ChangeBalanceDto): Promise<void> {
    const cashedUser = await this.cacheService.get('user');
    if (cashedUser && cashedUser.balance < amount) {
      throw new BadRequestException('Недостаточно средств');
    }
    const [count, updatedRows] = await this.userModel.update(
      { balance: this.userModel.sequelize.literal(`balance + ${amount}`) },
      {
        where: { balance: { [Op.gte]: Math.abs(amount) } },
        returning: ['balance'],
      },
    );
    if (!count || updatedRows.length === 0) {
      throw new BadRequestException('Недостаточно средств');
    }
    this.cacheService.set('user', updatedRows[0]); // not awaiting on purpose to not block the response
  }
}

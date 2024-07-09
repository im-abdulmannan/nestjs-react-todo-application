import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/utils/constant';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; message: string }> {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.USER;
    const savedUser = await this.userRepository.save(user);
    const message = 'User Created successfully!';
    return { user: savedUser, message };
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id: id },
    });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

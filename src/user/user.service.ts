import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getMyPrivileges(user: User) {
    try {
      const role = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          role: true,
        },
      });
      return role;
    } catch (error) {
      console.log('GET_MY_PRIVILEGES ==>>', error);
      throw new ForbiddenException('Internal error');
    }
  }

  async getMe(user: User) {
    try {
      const me = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: { instance: true },
      });
      if (!me) throw new ForbiddenException('Error while finding user');
      return me;
    } catch (error) {
      console.log('GET_ME_ERROR ==>>', error);
      throw new ForbiddenException('Internal error');
    }
  }

  async editMe(user: User) {
    try {
      // TODO
      // Check if session is still valid
      // If yes continue, otherwise stop execution.
      // const userUpdated =
      //   await this.prisma.user.update({
      //     where: { id: user.id },
      //     data: { ...dto },
      //   });

      // if (!userUpdated)
      //   throw new ForbiddenException(
      //     'Unexpected error, user not updated',
      //   );

      return user;
    } catch (error) {
      console.log('EDIT_ME ==>>', error);
      throw new ForbiddenException('Internal error');
    }
  }

  // TODO: check we don't update the user current logged in
  async updateUser(dto: UpdateUserDto, id: string) {
    try {
      const userUpdated = this.prisma.user.update({
        where: {
          id,
        },
        data: { ...dto },
      });

      if (!userUpdated)
        throw new ForbiddenException('Unexpected error, user not updated');

      return userUpdated;
    } catch (error) {
      console.log('UPDATE_USER ==>>', error);
      throw new ForbiddenException('Internal error');
    }
  }

  async deleteUser(userId: string) {
    try {
      const user = this.prisma.user.delete({
        where: { id: userId },
      });

      if (!user)
        throw new ForbiddenException('Unexpected error, user not deleted');

      return user;
    } catch (error) {
      console.log('DELETE_USER ==>>', error);
      throw new ForbiddenException('Internal error');
    }
  }
}

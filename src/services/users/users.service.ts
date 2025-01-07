import { IUsersRepository } from '@/di/repositories/core/users.repository.interface'
import { ServiceOptions } from '../../../types';
import { IUsersService } from '@/di/services/core/users.service.interface';

export function UsersService(repository:IUsersRepository, defaultOptions:ServiceOptions): IUsersService {
  return {
    getUsers: async (params, options = defaultOptions) => {
      const queryParams = {
        where: params?.filters,
        orderBy: params?.sort,
        limit: params?.pageSize,
        offset: params?.page ? (params.page - 1) * (params.pageSize || 10) : 0,
      }

      return await repository.findManyUsers(queryParams, options)
    },
    getUsersWithRoles: async (params, options = defaultOptions) => {
      const queryParams = {
        where: params?.filters,
        orderBy: params?.sort,
        limit: params?.pageSize,
        offset: params?.page ? (params.page - 1) * (params.pageSize || 10) : 0,
      }

      return await repository.findManyUsersWithRoles(queryParams, options)
    },
  }
}

import { ServiceOptions } from '../../../types';
import { IRolesRepository } from '@/di/repositories/core/roles.repository.interface';
import { IRolesService } from '@/di/services/core/roles.service.interface';

export function RolesService(repository:IRolesRepository, defaultOptions:ServiceOptions): IRolesService {
  return {
    getRoles: async (params, options = defaultOptions) => {
      const queryParams = {
        where: params?.filters,
        orderBy: params?.sort,
        limit: params?.pageSize,
        offset: params?.page ? (params.page - 1) * (params.pageSize || 10) : 0,
      }

      return await repository.findManyRoles(queryParams, options)
    },
  }
}

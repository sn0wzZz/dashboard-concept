import { IWorkspacesRepository } from '@/di/repositories/core/workspaces.repository.interface';
import { ServiceOptions } from '../../../types';
import { IWorkspacesService } from '@/di/services/core/workspaces.service.interface';

export function WorkspacesService(repository:IWorkspacesRepository, defaultOptions:ServiceOptions): IWorkspacesService {
  return {
    getWorkspacesWithUserCount: async (params, options = defaultOptions) => {
      const queryParams = {
        where: params?.filters,
        orderBy: params?.sort,
        limit: params?.pageSize,
        offset: params?.page ? (params.page - 1) * (params.pageSize || 10) : 0,
      }

      return await repository.findManyWorkspacesWithUserCount(
        queryParams,
        options
      )
    },
  }
}

import { SelectCoreRolesSchema} from '@/lib/database/models/zod-models'
import { SQL } from 'drizzle-orm'
import { ServiceOptions } from '../../../../types'

export interface IRolesRepository {
  findManyRoles(
    input: {
      where?: SQL
      orderBy?: SQL
      limit?: number
      offset?: number
    },
    options: ServiceOptions
  ): Promise<SelectCoreRolesSchema[]>
}


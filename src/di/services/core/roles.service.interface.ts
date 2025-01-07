import { SelectCoreRolesSchema } from '@/lib/database/models/zod-models'
import { SQL } from 'drizzle-orm'
import { ServiceOptions } from '../../../../types'

export interface IRolesService {
  getRoles(params?:{
    filters?: SQL
    sort?: SQL
    page?: number
    pageSize?: number
  }, 
  options?:ServiceOptions):Promise<SelectCoreRolesSchema[]>
}
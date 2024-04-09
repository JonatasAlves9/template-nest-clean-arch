import { Menu } from '@features/auth/domain/entities/menu.entity';
import { MenuRepositoryInterface } from '@features/auth/domain/repositories/menu.repository';
import { Repository } from 'typeorm';

export class MenuTypeOrmRepository implements MenuRepositoryInterface {
  constructor(private ormRepo: Repository<Menu>) {}

  async listMenus(profile_id: number): Promise<Menu[]> {
    return this.ormRepo
      .createQueryBuilder('menu')
      .select(['id', 'titulo', 'rota', 'icon', 'parent_id', 'ordem'])
      .where(`:profile_id = ANY(perfil_ids)`, { profile_id })
      .where("versao = '3.0'")
      .orderBy('parent_id', 'DESC')
      .orderBy('ordem', 'ASC')
      .getRawMany();
  }
}

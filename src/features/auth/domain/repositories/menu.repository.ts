import { Menu } from '../entities/menu.entity';

export abstract class MenuRepositoryInterface {
  abstract listMenus(profile_id: number): Promise<Menu[]>;
}

import { Menu } from '@features/auth/domain/entities/menu.entity';
import { MenuRepositoryInterface } from '@features/auth/domain/repositories/menu.repository';
import { ListMenusUseCaseInterface } from '@features/auth/domain/usecases/list-menus.usecase';

export class ListMenusUseCase implements ListMenusUseCaseInterface {
  constructor(private readonly menuRepository: MenuRepositoryInterface) {}

  async execute(
    input: ListMenusUseCaseInterface.Input,
  ): Promise<ListMenusUseCaseInterface.Output> {
    const menus = await this.menuRepository.listMenus(input.profile_id);
    return this.nestMenusChildren(menus);
  }

  private nestMenusChildren(menus: Menu[]): Menu[] {
    return menus.filter((menu) => {
      menu.children = menus.filter((m) => m.parent_id === menu.id);
      return menu.parent_id === null;
    });
  }
}

import { Menu } from '@features/auth/domain/entities/menu.entity';
import { ListMenusUseCaseInterface } from '@features/auth/domain/usecases/list-menus.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  constructor(private readonly listMenusUseCase: ListMenusUseCaseInterface) {}
  async getMenus(profile_id: number) {
    const nestedMenus = await this.listMenusUseCase.execute({ profile_id });
    return this.parseMenusToDTO(nestedMenus);
  }

  private parseMenusToDTO(menus: Menu[]): MenuService.MenuDto[] {
    return menus.map((menu) => ({
      id: menu.id,
      title: menu.titulo,
      icon: menu.icon,
      route: menu.rota,
      children:
        menu.children && menu.children.length > 0
          ? this.parseMenusToDTO(menu.children)
          : [],
    }));
  }
}

export namespace MenuService {
  export type MenuDto = {
    id: number;
    title: string;
    icon: string | null;
    route: string | null;
    children: MenuDto[];
  };
}

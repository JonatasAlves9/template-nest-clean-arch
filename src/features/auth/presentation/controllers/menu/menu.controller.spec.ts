import { MenuService } from '@features/auth/application/services/menu/menu.service';
import { MenuController } from './menu.controller';

describe('MenuController', () => {
  const nestedMenus: MenuService.MenuDto[] = [
    {
      id: 1,
      icon: 'ri ri-dashboard-3-line',
      title: 'Dashboard',
      route: 'dashboard',
      children: [],
    },
    {
      id: 2,
      icon: 'ri ri-dashboard-3-line',
      title: 'Relatórios',
      route: null,
      children: [
        {
          id: 3,
          icon: null,
          title: 'Gestão Acadêmica',
          route: null,
          children: [
            {
              id: 4,
              icon: null,
              title: 'Visão Geral',
              route: 'relatorios/visao-geral',
              children: [],
            },
          ],
        },
      ],
    },
  ];
  const menuService: MenuService = {
    getMenus: jest.fn().mockResolvedValue(nestedMenus),
  } as unknown as MenuService;
  let controller: MenuController;

  beforeEach(async () => {
    controller = new MenuController(menuService);
  });

  describe('getMenu', () => {
    it('should call MenuService.getMenus with the right input', async () => {
      // Arrange
      const profile_id = 1;

      // Act
      await controller.getMenu(profile_id);

      expect(menuService.getMenus).toHaveBeenCalledWith(profile_id);
    });
    it('should return the result from MenuService.getMenus', async () => {
      // Arrange
      const profile_id = 1;

      // Act
      const result = await controller.getMenu(profile_id);

      // Assert
      expect(result).toEqual(nestedMenus);
    });
  });
});

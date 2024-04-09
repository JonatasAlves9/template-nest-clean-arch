import { Menu } from '@features/auth/domain/entities/menu.entity';
import { ListMenusUseCaseInterface } from '@features/auth/domain/usecases/list-menus.usecase';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  const menus: ListMenusUseCaseInterface.Output = [
    new Menu(
      1,
      'Dashboard',
      'ri ri-dashboard-3-line',
      'dashboard',
      0,
      '3.0',
      [2, 5, 6, 7, 8],
      null,
    ),
    new Menu(
      2,
      'Relatórios',
      'ri ri-dashboard-3-line',
      null,
      1,
      '3.0',
      [2, 5, 6, 7, 8],
      null,
      [
        new Menu(3, 'Gestão Acadêmica', null, null, 0, '3.0', [5, 6, 7], 2, [
          new Menu(
            4,
            'Visão Geral',
            null,
            'relatorios/visao-geral',
            0,
            '3.0',
            [5, 6, 7],
            3,
          ),
        ]),
      ],
    ),
  ];
  const listMenusUseCase: jest.Mocked<ListMenusUseCaseInterface> = {
    execute: jest.fn().mockResolvedValue(menus),
  };

  beforeEach(async () => {
    service = new MenuService(listMenusUseCase);
  });

  describe('getMenus', () => {
    it('should call ListMenusUseCase.execute with the right input', async () => {
      // Arrange
      const profile_id = 1;

      // Act
      await service.getMenus(profile_id);

      // Assert
      expect(listMenusUseCase.execute).toHaveBeenCalledWith({ profile_id });
    });
    it('should deeply nest children menus to the right parent menu', async () => {
      // Arrange
      const profile_id = 1;
      const expectedMenus: MenuService.MenuDto[] = [
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

      // Act
      const result = await service.getMenus(profile_id);

      // Assert
      expect(result).toEqual(expectedMenus);
    });
  });
});

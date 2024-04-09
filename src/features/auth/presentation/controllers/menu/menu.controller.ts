import { MenuService } from '@features/auth/application/services/menu/menu.service';
import { Controller, Get, Session } from '@nestjs/common';

@Controller('auth')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('menu')
  getMenu(@Session() session: Record<string, any>) {
    console.log(session);
    const profile_id = session.passport.user.activeProfile.profileId;
    return this.menuService.getMenus(profile_id);
  }
}

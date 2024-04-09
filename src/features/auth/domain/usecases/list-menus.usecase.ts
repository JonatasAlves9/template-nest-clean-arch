import { Menu } from '../entities/menu.entity';

export abstract class ListMenusUseCaseInterface {
  abstract execute(
    input: ListMenusUseCaseInterface.Input,
  ): Promise<ListMenusUseCaseInterface.Output>;
}

export namespace ListMenusUseCaseInterface {
  export type Input = {
    profile_id: number;
  };
  export type Output = Menu[];
}

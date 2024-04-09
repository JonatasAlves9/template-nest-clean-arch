import { Menu } from '@features/auth/domain/entities/menu.entity';
import { EntitySchema as TypeORMSchema } from 'typeorm';

export const MenuSchema = new TypeORMSchema<Menu>({
  name: 'Menu',
  tableName: 'menu',
  target: Menu,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    parent_id: {
      type: Number,
    },
    titulo: {
      type: String,
      nullable: false,
    },
    icon: {
      type: String,
    },
    rota: {
      type: String,
    },
    ordem: {
      type: Number,
      nullable: false,
    },
    perfil_ids: {
      type: Number,
      array: true,
    },
    versao: {
      type: String,
    },
  },
});

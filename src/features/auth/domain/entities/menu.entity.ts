export class Menu {
  constructor(
    private _id: number,
    private _titulo: string,
    private _icon: string | null,
    private _rota: string | null,
    private _ordem: number,
    private _versao: string | null,
    private _perfil_ids: number[] | null,
    private _parent_id: number | null,
    private _children?: Menu[],
  ) {}
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    this._titulo = value;
  }

  get icon(): string | null {
    return this._icon;
  }
  set icon(value: string | null) {
    this._icon = value;
  }

  get rota(): string | null {
    return this._rota;
  }
  set rota(value: string | null) {
    this._rota = value;
  }

  get ordem(): number {
    return this._ordem;
  }
  set ordem(value: number) {
    this._ordem = value;
  }

  get versao(): string | null {
    return this._versao;
  }
  set versao(value: string | null) {
    this._versao = value;
  }

  get perfil_ids(): number[] | null {
    return this._perfil_ids;
  }
  set perfil_ids(value: number[] | null) {
    this._perfil_ids = value;
  }

  get parent_id(): number | null {
    return this._parent_id;
  }
  set parent_id(value: number | null) {
    this._parent_id = value;
  }

  get children(): Menu[] | undefined {
    return this._children;
  }
  set children(value: Menu[] | undefined) {
    this._children = value;
  }
}

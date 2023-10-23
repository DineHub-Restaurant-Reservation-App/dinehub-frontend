export class MenuItem {
  constructor(
    private _category: string,
    private _name: string,
    private _image: string,
    private _description: string,
    private _price: number
  ) {}

  get category(): string {
    return this._category;
  }

  get name(): string {
    return this._name;
  }

  get image(): string {
    return this._image;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }
}
export class Menu {
  constructor(
    private _categorizedMenuItem: { category: string; items: MenuItem[] }[]
  ) {}

  get categorizedMenuItem(): { category: string; items: MenuItem[] }[] {
    return this._categorizedMenuItem;
  }
}

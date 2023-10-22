export class MenuItem {
  constructor(
    private category: string,
    private name: string,
    private image: string,
    private description: string,
    private price: number
  ) {}

  get getCategory(): string {
    return this.category;
  }

  get getName(): string {
    return this.name;
  }

  get getImage(): string {
    return this.image;
  }

  get getDescription(): string {
    return this.description;
  }

  get getPrice(): number {
    return this.price;
  }
}
export class Menu {
  constructor(
    private items: MenuItem[],
    private categorizedMenuItem: { category: string; items: MenuItem[] }[]
  ) {}

  get getItems(): MenuItem[] {
    return this.items;
  }

  get getCategorizedMenuItem(): { category: string; items: MenuItem[] }[] {
    return this.categorizedMenuItem;
  }
}

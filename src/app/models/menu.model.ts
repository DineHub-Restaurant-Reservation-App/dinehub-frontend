
// export class Menu {
//   constructor(
//     public restaurantMenu: { category: string; items: MenuItem[] }[]
//   ) {}
// }

export interface Menu{
  restaurant: string,
  categories: Category[]
}

export interface Category{
  _id: string,
  name: string,
  items: any[],
}
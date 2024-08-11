
// export class Menu {
//   constructor(
//     public restaurantMenu: { category: string; items: MenuItem[] }[]
//   ) {}
// }

export interface Menu{
  _id: string,
  restaurant: string,
  categories: Category[]
}

export interface Category{
  _id: string,
  name: string,
  items: any[],
}
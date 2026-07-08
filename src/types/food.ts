export interface FoodItem {
  id: string;
  categoryId: 'tapas' | 'paella' | 'sweets' | 'drink';
  name: string;
  japanese_name: string;
  discription: string;
  price: string;
  image: string;
  isSoldOut?: boolean;
}

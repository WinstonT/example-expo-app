interface Rating {
  rate: number,
  count: number,
}

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

export default Product;
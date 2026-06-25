interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string;
  rating: number;
  brand: string;
  category: string;
  reviews: [
    {
      rating: number;
      comment: string;
      date: date;
      reviewerName: string;
      reviewerEmail: string;
    },
  ];
}

interface ProductCardProps {
  page: number;
  pageSize: number;
  onDataLoaded?: (total: number) => void;
}

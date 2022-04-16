export interface Summary {
  orders: { numOrders: number; totalSales: number; }[],
  productCategories:{ _id: ''; count: number; }[],
  users:{ _id: ''; numUsers: number; }[],

}


export interface Order {
  orderItems:
  {
    slug:  String,
    name:  String,
    quantity:  String,
    image:  String,
    price:  number,
    product: String
  }[]
,
shippingAddress: {
  fullName:  String,
  address:  String,
  city:  String,
  postalCode:  String,
  country:  String,
},
paymentMethod: String,

paymentResult: {
  _id: String,
  status: String,
  update_time: String,
  email_address: String,
},
itemsPrice: number,
shippingPrice: number,
taxPrice: number,
totalPrice: number,
isPaid: Boolean,
paidAt: Date ,
isDelivered:  Boolean,
deliveredAt:  Date,
user: '',

__v:Number,
createdAt:  Date,
updatedAt: Date,
_id: String,

}

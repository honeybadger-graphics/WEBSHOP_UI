export interface ProductDTO {
    productId: number;
    productName: string;
    productDescription: Array<string>;
    productCategory: string;
    productImage: string;
    productPrice: number;
    productBasePrice: number;
    isProductPromoted: boolean;
    isProductOnSale: boolean;
  }
  export interface UserDataDTO{
    userId:string;
    userNameTitles:string;
    userFirstName:string;
    userLastName:string;
    userAddress: Address;
    userLastPurchaseCategory:string
  }
  export interface UserDTO{
    email: string;
    password: string;
  }
  export interface LoginResponseDTO{
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  }
  export interface CartDTO{
    cartId: string;
    productIds: number[];
    productCount: number[];
  }
  export interface Respone{
    statusCode: string;
    message: string;
  }
  export interface StockDTO {
    stockId: number;
    productId: number;
    productStocks: number;
  }
  export interface StockUpdateDTO {
    productId: number;
    productStocks: number;
  }
  export interface AdminDTO{
    userEmail: string;
  }
  export interface Address{
    city: string;
    street: string;
    houseNumber: string;
    postCode: string;
  }
  export interface AddToCartDTO{
    productId: number;
    productCount: number;
  }
  export interface CartValueDTO{
    value: number;
    currencyCode: string;
  }
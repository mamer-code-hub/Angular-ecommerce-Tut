import { ToastrService } from "ngx-toastr";
import { CartService } from "../../features/cart/services/cart.service";
import { showToaster } from "./toaster";
import { WishlistService } from "../../features/wishlist/services/wishlist.service";

export const addToCart = (id: string,
  toaster: ToastrService,
  cartService: CartService): any => {


  return cartService.addProduct(id).subscribe({
    next: (res: any) => {
      showToaster("Product Added Successfully To Cart", toaster)
    },
    error: (err: any) => {
      showToaster("Error In Adding To Cart", toaster, "error")


    }
  })


}
export const addToWish = (id: string,
  toaster: ToastrService,
  wishService: WishlistService): any => {

  


  return wishService.addProduct(id).subscribe({
    next: (res: any) => {
      showToaster("Product Added Successfully To Wishlist", toaster)
    },
    error: (err: any) => {
      showToaster("Error In Adding To Wishlist", toaster,"error")

    }
  })


}





import { ToastrService } from "ngx-toastr";
import { CartService } from "../../features/cart/services/cart.service";
import { showToaster } from "./toaster";
import { inject } from "@angular/core";
import { AuthService } from "../../features/Authentication/services/auth.service";

export const addToCart = (id: string,
  toaster: ToastrService,
  cartService: CartService): any => {


  return cartService.addProduct(id).subscribe({
    next: (res: any) => {
      showToaster("Product Added Successfully To Cart", toaster)
    },
    error: (err: any) => {
      // console.error(err);

    }
  })


}





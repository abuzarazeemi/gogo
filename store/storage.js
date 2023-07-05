import { defineStore } from "pinia";

import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const useStorageStore = defineStore("storage", {
   
  state: () => ({
    errors: [],
    // cart: cart ? JSON.parse(cart) : [],
    cart: [],
    loading: false,
    baseUrl: "https://my.gogo.com.np/",
    // baseUrl: 'https://www.login.sponeja.com/',
    // baseUrl: 'https://market.rajviz.com/',
    settings: null,
  }),
  actions: {
    async fetchSettings(item) {
      try {
        const response = await axios.get(this.baseUrl + "api/app/settings");
        item = response.data;
        this.setSettings(item);
      } catch (error) {
        console.log(error);
      }
    },
    setSettings(data) {
        this.settings = data;
      },
    
      setErrors(errors) {
        this.errors = errors;
      },
    
      setCartItems(products) {
        if (products) {
          this.cart = products;
        }
      },
    
      setLoading(newLoading) {
        this.loading = newLoading;
      },

      increment(product) {
        let item = this.cart?.find((p) => p.id == product.id);
        if (product.available_qty > 1) {
          item.quantity++;
          if (item.discount_price != 0) {
            item.totalPrice = item.quantity * item.discount_price;
          } else {
            item.totalPrice = item.quantity * item.price;
          }
        } else if (product.quantity > product.available_qty) {
          notify({
            type: "error",
            title: "Cart",
            text: item.name + " " + "is out of stock",
          });
        }
        this.saveCart();
      },

      decrement(product) {
        let item = this.cart?.find((p) => p.id == product.id);
        item.quantity--;
        if (item.discount_price != 0) {
          item.totalPrice = item.discount_price - item.quantity;
        } else {
          item.totalPrice = item.price - item.quantity;
        }
        // item.totalPrice = item.price - item.quantity
        if (item.quantity == 0) {
          this.cart?.splice(item, 1);
          notify({
            type: "success",
            title: "Cart",
            text: item.name + " " + "has been removed from cart",
          });
        }
        this.saveCart();
      },

      addToCart({ product, quantity, selectedOption, selectedOptions }) {
        let item = this.cart?.find((p) => p.id == product.id);
        if (item) {
          item.quantity += quantity++;
          item.selectedOption = selectedOption;
          item.selectedOptions = selectedOptions;
          // item.totalPrice = item.quantity * item.price;
          if (item.discount_price != 0) {
            item.totalPrice = item.quantity * item.discount_price;
          } else if (item.quantity) {
            item.totalPrice = item.quantity * item.price;
          } else {
            item.totalPrice = item.price;
          }
    
          // if(item.selectedOption != undefined) {
    
          //   item.selectedOption.forEach((itemCalc, i) => {
          //     item.totalPrice = item.quantity * item.price + item.selectedOption[i].price;
          //   })
          // }
          if (item.vendor.vendor_type.slug != "service") {
            Swal.fire({
              title: "Cart",
              text:
                "Your product" + " " + item.name + " " + "has been added to cart",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#10b981",
              cancelButtonColor: "#d33",
              cancelButtonText: "Keep shopping",
              confirmButtonText: "Go to cart",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/cart";
              }
            });
          } else {
            window.location.href = "/checkout";
          }
        } else if (this.cart?.length >= 1) {
          if (product.vendor.id != this.cart[0]["vendor"]["id"]) {
            Swal.fire({
              title: "Different Vendor",
              text: "Are you sure you'd like to change vendors? Your Current items in cart will be lost.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Okay",
            }).then((result) => {
              if (result.isConfirmed) {
                // localStorage.removeItem('cart')
                this.cart = [];
                product.quantity = quantity++;
                product.selectedOption = selectedOption;
                product.selectedOptions = selectedOptions;
                // product.totalPrice = product.quantity * product.price;
                if (product.discount_price != 0) {
                  product.totalPrice = product.quantity * product.discount_price;
                } else if (product.quantity) {
                  product.totalPrice = product.quantity * product.price;
                } else {
                  item.totalPrice = item.price;
                }
                // if(product.selectedOption != undefined) {
                //   product.selectedOption.forEach((item, i) => {
                //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
                //   })
                // }
                this.cart?.push(product);
                Swal.fire(
                  "Cart",
                  "Your product" +
                    " " +
                    product.name +
                    " " +
                    "has been added to cart",
                  "success"
                );
              }
              this.saveCart();
            });
          } else {
            product.quantity = quantity++;
            // product.totalPrice = product.quantity * product.price;
            product.selectedOption = selectedOption;
            product.selectedOptions = selectedOptions;
            if (product.discount_price != 0) {
              product.totalPrice = product.quantity * product.discount_price;
            } else if (product.quantity) {
              product.totalPrice = product.quantity * product.price;
            } else {
              product.totalPrice = product.price;
            }
            // if(product.selectedOption != undefined) {
            //   product.selectedOption.forEach((item, i) => {
            //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
            //   })
            // }
    
            if (product.vendor.vendor_type.slug != "service") {
              this.cart.push(product);
              Swal.fire({
                title: "Cart",
                text:
                  "Your product" +
                  " " +
                  product.name +
                  " " +
                  "has been added to cart",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#10b981",
                cancelButtonColor: "#d33",
                cancelButtonText: "Keep shopping",
                confirmButtonText: "Go to cart",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/cart";
                }
              });
            } else {
              window.location.href = "/checkout";
            }
          }
          this.saveCart();
        } else {
          product.quantity = quantity;
          product.selectedOption = selectedOption;
          product.selectedOptions = selectedOptions;
          // product.totalPrice = product.quantity * product.price
          if (product.discount_price != 0) {
            product.totalPrice = product.quantity * product.discount_price;
          } else if (product.quantity) {
            product.totalPrice = product.quantity * product.price;
          } else {
            product.totalPrice = product.price;
          }
    
          // if(product.selectedOption) {
          //   product.selectedOption.forEach((item, i) => {
          //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
          //   })
          // }
          this.cart?.push(product);
          if (product.vendor.vendor_type.slug != "service") {
            Swal.fire({
              title: "Cart",
              text:
                "Your product" +
                " " +
                product.name +
                " " +
                "has been added to cart",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#10b981",
              cancelButtonColor: "#d33",
              cancelButtonText: "Keep shopping",
              confirmButtonText: "Go to cart",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/cart";
              }
            });
          } else {
            // this.commit('saveCart');
            window.location.href = "/checkout";
          }
        }
        this.saveCart();
      },

      saveCart() {
        window.localStorage.setItem("cart", JSON.stringify(this.cart));
      },
  },
  getters: {
    getErrors(){return this.errors},
    count(){return this.cart?.length ? this.cart.length : 0},
    isAuthenticated(){return !!this.user},
    subtotal(){return this.cart?.price},

    getLoading() {
      return this.loading;
    },
  },
});


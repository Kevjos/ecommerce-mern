import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productsInLocalStorage = localStorage.getItem("cartProducts");
      return productsInLocalStorage ? JSON.parse(productsInLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(
    localStorage.getItem("cartOpen") ?? false
  );
  const [productsLength, setProductsLength] = useState(
    localStorage.getItem("productsLength") ?? 0
  );

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
    localStorage.setItem("cartOpen", cartOpen);
    localStorage.setItem("productsLength", productsLength);
  }, [cartItems, cartOpen, productsLength]);

  useEffect(() => {
    setProductsLength(
      cartItems?.reduce((previous, current) => previous + current.cantidad, 0)
    );
  }, [cartItems]);

  const addItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart._id === product._id
    );

    if (inCart) {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart._id === product._id) {
            setCartOpen(true);
            return { ...inCart, cantidad: inCart.cantidad + 1 };
          } else return productInCart;
        })
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
      setCartOpen(true);
    }
  };

  const deleteItemToCart = (product, productLength) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart._id === product._id
    );

    if (inCart.cantidad === 1) {
      setCartItems(
        cartItems.filter((productInCart) => productInCart._id !== product._id)
      );
      if (productLength === 1) {
        setCartOpen(false);
      }
    } else {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart._id === product._id) {
            return { ...inCart, cantidad: inCart.cantidad - 1 };
          } else return productInCart;
        })
      );
    }
  };

  const total = cartItems?.reduce(
    (previous, current) => previous + current.cantidad * current.precio,
    0
  );

  const removeItem = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart._id === product._id
    );

    if (cartItems.length === 1) {
      setCartItems(
        cartItems.filter((productInCart) => productInCart._id !== product._id)
      );
      setCartOpen(false);
    } else {
      setCartItems(
        cartItems.filter((productInCart) => productInCart._id !== product._id)
      );
    }
  };

  const clearCart = () => {
    setCartItems(cartItems.splice(0, cartItems.length));

    localStorage.removeItem("cartProducts");
    //setCartItems((cartItems.length = 0));
    //total = 0;
    localStorage.removeItem("cartOpen");
    localStorage.removeItem("productsLength");

    /*
    localStorage.setItem("cartOpen", false);
    localStorage.setItem("productsLength", 0);
    localStorage.setItem(
      "cartProducts",
      setCartItems(cartItems.splice(0, cartItems.length))
    );
    */

    //setCartItems(products.splice(0, products.length));

    console.log("Items en el carrito: ", cartItems);
    /*
    console.log(
      "Empty: ",
      cartOpen,
      "totalProductos: ",
      productsLength,
      "PrecioTotal: ",
      total
    );
    */
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        deleteItemToCart,
        cartOpen,
        productsLength,
        total,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

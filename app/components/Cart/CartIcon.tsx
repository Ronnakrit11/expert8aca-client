"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiShoppingCart } from "react-icons/hi";
import { fetchCart } from "../../../redux/features/cart/cartSlice";
import Link from "next/link";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: any) => state.cart);
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // Fetch cart for both authenticated and unauthenticated users
    dispatch(fetchCart(isAuthenticated) as any);
  }, [dispatch, isAuthenticated]);

  return (
    <Link href="/cart" className="relative">
      <div className="flex items-center">
        <HiShoppingCart size={25} className="cursor-pointer text-white" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;

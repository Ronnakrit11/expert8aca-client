"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../../../redux/features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { HiShoppingCart } from "react-icons/hi";

interface AddToCartButtonProps {
  courseId: string;
  className?: string;
  courseData?: any;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ courseId, className, courseData }) => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state: any) => state.cart);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      const itemInCart = cartItems.find((item: any) => item.courseId === courseId);
      setIsInCart(!!itemInCart);
    } else {
      setIsInCart(false);
    }
  }, [cartItems, courseId]);

  const handleAddToCart = async () => {
    if (isInCart) {
      toast.error("This course is already in your cart");
      return;
    }

    setLoading(true);
    try {
      // If we don't have courseData and the user is not authenticated, we need to fetch it
      let currentCourseData = courseData;
      
      if (!isAuthenticated && !currentCourseData) {
        // For simplicity, we'll use the data from the page if available
        // In a real implementation, you might want to fetch the course data here
        if (window.location.pathname.includes('/course/')) {
          const courseIdFromPath = window.location.pathname.split('/').pop();
          if (courseIdFromPath === courseId) {
            // Try to find course data in the page
            const courseElement = document.querySelector('[data-course-json]');
            if (courseElement) {
              try {
                currentCourseData = JSON.parse(courseElement.getAttribute('data-course-json') || '{}');
              } catch (e) {
                console.error('Failed to parse course data', e);
              }
            }
          }
        }
        
        if (!currentCourseData) {
          toast.error("Cannot add to cart without course data");
          setLoading(false);
          return;
        }
      }
      
      await dispatch(addToCart({ 
        courseId, 
        isAuthenticated, 
        courseData: currentCourseData 
      }) as any);
      
      await dispatch(fetchCart(isAuthenticated) as any);
      toast.success("Added to cart successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || loading || isInCart}
      className={`flex items-center justify-center px-4 py-2 rounded-md ${
        isInCart
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white transition-all ${className}`}
    >
      <HiShoppingCart className="mr-2" size={20} />
      {isLoading || loading
        ? "Processing..."
        : isInCart
        ? "In Cart"
        : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;

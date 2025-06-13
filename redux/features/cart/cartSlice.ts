import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Types
interface CartItem {
  cartItemId?: string;
  courseId: string;
  addedAt: Date;
  course: {
    name: string;
    description: string;
    price: number;
    thumbnail: {
      public_id: string;
      url: string;
    };
  };
}

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const localCart = localStorage.getItem('guestCart');
    return localCart ? JSON.parse(localCart) : [];
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('guestCart', JSON.stringify(cartItems));
  }
};

interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: loadCartFromLocalStorage(),
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (isAuthenticated: boolean = false, { rejectWithValue }) => {
    // If user is not authenticated, return the cart from localStorage
    if (!isAuthenticated) {
      return loadCartFromLocalStorage();
    }
    
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/get-cart`, {
        withCredentials: true,
      });
      return data.cart;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ courseId, isAuthenticated, courseData }: { courseId: string, isAuthenticated: boolean, courseData?: any }, { rejectWithValue, dispatch }) => {
    // If user is not authenticated, add to localStorage
    if (!isAuthenticated) {
      if (!courseData) {
        return rejectWithValue("Course data is required for guest cart");
      }
      
      const cartItems = loadCartFromLocalStorage();
      
      // Check if course is already in cart
      const existingItem = cartItems.find(item => item.courseId === courseId);
      if (existingItem) {
        return { success: true, message: "Course already in cart" };
      }
      
      // Add new item to cart
      const newItem: CartItem = {
        courseId,
        addedAt: new Date(),
        course: {
          name: courseData.name,
          description: courseData.description,
          price: courseData.price,
          thumbnail: courseData.thumbnail
        }
      };
      
      const updatedCart = [...cartItems, newItem];
      saveCartToLocalStorage(updatedCart);
      
      return { success: true, cart: updatedCart };
    }
    
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/add`,
        { courseId },
        { withCredentials: true }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ courseId, isAuthenticated }: { courseId: string, isAuthenticated: boolean }, { rejectWithValue }) => {
    // If user is not authenticated, remove from localStorage
    if (!isAuthenticated) {
      const cartItems = loadCartFromLocalStorage();
      const updatedCart = cartItems.filter(item => item.courseId !== courseId);
      saveCartToLocalStorage(updatedCart);
      return courseId;
    }
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/remove/${courseId}`, {
        withCredentials: true,
      });
      return courseId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (isAuthenticated: boolean = false, { rejectWithValue }) => {
    // If user is not authenticated, clear localStorage cart
    if (!isAuthenticated) {
      saveCartToLocalStorage([]);
      return true;
    }
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/clear`, {
        withCredentials: true,
      });
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to clear cart");
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async ({ paymentInfo, isAuthenticated }: { paymentInfo: any, isAuthenticated: boolean }, { rejectWithValue }) => {
    // If user is not authenticated, they need to login first
    if (!isAuthenticated) {
      return rejectWithValue("Please login to checkout");
    }
    
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/checkout`,
        { payment_info: paymentInfo },
        { withCredentials: true }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to checkout");
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.isLoading = false;
      // We'll refetch the cart to get the updated list
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove from cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.cartItems = state.cartItems.filter(
        (item) => item.courseId !== action.payload
      );
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Clear cart
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Checkout cart
    builder.addCase(checkoutCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkoutCart.fulfilled, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;

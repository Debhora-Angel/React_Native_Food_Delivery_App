import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async API call — replace the URL with your real or mock API later
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://dummyjson.com/products"); 
      return res.data.products.map((item) => ({
        id: item.id,
        name: item.title,
        image: item.thumbnail,
        rating: (Math.random() * 2 + 3).toFixed(1),
        cuisine: "Mixed Cuisine",
        deliveryTime: "20–30 min",
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch restaurants");
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;

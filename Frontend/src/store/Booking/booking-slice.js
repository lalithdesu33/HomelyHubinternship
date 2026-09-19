//managing booking
//store all bookings
//store individual booking details
//track api loading statuss
//add new bookings
//updating booking data from backend

import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bookings:[],
    bookingDetails:{},
    loading:false
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        setBookingRequest(state){
            state.loading=true;
        },
        //store bookings recvd from api
        setBookings(state,action){
            state.bookings=action.payload;
            state.loading=false
        },
        addBooking:(state,action)=>{
            state.bookings.push(action.payload);
        },
        setBookingDetails:(state,action)=>{
            state.bookingDetails = action.payload.bookings;
        }
    }
})

export const {setBookings,addBooking,setBookingDetails} = bookingSlice.actions;
export default bookingSlice;
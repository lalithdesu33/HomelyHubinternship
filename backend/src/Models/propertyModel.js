import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
        type: String,
        required: [true, 'Property name is required'],
    },
    description: {
        type: String,
        required: [true, 'Please add info about property'],
    },

    extraInfo: {
        type: String,
        default:"checkin on time.Good services."
    },
    propertyType: {
        type: String,
        enum:["House","flat","Guest house","Hotel"],
        default:"House"
    },
    roomType: {
        type: String,
        enum:["Any type","room","entire room"],
        default:"Any type"
    },

    maximumGuest: {
        type: Number,
        required: [true, 'Please Give maximum guests'],
        min: [1, 'Maximum guests must be at least 1'],
    },
    amenities: [{
        name: {
            type: String,
            required: true,
            enum: ["Wifi", "TV", "AC", "Kitchen", "Parking", "Pool", "Gym", "Washer", "Dryer", "Heating", "Fireplace", "Hot tub", "Breakfast", "washing machine", "free parking"],
        },
        icon: {
            type: String,
            required: true,
        },
    }],
    images:{
        type:[
            {
                public_id:{
                    type:String,
                },
                url:{
                    type:String,
                    required:true
                }
            }
        ],
        validate:{
            validator: function(arr) {
                return arr.length >=6;
            },
            message: 'Please provide at least 6 images for the property.',
        }
    },
    price: {
        type: Number,
        required: [true, 'Please enter price OF property per night'],
        default: 500,
    },
    address: {
        area:String,
        city:String,
        state:String,
        pincode:Number,
    },
   
    currentBookings: [
        {
            bookingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booking',
            },
            fromDate:{
                type: Date,
            },
            toDate:{
                type: Date,
            },
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            }
        
    ],

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slug:String,
    checkInTime: {type: String, default: "11:00"},
    checkOutTime: {type: String, default: "13:00"}
  },
);

propertySchema.pre('save', function() {
    this.slug = slugify(this.propertyName, { lower: true });
   
});

propertySchema.pre("save", function() {
    this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
   
});

//const Property = mongoose.model('Property', propertySchema);
const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);
export {Property};
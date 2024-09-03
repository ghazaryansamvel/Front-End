import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
    name: 'medicines',
    initialState: {
        medicines: [
            { "id": 1, "name": "Aspirin", "price": 8, photo: 'https://medicinaonline.ae/cdn/shop/products/Aspirin-Protect-30_s.jpg?v=1612788945' },
            { "id": 2, "name": "Cetirizine", "price": 6, photo: 'https://online-pharmacy4u.co.uk/cdn/shop/files/bmv_-_cetirizine_10mg_-_hay_fever_allergy_relief_-_360_tablets_-_front_face_mockup_1.webp?v=1699975067' },
            { "id": 3, "name": "Omeprazole", "price": 12, photo: 'https://res.cloudinary.com/zava-www-uk/image/upload/fl_progressive/a_exif,f_auto,e_sharpen:100,c_fit,w_1080,h_810,q_70,fl_lossy/v1706806290/sd/uk/services-setup/acid-reflux/omeprazole/knh8cjncnq9z5axkil3h.png' },
            { "id": 4, "name": "Atorvastatin", "price": 15, photo: 'https://5.imimg.com/data5/SELLER/Default/2023/7/325710235/RG/XA/JU/74349057/atorvastatin-10-mg.jpg' },
            { "id": 5, "name": "Azithromycin", "price": 18, photo: 'https://accessdoctor.co.uk/wp-content/uploads/2021/08/azithromycin.jpg' }
        ],
        ratings: {},
        searchQuery: '',
    },
    reducers: {
        updateRatings: (state, action) => {

            const { id, rating } = action.payload;
            state.ratings[id] = rating;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
});

export const medicineReducer = medicineSlice.reducer;
export const { updateRatings, setSearchQuery } = medicineSlice.actions;
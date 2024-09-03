import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './medicine.module.css';
import { updateRatings, setSearchQuery } from './medicine.slice';

export const Medicine = () => {
    const dispatch = useDispatch();
    const { medicines, ratings, searchQuery } = useSelector(state => ({
        medicines: state.medicines,
        ratings: state.ratings,
        searchQuery: state.searchQuery
    }));

    const filteredMedicines = medicines.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className={style.search}>
                <input
                    type="text"
                    placeholder='Search ...'
                    value={searchQuery}
                    onChange={e => dispatch(setSearchQuery(e.target.value))}
                />
            </div>
            <div className={style.tableContainer}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Ratings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMedicines.map(m => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td><img src={m.photo} className={style.medicinePhoto} alt={m.name} /></td>
                                <td>{m.name}</td>
                                <td>${m.price}</td>
                                <td>
                                    <div className={style.starRating}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span
                                                key={star}
                                                className={`${style.star} ${ratings[m.id] >= star ? style.filled : ''}`}
                                                onClick={() => dispatch(updateRatings({ id: m.id, rating: star }))}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

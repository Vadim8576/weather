import React from 'react';
// import './../../../styles/popular_movies.css';




const FilterPanel = ({ request, setRequestData, genres, setRequestDataGenreIds, getDiscoverMovies, ...props }) => {

    // console.log('props=', props);

    return (
        <>
            <div className='sort border'>
                <h6>Сортировка</h6>
                <hr />
                <p>Сортировать по:</p>
                <select value={request.sort_by} onChange={(e) => setRequestData({ sort_by: e.target.value, btn_is_visible: true })}>
                    <option value='popularity.asc'>популярности (возрастание)</option>
                    <option value='popularity.desc'>популярности (убывание)</option>
                    <option value='original_title.asc'>названию (возрастание)</option>
                    <option value='original_title.desc'>названию (убывание)</option>
                    <option value='release_date.asc'>дата релиза (возрастание)</option>
                    <option value='release_date.desc'>дата релиза (убывание)</option>
                </select>
            </div>
            <div className='filter border'>
                <h6>Фильтр</h6>
                <hr />
                <p>Дата выхода:</p>
                <label>
                    от <input type='date' value={request.release_date_gte} onChange={(e) => setRequestData({ release_date_gte: e.target.value, btn_is_visible: true })} />
                    <br />
                            до <input type='date' value={request.release_date_lte} onChange={(e) => setRequestData({ release_date_lte: e.target.value, btn_is_visible: true })} />
                </label>
                <hr />
                <p>Жанры:</p>
                {genres && genres.map((item, index) =>
                    <span
                        className={request.genres_ids.indexOf(item.id) !== -1 ? 'active border' : 'border'}
                        key={item.id}
                        onClick={() => setRequestDataGenreIds(item.id, true)}
                    >
                        {item.name}
                    </span>)
                }
            </div>

            {request.btn_is_visible &&
                <div className='request_btn' onClick={() => {
                    setRequestData({ btn_is_visible: false });
                    getDiscoverMovies(request);
                    props.setCurrentPage(1);
                }}>Применить</div>
            }

        </>
    )
}


export default FilterPanel;
import React, { useState } from "react";
import styles from './search-bar.module.scss';
import { InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { filterSelected } from "../../redux/filter/actions";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(filterSelected(query));
    };

    return (
        <div className={styles['search-container']}>
            <SearchIcon className={styles['search-icon']} />
            <form onSubmit={handleSearch}>
                <InputBase
                className={styles["text-field"]}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    label="Search"
                    placeholder="Search for tags"
                />
            </form>
        </div>
    );
}

export default SearchBar;
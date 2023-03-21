import React, { useState } from "react";
import { Chip, Button } from "@mui/material";
import styles from './filter.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { filterSelected } from "../../redux/filter/actions";

const Filter = () => {
    const options = ['javascript','python','php','java','c++','react','node']
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter.filter);

    const clearFilter = () => {
        dispatch(filterSelected('all'));
    }

    return (
        <div className={styles['filters']}>
            <div className={styles['chips']}>
                {options.map((option, index) => {
                    return (
                        <div key={index}>
                            <Chip
                                className={styles['chip']}
                                label={option}
                                onClick={() => {
                                    if (filter === option) {
                                        dispatch(filterSelected('all'));
                                    } else {
                                        dispatch(filterSelected(option));
                                    }
                                }}
                                color={filter === option ? "primary" : "default"}
                            />  
                        </div>
                    );
                })}
            </div>
            <div className={styles['button-div']}>
                <Button className={styles['button']} variant="text" onClick={clearFilter}>Clear</Button>
            </div>
        </div>
    );
}

export default Filter;
import React, { useState } from "react";
import { Chip, Button } from "@mui/material";
import styles from './filter.module.scss'
import { useDispatch } from "react-redux";
import { filterSelected } from "../../redux/filter/actions";

const Filter = () => {
    const [selected, setSelected] = useState('all');
    const options = ['javascript','python','php','java','c++','react','node']
    const dispatch = useDispatch();

    const clearFilter = () => {
        setSelected('all');
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
                                    if (selected === option) {
                                        setSelected('all');
                                        dispatch(filterSelected('all'));
                                    } else {
                                        setSelected(option);
                                        dispatch(filterSelected(option));
                                    }
                                }}
                                color={selected === option ? "primary" : "default"}
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
import React from "react";
import styles from './profile.module.scss'
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChanagePassword";

const ChangeLogInInfo = () => {
    return (
        <div className={styles['profile-page']}>
            <div className={styles['change-profile-info']}>
                <ChangeEmail />
                <ChangePassword />
            </div>
        </div>
    )
}

export default ChangeLogInInfo
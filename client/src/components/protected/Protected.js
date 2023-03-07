import React from "react";
import styles from './protected.module.scss';
import { Typography } from "@mui/material";
import SignInButton from "../navbar/sign-in-button/SignInButton";
import SignUpButton from "../navbar/sign-up-button/SignUpButton";

const Protected = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.protected}>
            <div className={styles['protected-content']}>
                <div className={styles['protected-heading-div']}>
                    <Typography className={styles['protected-heading-font']}>You must be logged in to access this page.</Typography>
                    <div className={styles.buttons}>
                        <SignInButton />
                        <SignUpButton />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Protected;
import React from 'react';
import s from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg" width={'950px'}/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    );
};

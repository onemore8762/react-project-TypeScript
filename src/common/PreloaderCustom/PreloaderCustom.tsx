import React from 'react';
import {
    LoadingOutlined
} from '@ant-design/icons';
import s from './PreloaderCustom.module.css'
export const PreloaderCustom = () => {
    return (
        <div className={s.container}>
            <LoadingOutlined className={s.loading} spin />
        </div>
    );
};

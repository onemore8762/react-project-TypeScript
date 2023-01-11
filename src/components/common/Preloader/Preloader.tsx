import React from 'react';
import {
    LoadingOutlined
} from '@ant-design/icons';

export const Preloader = () => {
    return (
        <div>
            <LoadingOutlined style={{ fontSize: 120 }} spin />
        </div>
    );
};

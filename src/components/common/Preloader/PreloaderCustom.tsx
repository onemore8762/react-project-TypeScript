import React from 'react';
import {
    LoadingOutlined
} from '@ant-design/icons';

export const PreloaderCustom = () => {
    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <LoadingOutlined style={{ fontSize: 120 }} spin />
        </div>
    );
};

import React from 'react';
import {Pagination, PaginationProps} from "antd";
import s from './Paginator.module.css'

type ItemsPropsType = {
    currentPage: number
    totalItems: number
    onPageChanged: (page: number, pageSize: number) => void
    pageSize: number
}


export const Paginator: React.FC<ItemsPropsType> = ({pageSize, onPageChanged, currentPage, totalItems}) => {

    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} users`;

    return (
        <div className={s.container}>
            <Pagination
                className={s.paginator}
                size="small"
                onChange={(page, pageSize) => onPageChanged(page, pageSize)}
                current={currentPage}
                pageSize={pageSize}
                pageSizeOptions={[10, 15, 20, 30, 40, 50]}
                total={totalItems}
                showTotal={showTotal}
                showSizeChanger
                showQuickJumper
            />
        </div>
    );
};

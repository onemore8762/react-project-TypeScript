import React from 'react';
import {Pagination, PaginationProps} from "antd";


type ItemsPropsType = {
    currentPage: number
    totalItems: number
    onPageChanged: (page: number, pageSize: number) => void
    pageSize: number
}


export const Paginator: React.FC<ItemsPropsType> = (props) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} users`;
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Pagination
                style={{backgroundColor: '#ececec',position:'absolute', color: '#000000', bottom: 0, padding:5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomLeftRadius: -5}}
                size="small"
                onChange={(page,pageSize)=> props.onPageChanged(page, pageSize)}
                current={props.currentPage}
                pageSize={props.pageSize}
                pageSizeOptions={[7,21,42]}
                total={props.totalItems}
                showTotal={showTotal}
                showSizeChanger
                showQuickJumper
            />
        </div>
    );
};

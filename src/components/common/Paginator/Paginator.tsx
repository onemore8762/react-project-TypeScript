import React from 'react';
import s from "./Paginator.module.css";


type ItemsPropsType = {
    currentPage: number
    totalItems: number
    onPageChanged: (page: number) => void
    pageSize: number
}


export const Paginator: React.FC<ItemsPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalItems / props.pageSize)

    let pages = [1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount]

    if (props.currentPage < 4) {
        pages = [1, 2, 3, 4, pagesCount]
    }
    if (props.currentPage > pagesCount - 2) {
        pages = [1, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
    }
    return (
        <div>
            {pages.map((p,index) => {
                return <span className={props.currentPage == p ? s.selectedPage + ' ' + s.default : s.default}
                             key={index}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
    );
};

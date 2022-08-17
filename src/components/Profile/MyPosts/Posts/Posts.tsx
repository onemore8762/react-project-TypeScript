import React from 'react';
import s from './Posts.module.css';

type PostsPropsType = {
    message? : string
    like? : number
}
export const Posts: React.FC<PostsPropsType> = (props) => {
    return(
        <div className={s.item}>
            <img src="https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg" />
            {props.message}
            <div>
                <span>like {props.like}</span>
            </div>
        </div>

    );
}
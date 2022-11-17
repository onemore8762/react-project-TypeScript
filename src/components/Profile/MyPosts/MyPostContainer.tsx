import React from 'react';
import {AddPostAC, postType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Dispatch} from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


type mapStateToPropsType = {
    posts: Array<postType>
}

type mapDispatchToPropsType ={
    addPost: (post: string) => void
}

const mapStateToProps = (state: AppStateType) : mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch)  : mapDispatchToPropsType=> {
    return {
        addPost: (post: string) => {
            dispatch(AddPostAC(post))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
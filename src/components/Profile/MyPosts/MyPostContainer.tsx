import React from 'react';
import {AddPostAC, CreateNewTextAC, postType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Dispatch} from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


type mapStateToPropsType = {
    posts: Array<postType>
    newPostText: string
}

type mapDispatchToPropsType ={
    addPost: () => void
    onChangeText: (value: string) => void
}

const mapStateToProps = (state: AppStateType) : mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch)  : mapDispatchToPropsType=> {
    return {
        addPost: () => {
            dispatch(AddPostAC())
        },
        onChangeText: (value: string) => {
            dispatch(CreateNewTextAC(value))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
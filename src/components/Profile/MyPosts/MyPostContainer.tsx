import React from 'react';
import {AddPostAC, CreateNewTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {StoreContext} from "../../../StoreContext";

/*type MyPostsType = {
    store: any
}*/

export const MyPostsContainer = () => {


    return (
        <StoreContext.Consumer>
            {
                store => {
                    const state = store.getState()

                    const addPostHandler = () => {
                        store.dispatch(AddPostAC())
                    }
                    const onPostHandler = (value: string) => {
                        store.dispatch(CreateNewTextAC(value))
                    }

                    return <MyPosts addPost={addPostHandler}
                                    onChangeText={onPostHandler}
                                    newPostText={state.profilePage.newPostText}
                                    posts={state.profilePage.posts}/>
                }
            }

        </StoreContext.Consumer>
    )

}
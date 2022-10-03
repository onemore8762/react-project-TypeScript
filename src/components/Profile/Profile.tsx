import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";
import {RootStoreTypeRedux} from "../../redux/redux-store";

/*type ProfileType={
    store: RootStoreTypeRedux
}*/

export const Profile = () => {

    return (
        <>
            <ProfileInfo/>
            <MyPostsContainer />
        </>

    );
}
import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {SetUserProfileAC} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {profileAPI} from "../../api/api";


type PathParamsType = {
    userId: any
}

type mapStateToProps = {
    profile: any
}
type mapDispatchToProps = {
    SetUserProfile: (profile: any) => any
}

type ownPropsType = mapStateToProps & mapDispatchToProps
type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = 11
        profileAPI.getProfile(userId)
            .then(data => {
                this.props.SetUserProfile(data)
            })
    }

    render() {
        return (
            <>
                <Profile profile={this.props.profile}/>
            </>

        );
    }
}

let mapStateToProps = (state: AppStateType): mapStateToProps => ({
    profile: state.profilePage.profile
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)


export default connect(mapStateToProps, {
    SetUserProfile: SetUserProfileAC
})(withUrlDataContainerComponent)
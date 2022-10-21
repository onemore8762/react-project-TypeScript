import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {SetUserProfileAC} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";


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
        if (!userId) userId = 2
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(responce => {

                this.props.SetUserProfile(responce.data)
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
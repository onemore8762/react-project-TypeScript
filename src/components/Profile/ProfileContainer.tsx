import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

export type profileType = {

    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        "website": string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: string,
    "photos": {
        "small": string | null,
        "large": string

    }
}

type PathParamsType = {
    userId: string | undefined
}

type mapStateToProps = {
    profile: profileType | null
}

type mapDispatchToProps = {
    getUserProfile: (userId: string) => void
}

type ownPropsType = mapStateToProps & mapDispatchToProps
type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = "11"
        this.props.getUserProfile(userId)
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
    getUserProfile
})(withUrlDataContainerComponent)
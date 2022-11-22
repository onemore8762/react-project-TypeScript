import React from 'react';
import {compose} from 'redux'
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
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


type ownPropsType = mapStateToProps & mapDispatchToProps
type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId =this.props.authorizedUserId?.toString()
        if (userId){
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    render() {
        return (
            <>
                <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </>

        );
    }
}


type mapStateToProps = {
    profile: profileType | null
    status: string
    authorizedUserId: number | null
}

type mapDispatchToProps = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}

let mapStateToProps = (state: AppStateType): mapStateToProps => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
   /* withAuthRedirect*/
)(ProfileContainer)

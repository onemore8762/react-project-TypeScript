import React from 'react';
import {compose} from 'redux'
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string | undefined
}


type ownPropsType = mapStateToProps & mapDispatchToProps
type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId?.toString()
            if(!userId){
                this.props.history.push('/login')
            }
        }
        if (userId) {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    render() {
        return (
            <>
                <Profile profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
            </>

        );
    }
}


type mapStateToProps = {
    profile:  ProfileType
    status: string
    authorizedUserId: number | null
}

type mapDispatchToProps = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (photoFile: any) => void
    saveProfile: (userId: string, FormData: any) => void
}

let mapStateToProps = (state: AppStateType): mapStateToProps => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    /* withAuthRedirect*/
)(ProfileContainer)

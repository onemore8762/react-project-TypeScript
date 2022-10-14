import React from 'react';
import userPhoto from "../../assets/images/user.png";
import axios from "axios";
import {initialStateType, UserType} from "../../redux/users-reducer";

type UsersTypeProps = {
    usersPage: initialStateType
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}

class Users extends React.Component<UsersTypeProps> {

    /*constructor(props: UsersTypeProps) {
        super(props);
    }*/
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(responce => {
            this.props.setUsers(responce.data.items)
        })
    }

    render(){
        return (
            <div>
                {this.props.usersPage.users.map(el => {
                    return (
                        <div>
                            <img src={el.photos.small != null ? el.photos.small: userPhoto} style={{width: '100px'}}/>
                            <div>{el.name}</div>
                            <div>{'el.location.city'}</div>
                            <div>{'el.location.country'}</div>
                            {el.followed
                                ? <button onClick={() => this.props.unFollow(el.id)}>unfollowed</button>
                                : <button onClick={() => this.props.follow(el.id)}>followed</button>

                            }
                            <div>-------</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Users;
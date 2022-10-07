import React from 'react';
import {initialStateType, UserType} from "../../redux/users-reducer";


type UsersTypeProps = {
    usersPage: initialStateType
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}

const Users = (props: UsersTypeProps) => {

    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                avatarUrl: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg',
                followed: true,
                fullName: 'Denis',
                status: 'I am a booss',
                location: {city: 'Cherepovetz', country: 'Russia'}
            },
            {
                id: 2,
                avatarUrl: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg',
                followed: false,
                fullName: 'Dmitry',
                status: 'I am a boss to',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 3,
                avatarUrl: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg',
                followed: true,
                fullName: 'Andrew',
                status: 'I am a bdasd',
                location: {city: 'Kiev', country: 'Ukraine'}
            }

        ])
    }

    return (
        <div>
            {props.usersPage.users.map(el => {
                return (
                    <div>
                        <img src={el.avatarUrl} style={{width: '100px'}}/>
                        <div>{el.fullName}</div>
                        <div>{el.location.city}</div>
                        <div>{el.location.country}</div>
                        {el.followed
                            ? <button onClick={() => props.unFollow(el.id)}>unfollowed</button>
                            : <button onClick={() => props.follow(el.id)}>followed</button>

                        }
                        <div>-------</div>
                    </div>
                )
            })}
        </div>
    );
};

export default Users;
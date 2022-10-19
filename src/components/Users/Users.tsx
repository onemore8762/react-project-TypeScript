import React from 'react';
import userPhoto from "../../assets/images/user.png";
import axios from "axios";
import {initialStateType, UserType} from "../../redux/users-reducer";
import s from './Users.module.css'

type UsersTypeProps = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

class Users extends React.Component<UsersTypeProps> {

    /*constructor(props: UsersTypeProps) {
        super(props);
    }*/
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(responce => {
            this.props.setUsers(responce.data.items);
            this.props.setTotalUsersCount(responce.data.totalCount)
        })
    }

    onPageChanged = (p: number) => {
        if(p !== this.props.currentPage){
            this.props.setCurrentPage(p)
            console.log('wait....')
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
                .then(responce => {
                    this.props.setUsers(responce.data.items)
                    console.log('complete...')
                })
        }

    }

    render(){

        let pagesCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize)

        let pages = [1, this.props.currentPage-1, this.props.currentPage, this.props.currentPage+1, pagesCount]

        if (this.props.currentPage < 4) {
            pages = [1, 2, 3, 4, pagesCount]
        }
        if (this.props.currentPage > pagesCount - 2) {
            pages = [1, pagesCount-3, pagesCount-2, pagesCount-1, pagesCount]
        }
        return (
            <div>
                <div>
                    {pages.map(p => {
                        return <span className={this.props.currentPage == p? s.selectedPage : ''}
                                     onClick={() => { this.onPageChanged(p)}}>{p}</span>
                    })}
                </div>
                {this.props.users.map(el => {
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
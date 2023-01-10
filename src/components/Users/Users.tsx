import React, {useEffect} from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {FilterType, follow, requestUsers, setCurrentPage, unFollow} from "../../redux/users-reducer";
import {Field, Form, Formik} from "formik";
import {AppStateType} from "../../redux/redux-store";

const getFilter = (state: AppStateType) => state.usersPage.filter

export const Users: React.FC = () => {
    const users = useAppSelector(getUsers)
    const pageSize = useAppSelector(getPageSize)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const filter = useAppSelector(getFilter)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])


    const onPageChanged = (page: number) => {
        if (page !== currentPage) {
            dispatch(requestUsers(page, pageSize, filter))
        }
    }
    const setFilter = (filter: FilterType) => {
            dispatch(requestUsers(1, pageSize, filter))
    }

    const followCallBack = (userID: number) => {
        dispatch(follow(userID))
    }
    const unFollowCallBack = (userID: number) => {
        dispatch(unFollow(userID))
    }
    return (
        <div>
            <Formik
                initialValues={{ term: filter.term, friend: filter.friend}}
                onSubmit={(values) => {
                    console.log(values)
                    setFilter(values)
                }}
            >
                {() => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field as="select" name="friend" value={undefined}>
                            <option value="null" defaultChecked={true}>All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unFollowed</option>
                        </Field>
                        <button type="submit">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <Paginator currentPage={currentPage}
                       pageSize={pageSize}
                       onPageChanged={onPageChanged}
                       totalItems={totalUsersCount}/>

            <User users={users}
                  follow={followCallBack}
                  unFollow={unFollowCallBack}
                  followingInProgress={followingInProgress}/>
        </div>
    );
};

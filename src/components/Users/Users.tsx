import React, {useEffect} from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    getCurrentPage,
    getFollowingInProgress, getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {FilterType, follow, requestUsers, unFollow} from "../../redux/users-reducer";
import {Form, Formik} from "formik";
import {AppStateType} from "../../redux/redux-store";
import {Button, Empty, Input, Select} from "antd";
import {PreloaderCustom} from "../common/Preloader/PreloaderCustom";

const getFilter = (state: AppStateType) => state.usersPage.filter

export const Users: React.FC = () => {
    const users = useAppSelector(getUsers)
    const pageSize = useAppSelector(getPageSize)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const filter = useAppSelector(getFilter)
    const isFetching = useAppSelector(getIsFetching)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (page: number, newPageSize: number) => {
        if (page !== currentPage || pageSize !== newPageSize) {
            dispatch(requestUsers(page, newPageSize, filter))
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
        <div >
            <Formik
                initialValues={{ term: filter.term, friend: filter.friend}}
                onSubmit={(values) => {
                    setFilter(values)
                }}
            >
                {({submitForm, setFieldValue, getFieldProps}) => (
                    <Form style={{display: 'flex', justifyContent: 'center'}}>
                        <Input value={getFieldProps('term').value} onChange={(e)=> setFieldValue('term',e.currentTarget.value)} style={{width: 200}}/>
                        <Select defaultValue='All'
                                style={{ width: 140 }}
                                onChange={(e) => setFieldValue('friend',e)}
                                options={[
                                    {
                                        value: 'All',
                                        label: 'All',
                                    },
                                    {
                                        value: 'true',
                                        label: 'Only followed',
                                    },
                                    {
                                        value: 'false',
                                        label: 'Only unFollowed',
                                    }
                                ]}/>


                        <Button onClick={submitForm}>
                            Find
                        </Button>
                    </Form>
                )}
            </Formik>
            {isFetching && <PreloaderCustom/>}
            {!isFetching && !!users.length && <User users={users}
                                  follow={followCallBack}
                                  unFollow={unFollowCallBack}
                                  followingInProgress={followingInProgress}/>}
            {!users.length && <Empty style={{marginTop: 100}}/> }
            <Paginator currentPage={currentPage}
                       pageSize={pageSize}
                       onPageChanged={onPageChanged}
                       totalItems={totalUsersCount}/>
        </div>
    );
};

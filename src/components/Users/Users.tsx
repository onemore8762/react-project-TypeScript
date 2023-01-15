import React, {useEffect} from 'react';
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User/User";

import {FilterType, follow, requestUsers, unFollow} from "../../redux/users-reducer";
import {Form, Formik} from "formik";
import {Button, Empty, Input, Select} from "antd";
import {PreloaderCustom} from "../../common/PreloaderCustom/PreloaderCustom";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {selectUsers} from "../../common/selectors/selectors";


export const Users: React.FC = () => {
    const users = useAppSelector(selectUsers.Users)
    const pageSize = useAppSelector(selectUsers.PageSize)
    const totalUsersCount = useAppSelector(selectUsers.TotalUsersCount)
    const currentPage = useAppSelector(selectUsers.CurrentPage)
    const followingInProgress = useAppSelector(selectUsers.FollowingInProgress)
    const filter = useAppSelector(selectUsers.Filter)
    const isFetching = useAppSelector(selectUsers.IsFetching)
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
        <div>
            <Formik
                initialValues={{ term: filter.term, friend: filter.friend}}
                onSubmit={(values) => {
                    setFilter(values)
                }}
            >
                {({submitForm, setFieldValue, getFieldProps}) => (
                    <Form style={{display: 'flex', justifyContent: 'center', padding: 5}}>
                        <Input value={getFieldProps('term').value}
                               onChange={(e)=> setFieldValue('term',e.currentTarget.value)}
                               style={{width: 200, marginRight: 10}}
                               placeholder={'Enter user'}
                        />
                        <Select defaultValue={filter.friend}
                                style={{ width: 140 , marginRight: 10}}
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

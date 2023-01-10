import React from 'react';
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {useAppSelector} from "../../redux/hooks";
import {getIsFetching} from "../../redux/users-selectors";


export const UsersPage: React.FC = () => {
    const isFetching = useAppSelector(getIsFetching)
    return <>
        {isFetching && <Preloader/>}
        <Users/>
    </>
}

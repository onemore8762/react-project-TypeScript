import React from 'react';
import {NavLink} from "react-router-dom";
import {UserType} from "../../../common/api/users-api";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Card} from "antd";
import Meta from "antd/es/card/Meta";

type UserPropsType = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    followingInProgress: Array<number>
}


export const User: React.FC<UserPropsType> = (props) => {
        return (
            <div style={{display: 'flex', flexWrap: "wrap", marginLeft: 10, height: 780, overflowY: "auto", alignContent: 'flex-start'}}>
                {props.users.map(el => {
                    return (
                        <div key={el.id}
                             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10}}>
                            <Card
                                hoverable
                                style={{width: 180, backgroundColor: 'rgba(196,224,255,0.25)'}}
                                bodyStyle={{color: '#ffffff'}}
                                headStyle={{}}
                                cover={
                                    <NavLink style={{textAlign: 'center', marginTop: 13}} to={'/profile/' + el.id}>
                                        <Avatar size={120} src={el.photos.small} icon={<UserOutlined/>}/>
                                    </NavLink>
                                }>
                                <Meta title={<span style={{color: 'white'}}>{el.name}</span>} style={{textAlign: 'center', color: '#ffffff'}}
                                      description={el.followed ?
                                          <Button disabled={props.followingInProgress.some(id => id === el.id)}
                                                  onClick={() => {
                                                      props.unFollow(el.id)
                                                  }}>unfollowed</Button>
                                          : <Button disabled={props.followingInProgress.some(id => id === el.id)}
                                                    onClick={() => {
                                                        props.follow(el.id)
                                                    }}>followed</Button>

                                      }/>
                            </Card>

                        </div>
                    )
                })}

            </div>
        );
    }
;

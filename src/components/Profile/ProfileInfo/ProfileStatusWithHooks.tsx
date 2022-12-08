import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


export const ProfileStatusWithHooks = (props: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(status)
    },[props.status])

    const activeEditMode = () => {
        setEditMode(true)
    }

    const deActiveEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const keyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            deActiveEditMode()
        }
    }

    return (
        <>
            {!editMode &&
                <div>
                    <b>Status:</b>
                    <span onDoubleClick={activeEditMode}>{props.status || "Not status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <b>Status:</b>
                    <input onKeyDown={keyDown} onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode}
                           value={status}></input>
                </div>
            }
        </>
    );
}


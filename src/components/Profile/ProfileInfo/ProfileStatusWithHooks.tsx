import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


export const ProfileStatusWithHooks: React.FC<PropsType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState(false)
    const [stateStatus, setStatus] = useState(status)
    useEffect(() => {
        setStatus(status)
    },[status])

    const activeEditMode = () => {
        setEditMode(true)
    }

    const deActiveEditMode = () => {
        setEditMode(false)
        updateStatus(stateStatus)
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
                    <span onDoubleClick={activeEditMode}>{status || "Not status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onKeyDown={keyDown} onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode}
                           value={stateStatus}></input>
                </div>
            }
        </>
    );
}


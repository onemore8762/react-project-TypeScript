import React from 'react';

type PropsType = {
    title: string
}

export class ProfileStatus extends React.Component<PropsType> {
    state = {
        editMode: false,
        title: this.props.title
    }

    activeEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActiveEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activeEditMode}>{this.state.title}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deActiveEditMode}></input>
                    </div>
                }
            </>
        );
    }
}

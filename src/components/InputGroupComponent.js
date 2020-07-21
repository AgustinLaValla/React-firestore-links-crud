import React from 'react';

export const InputGroupComponent = (props) => {
    return (
        <div className="form-group input-group">
            <div className="input-group-text bg-light">
                <i className="material-icons">{props.icon_name}</i>
            </div>
            <input type="text"
                className="form-control"
                placeholder={props.placeholdername}
                name={props.name}
                onChange={props.changeHandler}
                value={props.value}
            />
        </div>
    );
}
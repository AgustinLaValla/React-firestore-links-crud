import React from 'react';
import './linkdata.css'

export const LinkData = ({ name, description, url, id, deleteLink, editLink }) => {
    return (
        <div className="card mb-1">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 >{name}</h4>
                    <div>
                        <i className="material-icons text-danger px-2 pointer" onClick={() => deleteLink(id)}>delete</i>
                        <i className="material-icons text-success px-2 pointer" onClick={() => editLink(id)}>edit</i>
                    </div>
                </div>
                <p>{description}</p>
                <a href={url} target="_blank_">Go to website</a>
            </div>
        </div>
    )
}
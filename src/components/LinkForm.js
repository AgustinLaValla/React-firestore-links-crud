import React, { Component, useState, useEffect } from 'react';
import { InputGroupComponent } from './InputGroupComponent';
import { db } from '../firebase';
import { toast } from 'react-toastify';


export const LinkForm = (props) => {

    const initialState = { name: '', url: '', description: '' }
    const [values, setValues] = useState(initialState);

    const InputChangeHandler = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const validUrl = str => /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);

    const submitHandler = async event => {
        event.preventDefault();

        if (!validUrl(values.url)) {
            return toast('Invalid URL', { type: "error", position: "top-center", autoClose: 3000 });
        }

        await props.addOrEditLink(values);
        setValues({ ...initialState });
    }


    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialState })
        } else {
            const link = props.links.find(link => link.id === props.currentId);
            setValues({ name: link.name, url: link.url, description: link.description });
        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={submitHandler}>
            <InputGroupComponent name="url" value={values.url} placeholdername="https:someurl.com" icon_name="insert_link" changeHandler={InputChangeHandler} />
            <InputGroupComponent name="name" value={values.name} placeholdername="Website name" icon_name="create" changeHandler={InputChangeHandler} />

            <div className="form-group">
                <textarea name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Escribe una descripción"
                    onChange={InputChangeHandler}
                    value={values.description}
                >
                </textarea>
            </div>

            <button type="submit" className="btn btn-primary">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>

        </form>
    )
}



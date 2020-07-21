import React, { useEffect, useState } from 'react'
import { LinkForm } from './LinkForm'
import { db } from '../firebase';
import { LinkData } from './LinkData';
import { toast } from 'react-toastify';


export const Links = () => {


    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async linkObject => {
        if (currentId === '') {
            await db.collection('links').doc().set(linkObject);
            toast('New link added!', { type: "success", position: "top-center", autoClose: 2000 });
        } else {
            await db.collection('links').doc(currentId).update(linkObject);
            toast('Link successfully updated!', { type: "success", position: "top-center", autoClose: 2000 });
            setCurrentId('');
        }
    };

    const getLinks = () => {
        db.collection('links').onSnapshot((snap) => {
            const docs = [];
            snap.docs.map(doc => docs.push({ ...doc.data(), id: doc.id }));
            setLinks(docs);
        });
    }


    const deleteLink = async (id) => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete();
            toast('Link deleted', { type: 'dark', position: "top-center", autoClose: 2000 });
        }
    }

    useEffect(() => {
        getLinks();
    }, [])

    return (

        <div className="col-md-8 mt-5 mx-auto">
            <LinkForm {...{ addOrEditLink, currentId, links }} />
            <div className="mt-1">
                {links.map(({ id, name, description, url }) => (
                    <LinkData key={id}
                        name={name}
                        description={description}
                        url={url}
                        id={id}
                        deleteLink={deleteLink}
                        editLink={setCurrentId}
                    />
                ))}
            </div>
        </div>
    )
}



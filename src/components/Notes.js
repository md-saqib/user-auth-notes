import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import AddNotes from './AddNotes'
import axios from 'axios'
import swal from "sweetalert";



const Notes = (props) => {

    const [notes, setNotes] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get('http://dct-user-auth.herokuapp.com/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            setNotes(result) 
        })
        .catch((err) => {
            alert(err.message)
        })
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            alert(`Are you sure you want to delete ${result.title}?`)
            history.go(0)
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    const modalView = (id) => {
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            swal(result.title, result.body)
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    return (
    <div className="container">
        <div className="row">
            <div className="col-md-5">
                <AddNotes />
            </div>
            <div className="col-md-5 ml-auto">
                {notes.map((note) => {
                    return (
                    <div className="card-body card hover-shadow-lg mt-5" key={note._id}>
                        <h2 >{note.title}</h2>
                        <p >{note.body}</p>
                        <div className="row">
                            <input 
                                className="btn btn-danger ml-3"
                                type="button" 
                                value="delete" 
                                onClick={() => {
                                    return handleDelete(note._id)
                                }} />
                            <input
                                className="btn btn-primary ml-3"
                                type="button"
                                value="view"
                                onClick={() => {
                                    return modalView(note._id)
                                }}/>
                        </div>
                    </div>
                    )
                }).reverse()}
                <br/>
            </div>
        </div>
    </div>
    )
}

export default Notes
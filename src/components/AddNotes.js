import axios from 'axios'
import React, {useState} from 'react'
import { useHistory } from 'react-router'

const AddNotes = (props) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const history = useHistory()

    const handleChange = (e) => {
        if(e.target.name === 'title') {
            setTitle(e.target.value)
        } else if(e.target.name === "body") {
            setBody(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: title,
            body: body
        }

        // Validations if required

        axios.post('http://dct-user-auth.herokuapp.com/api/notes', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    alert('successfully added note')
                    history.go(0)
                }
            })
            .catch((err) => {
                alert(err.message)
            })

    }


    return (
        <>
            <h3 className="mt-5">Add your Notes</h3>
            <form className="mt-5" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="sr-only">Title</label>
                <input className="form-control form-control-lg" placeholder="Enter your Title" type="text" value={title} onChange={handleChange} name="title"  />
              </div>
              <div className="form-group">
                <label className="sr-only">Body</label>
                <textarea className="form-control form-control-lg textarea-autosize" rows="5" placeholder="Type your Notes" value={body} onChange={handleChange} name="body"></textarea>
              </div>
              <input type="submit" className="btn btn-dark mt-4" value="Save" />
            </form>
        </>
    )
}

export default AddNotes
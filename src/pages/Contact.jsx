import { useState } from 'react'
import axios from 'axios';
const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;


const ContactForm = () => {
    // ---------state-----------
    // setup state for contact form submission
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    // state for input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // handle a submit function
    const handleSubmit = (event) => {
        // stop page refreshing
        event.preventDefault();

        // ----Create a FormData object, and append each field to the object
        // form data is necessary to meet criteria of post request in contact form 7
        // it's a default javascript function, not unique to react
        const testForm = new FormData();
        testForm.append('your-name', name)
        testForm.append('your-email', email)
        testForm.append('your-message', message)

        // ----post the form, using axios.post
        // first argument is the formEndpoint, second is the data
        axios.post(formEndpoint, testForm, {
            // include headers to tell the mail service we're sending a form
            // headers tell the server what to expect
            // e.g. remember back to when we used headers to send an API key with spotify API
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(function (response) {
                console.log(response);
                // update state to show submitted
                setSubmitted(true);
            })
            .catch(function (error) {
                console.log(error);
                // update state to show error
                setError(true);
            });
    };
    if (submitted) {
        // return success message
        return (
            <>
                <h3>Thank you!</h3>
                <p>We'll be in touch soon.</p>
            </>
        );
    }
    if (error) {
        return (
            <>
                <h3>Error!</h3>
                <p>Sorry, we were unable to send your message.</p>
            </>
        );
    }
    return (
        <form
            onSubmit={handleSubmit}
            method="POST"
        >
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                    required
                />
            </div>
            <div>
                <button
                    className="regular-button"
                    type="submit"
                >
                    Send a message
                </button>
            </div>
        </form>
    );
}

const Contact = () => {
    return (
        <div id="contact-container" className="container">
            <div>
                <h2>Contact us</h2>
                <ContactForm />
            </div>
        </div>
    )
}

export default Contact
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import './UserForm.css'; // import CSS file for styling
import { useHistory } from 'react-router-dom';


const UserForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bmi, setBmi] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            history.push('/home');

        }, 2000);
        // Send form data to server or API endpoint using fetch API
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('bmi', bmi);
        formData.append('weight', weight);
        formData.append('height', height);
        formData.append('bloodPressure', bloodPressure);
        formData.append('heartRate', heartRate);
        formData.append('respiratoryRate', respiratoryRate);
        formData.append('temperature', temperature);
        formData.append('symptoms', symptoms);

        console.log(formData, 'dataa');
    }

    return (
        <div className="container">
                        {isSubmitting && (
                <div className="overlay">
                    <div className="spinner"></div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
                <label>
                    Phone Number:
                    <input type="tel" value={phone} onChange={event => setPhone(event.target.value)} />
                </label>
                <label>
                    BMI:
                    <input type="number" step="0.01" value={bmi} onChange={event => setBmi(event.target.value)} />
                </label>
                <label>
                    Weight (in kg):
                    <input type="number" step="0.01" value={weight} onChange={event => setWeight(event.target.value)} />
                </label>
                <label>
                    Height (in meters):
                    <input type="number" step="0.01" value={height} onChange={event => setHeight(event.target.value)} />
                </label>
                <label>
                    Blood Pressure:
                    <input type="text" value={bloodPressure} onChange={event => setBloodPressure(event.target.value)} />
                </label>
                <label>
                    Heart Rate:
                    <input type="number" value={heartRate} onChange={event => setHeartRate(event.target.value)} />
                </label>
                <label>
                    Respiratory Rate:
                    <input type="number" value={respiratoryRate} onChange={event => setRespiratoryRate(event.target.value)} />
                </label>
                <label>
                    Temperature:
                    <input type="number" step="0.01" value={temperature} onChange={event => setTemperature(event.target.value)} />
                </label>
                <label>
                    Symptoms:
                    <textarea rows="4" value={symptoms} onChange={event => setSymptoms(event.target.value)} />
                </label>
                <button type="submit">Submit</button>

               </form>
               </div>
    );
}

export default withRouter(UserForm);




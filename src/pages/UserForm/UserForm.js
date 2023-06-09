import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import './UserForm.css'; // import CSS file for styling
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {chatGPTSuggestion} from '../../store/actions/actionCreators/productsListAction'
import { useDispatch } from "react-redux";

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
    const [diabetes, setDiabetes] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
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

        var prompt = 'List of vegetables for ';
        formData.forEach(function(value, key){
            if(value) {
                prompt += key + ' ' +value + ' '
            }
        });

        console.log(prompt, 'prompt');

         // Send a request to the server with the prompt
        axios
            .post("/chat", { prompt })
            .then((res) => {
                // Update the response state with the server's response
                console.log(res.data)
                dispatch(chatGPTSuggestion(res.data));
                setIsSubmitting(false);
                // setTimeout(() => {
                    history.push('/home');
                // }, 2000);
            })
            .catch((err) => {
                console.error(err);
            });
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
                    <input type="text"  style={{width:'100%',paddingLeft:0}} value={bloodPressure} onChange={event => setBloodPressure(event.target.value)} />
                </label>
                <label>
                    Heart Rate:
                    <input type="number" value={heartRate} onChange={event => setHeartRate(event.target.value)} />
                </label>
                <label>
                     Diabetes:
                    <input type="number" value={diabetes} onChange={event => setDiabetes(event.target.value)} />
                </label>
                <button  type="submit">Analyze data</button>

               </form>
               </div>
    );
}

export default withRouter(UserForm);




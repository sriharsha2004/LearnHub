import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import SetAuthToken from "../SetAuthToken";
import Navbar from "./navbar";
import "../stylesheets/Instructor/quiz.css"

const AttemptQuiz = () => {

    const [answers,setanswers] = useState({});
    const [score,setscore] = useState();
    const [submitted,setsubmitted] = useState(false);
    const [percentage,setpercentage] = useState(0);

  const [data,setdata] = useState(null);

  const {id} = useParams();
  const navigate = useNavigate();
  SetAuthToken(localStorage.getItem("token"));

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/quiz/all` , { params : { moduleId : id} })
      .then(res => { 
        console.log(res.data);
        
        if(res.data.questions != null) 
            setdata(res.data.questions);
            // setQuestions(response.data[0].questions);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);


  const Storeanswers = (questionId, option) => {
    setanswers(prevState => ({
        ...prevState,
        [questionId]: option
    }));
};

    const postanswers = () => {
        const stans = {moduleId : id , Studentanswers : answers}
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/quiz/getscore`,stans).then((res)=>{
          setpercentage(((res.data)/(data.length))*100)
          setscore(res.data);
          setsubmitted(true);

        })
        .catch((err)=>{
            console.log("Error occured");    
        })
    }

    const storeBatch = () => {
      const data = {moduleId : id};
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/badge/storeBadge`,data).then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);        
      })
    }

    useEffect(()=>{
      if(submitted && score === data.length){
        storeBatch();
      }
    },[submitted])


  return (
    <div>
      <Navbar/>
      <button onClick={()=>navigate(-1)} className='btn btn-primary'>Go Back to Modules</button>
    <div className='quiz-builder-container'>
      {submitted ? (
        <div className="quiz-score-container">
        <div className="quiz-score">
          <h2 className="score-heading">Your Score</h2>
          <h3 className="score-details">{score} out of {data.length}</h3>
          {score === data.length && 
          <>
           <div className="horizontal-rotating-batch">  <h1>👑🏆</h1> </div>
           <p ><b>🎖️Congrats!!! You Earned a Batch🏅</b></p>
           </>
          }

          <p className={`feedback ${percentage >= 70 ? 'positive' : 'negative'}`}>
            {percentage >= 70 ? "Great job! Keep it up!" : "Don’t worry, try again!"}
            <br />
            <button onClick={()=>navigate(-1)} className='btn btn-primary'>Go Back to Modules</button>
          </p>
        </div>
      </div>
      ) : (
        <>
      <h2 id='quiz-heading'>Create Quiz</h2>
      <div className="quiz-added-questions">
        <h3>Added Questions</h3>
        {data === null && <div>No questions added</div>}
        {data!==null && data.map((question) => (
           <div className="quiz-question-card" key={question._id}>
              <div>Question: <strong>{question.question}</strong></div>
              <div><strong>Options:</strong></div>
              {question.options.map((option, idx) => (
                <>
                  <input type="radio" name={`${question._id}`} id="" value={option}
                  onChange={() => Storeanswers(question._id, option)}
                  />
                    <label key={idx} name={`${question._id}`} className="quiz-option">{option}</label>
                    <br></br>
                </>
              ))}
         </div>
        ))}
        {data!==null && <button className='btn btn-primary' onClick={postanswers}>Submit Quiz</button>}
        </div>
        </>
  )}
    </div>
    </div>
  );
};

export default AttemptQuiz;

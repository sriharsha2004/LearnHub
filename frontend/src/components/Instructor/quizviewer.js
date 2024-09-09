import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import SetAuthToken from "../SetAuthToken";
import Navbar from "./navbar";
import "../stylesheets/Instructor/quiz.css"

const QuizViewer = () => {

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


  return (
    <div>
      <Navbar/>
        <button onClick={() => navigate(`/addquiz/${id}`) } className = "btn btn-primary">Go back to questions</button>
    <div className='quiz-builder-container'>
      <h2 id='quiz-heading'>Create Quiz</h2>
      <div className="quiz-added-questions">
        <h3>Added Questions</h3>
        {data === null && <div>No questions added</div>}
        {data!==null && data.map((question) => (
           <div className="quiz-question-card" key={question._id}>
              <div>Question: <strong>{question.question}</strong></div>
              <div><strong>Options:</strong></div>
              {question.options.map((option, idx) => (
                <div key={idx} className="quiz-option">{option}</div>
              ))}
              <div>Correct Answer: {question.correctAnswer}</div>
         </div>
        ))}
        </div>
    </div>
    </div>
  );
};

export default QuizViewer;

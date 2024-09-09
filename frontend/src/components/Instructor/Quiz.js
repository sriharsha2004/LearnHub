import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import SetAuthToken from "../SetAuthToken";
import Navbar from "./navbar";
import "../stylesheets/Instructor/quiz.css"

const QuizBuilder = () => {
  const [questions, setQuestions] = useState([
    { question: '', options: [], correctAnswer: '' },
  ]);
  const [checked,setchecked] = useState(true);

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
  }, [questions]);

  const updatequestions = () => {
    // console.log(questions);
    const data = {moduleId : id , questions : questions}
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/quiz/add`,data)
    .then(res => {
        setQuestions([
          { question: '', options: [], correctAnswer: '' },
        ])
        setchecked(true);
    })
    .catch(err => {
        console.log("Error occured");
        
    })
  }

  // Handler to update the question text
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  // Handler to add a new option to a question
  const handleAddOption = (index, optionValue) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push(optionValue);
    setQuestions(newQuestions);
  };

  // Handler to select the correct answer for a question
  const handleCorrectAnswerChange = (qIndex, optionValue) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = optionValue;
    setQuestions(newQuestions);
  };

  // Handler to add a new question
  const handleAddQuestion = () => {
    if(questions[0].correctAnswer === "") {
      setchecked(false);
      return;
    }
    setQuestions([...questions, { question: '', options: [], correctAnswer: '' }]);
    updatequestions();
  };

  // Handler to remove a question
  const handleRemoveQuestion = (question) => {
    const data = {moduleId : id , questionId : question._id}
    let a = window.confirm(`Do you want to delete the question: "${question.question}"?`);
    if(a){
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/quiz/removequestion` , {data : data} ).then((d) => {
        setQuestions([
          { question: '', options: [], correctAnswer: '' },
        ])
      })
      .catch((err)=>{
        console.log("Error Occured");      
      })
    };
  }

  return (
    <div>
      <Navbar/>
      <button onClick={() => navigate(`/viewquiz/${id}`) } className = "btn btn-primary">Preview Questions</button>
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
              <button onClick={() => { handleRemoveQuestion(question) }}>Delete Question</button>
         </div>
        ))}
        </div>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-block">
          <div className="question-input">
            <label>Enter Question Here : </label>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Enter your question"
            />
          </div>

          <div className="options-block">
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="option-item">
                <input
                  type="radio"
                  name={`correctAnswer${qIndex}`}
                  value={option}
                  onChange={() => handleCorrectAnswerChange(qIndex, option)}
                />
                <label>{option}</label>
              </div>
            ))}
            <div className="add-option-block">
              <input
                type="text"
                placeholder="Enter option"
                onChange={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddOption(qIndex, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousSibling;
                  if (input.value.trim()) {
                    handleAddOption(qIndex, input.value);
                    input.value = '';
                  }
                }}
              >
                Add Option
              </button>
            </div>
            {!checked && <div className="error-message">Select any one option</div>}
          </div>
        </div>
      ))}
      <button className="add-question-button" onClick={handleAddQuestion}>Add Question</button>
    </div>
    </div>
  );
};

export default QuizBuilder;

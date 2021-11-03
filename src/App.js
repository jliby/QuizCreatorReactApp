import React, { Component } from "react";
import "./App.css";

// conditional
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerScore: 0,
      questions: [
        {
          question: "What is most used programming language?",
          possibleAnswers: ["Python", "Java"],
          rightAnswer: "Python",
          playerChoice: null
        },
        {
          question: "How many lines of code is Google?",
          possibleAnswers: ["5 Thousand", "2 Billion"],
          rightAnswer: "2 Billion",
          playerChoice: null
        }
      ]
    };
  }

  displayQuestion(index) {
    if (this.state.playerScore < index) {
      return;
    }
    const question = this.state.questions[index];
    return (
      <div className="question-display">
        <p className="question">{question.question}</p>
        <br />
        <button
          className="question-choice"
          onClick={() =>
            this.answerQuestion(index, question.possibleAnswers[0])
          }
        >
          {question.possibleAnswers[0]}
        </button>
        <button
          className="question-choice"
          onClick={() =>
            this.answerQuestion(index, question.possibleAnswers[1])
          }
        >
          {question.possibleAnswers[1]}
        </button>
        <br />
        {this.displayResult(index)}
      </div>
    );
  }

  updatePlayerScore() {
    const playerScore = this.state.questions.filter(
      (q) => q.rightAnswer === q.playerChoice
    ).length;
    this.setState({ playerScore });
    console.log("Playr Scores:", playerScore);
  }

  displayResult(index) {
    const question = this.state.questions[index];
    //protection
    if (!question.playerChoice) {
      return;
    }

    if (question.playerChoice === question.rightAnswer) {
      return <p className="result-correct">correct answer</p>;
    } else {
      return <p className="result-incorrect">incorrect answer</p>;
    }
  }

  answerQuestion(index, choice) {
    const answeredQuestion = this.state.questions[index];
    answeredQuestion.playerChoice = choice;
    const allQuestions = this.state.questions;
    allQuestions[index] = answeredQuestion;
    this.setState(
      {
        questions: allQuestions
      },
      () => {
        this.updatePlayerScore();
      }
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Quiz Game</h1>

        <hr />
        {this.displayQuestion(0)}
        {this.displayQuestion(1)}
      </div>
    );
  }
}

export default App;

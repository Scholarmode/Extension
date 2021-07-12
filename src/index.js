import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Block from './components/Block'
import ScholarModeButton from './components/ScholarModeButton';
import Question from './components/Question';




const insertionPoint = document.createElement("div");
insertionPoint.id = "insertion-point";

//check for pc searchbar and append scholarmode
if (document.querySelector('#center')) {
  document.querySelector('#center').appendChild(insertionPoint)
}

//check for mobile searchbar and append scholarmode !doesn't work because m.youtube.com 404 error
else if (document.querySelector('.mobile-topbar-header-content non-search-mode cbox')) {
  document.querySelector('.mobile-topbar-header-content non-search-mode cbox').appendChild(insertionPoint)
}

else { console.log("scholarmode not rendered") }



//render ScholarMode
ReactDOM.render(
  <React.StrictMode>
    <ScholarModeButton />
  </React.StrictMode>,
  document.getElementById('insertion-point')
);

//render Q&A section
ReactDOM.render(
  <React.StrictMode>
    <Question />
  </React.StrictMode>,
  document.getElementById('secondary')
);

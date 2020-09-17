import React, { useState, useEffect, useRef } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Header from './components/Header';
import Overlay from './components/Overlay';
import ErrorMsg from './components/ErrorMsg';
import Button from './components/Button';


function App() {

  const [number, setNumber] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [answer, setAnswer] = useState("");
  const [animated, setAnimated] = useState(false);

  const node = useRef();

  const REQUEST_QUERY = gql`
  query requestQuery($input: Int!) {
    request(input: $input) {
        val3
        val5
      }
    }
  `;

  const [getData, { loading, error, data }] = useLazyQuery(REQUEST_QUERY, { fetchPolicy: "network-only" });


  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClickAnywhere);
    //Animated class
    setTimeout(() => {
      setAnimated(true);
    }, 300);

    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickAnywhere);
    };

  }, []);


  
  useEffect(() => {

    //Check if empty
    if(!number) {
      setErrorMsg("");
      setDisabled(true);
      return;
    }

    //Check if a number
    if(isNaN(number)) {
      setErrorMsg("Value has to be numeric");
      setDisabled(true);
      return;
    }

    // Check if entered value is between 1 and 10 characters long
    if(number.length > 10) {
      setErrorMsg("Value has to be between 1 and 10 characters long");
      setDisabled(true);
      return;
    }

    setDisabled(false);
    setErrorMsg("");

  }, [number]);


  useEffect(()=>{
    if(data && data.request) {
      const {val3, val5 } = data.request;
      const value  = val3 * val5;
      setAnswer(value);
    }
  }, [data]);

  useEffect(()=>{
    if(error) {
      console.log(error);
    }
  }, [error]);

  function handleChange(e) {
    setNumber(e.target.value);
  }

  function handleClick() { 
    getData({ variables: { input: parseInt(number) } });
  }

  function clearResults() {
    setNumber("");
    setAnswer("");
  }

  const handleClickAnywhere = e => {
    if(node.current) {
      if (node.current.contains(e.target)) {
        // inside click
        return;
      } else {
      // outside click 
      clearResults();
      }
    }
  };

  return (
    <div className="App">

      <Header />

      <section className={`container animation${animated ? " done" : ' waiting'}`}>
        <div className="grid">

            <div id="number" className="card card-dark d-flex align-items-center">
              <article className="card-body">
                <h1 className="white-text">Please enter a number</h1>
                  <p>Number must be between 1 and 10 characters long</p>
                  <div className="styled-input">
                    <input 
                      type="text" 
                      name="number" 
                      value={number} 
                      onChange={handleChange} 
                      aria-label="Enter a number" 
                      placeholder="Enter a number"
                    />
                    {errorMsg && <ErrorMsg error={errorMsg}/>}
                  </div>
                  <Button text="Submit" disabled={disabled} loading={loading} clickHandler={handleClick} />  
              </article>
            </div>
        
            <div id="illustration" className="card card-sky d-flex justify-content-center align-items-center">
              <img src="/illustration.png" alt="illustration" className="img-fluid"/>
            </div>

            <div id="photo" className="card"></div> 
         
        </div>

      </section>

      {answer && 
          <Overlay>
            <div className="modal modal-md" ref={node}>
              <h2>Result</h2>
              <p>{data.request.val3} x {data.request.val5} = {answer}</p>
              <button className="button button-circle modal-close" aria-label="Close" onClick={clearResults}>&#10005;</button>         
            </div>       
          </Overlay>}
  
    </div>
  );
}

export default App;

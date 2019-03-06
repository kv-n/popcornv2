import React from 'react';
import './LoadMore.css';

const LoadMore = (props) => {
  return (
    <div className="rmdb-loadmorebtn" onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  )
}

export default LoadMore;
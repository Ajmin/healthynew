import React from "react";

export default function Cards(props) {
  /**
   * Challenge: Fix the code below to use the `props`
   * object values in place of the hardcoded values below
   */
  const [clicked, setClicked] = React.useState(false);
  function handleClick() {
    props.handleProg();
    setClicked(true);
  }
  return (
    <div className="progress-card">
      <img src={props.img} />
      <h3>{props.name}</h3>
      <div className="progressinfo-group">
        <p>{props.phone}</p>
      </div>
      <div className="progressinfo-group">
        <p>{props.email}</p>
      </div>
      <div className="button">
        {!clicked && (
          <button className="Done" onClick={handleClick}>
            Done
          </button>
        )}
      </div>
    </div>
  );
}

/* 
{
    img: "./images/mr-whiskerson.png", 
    name: "Mr. Whiskerson", 
    phone: "(212) 555-1234", 
    email: "mr.whiskaz@catnap.meow"
}

*/

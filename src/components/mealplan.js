import React from "react";
import Suggestive from "./suggestive"

function Meal(){
return (
<div className="mealplans">

<div className="todaycooking" >
<h1> What's cooking today?</h1>
</div>

<div className="weeklymeal">
<Suggestive/>
</div>

</div>
);
}

export default Meal;
import React from "react";
import { Button } from "semantic-ui-react";

function ButtonWrap(props) {
  if (typeof props.loading != "undefined") {
    if (props.loading === true) {
      return (
        <div>
          <Button loading onClick={props.onClick_callback}>
            {props.text}
          </Button>
        </div>
      );
    }
  }

  return (
    <div>
      <Button onClick={props.onClick_callback}>{props.text}</Button>
    </div>
  );
}

export default ButtonWrap;

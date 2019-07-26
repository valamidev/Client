import React from "react";
import { Button } from "semantic-ui-react";

function GenerateButtons(props) {
  let buttons = props.options.map(elem => {
    let is_primary = false;

    if (elem.value === props.selected) {
      is_primary = true;
    }

    return (
      <Button
        key={elem.name}
        onClick={props.select_callback}
        primary={is_primary}
        value={elem.value}
      >
        {elem.name}
      </Button>
    );
  });

  return buttons;
}

function ButtonGroup(props) {
  return (
    <div>
      <GenerateButtons
        select_callback={props.select_callback}
        options={props.options}
        selected={props.selected}
      />
    </div>
  );
}

export default ButtonGroup;

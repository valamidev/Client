import React from "react";
import { Dropdown } from "semantic-ui-react";

function DropdownWrap(props) {
  return (
    <div>
      <Dropdown
        fluid
        search
        selection
        field_name={props.field_name}
        options={props.options}
        onChange={props.change_callback}
        defaultValue={0}
      />
    </div>
  );
}

export default DropdownWrap;

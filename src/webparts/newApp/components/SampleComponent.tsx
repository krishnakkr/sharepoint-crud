import * as React from "react";
import { TextField } from '@fluentui/react/lib/TextField';

function NewComponent() {
    // const [isOpen,setIsOpen]=React.useState(true);
  return (
    <>
      <div>
      <h1>Enter user details</h1>
    </div>
    <div>
    <TextField label="UserName" type="text" />
    <TextField label="Role" type="text" />
    <TextField label="MobileNo" type="text" />
    <TextField label="Place" type="text" />
    </div>
    </>
  
  );
}
export default NewComponent;

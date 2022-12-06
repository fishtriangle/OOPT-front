import React from 'react';

const handleInputChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  handler: React.Dispatch<React.SetStateAction<string>>
) => {
  handler(event.target.value);
};

export default handleInputChange;

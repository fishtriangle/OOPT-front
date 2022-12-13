import React from 'react';

type TextProps = {
  children?: string;
  Wrapper?: string;
};

const Text: React.FC<TextProps> = ({ children }) => {
  if (children) {
    const rawText = children.split('/marker')[0];
    const text = rawText.split('&n').join('\n').split(';').join('\n');
    return <div style={{ whiteSpace: 'pre-line' }}>{text}</div>;
  }
  return <></>;
};

export default Text;

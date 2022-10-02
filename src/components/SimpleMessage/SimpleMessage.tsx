import * as React from 'react';
import styled from 'styled-components';

interface SimpleMessageProps {
  text: string;
  className?: string;
}

const SimpleMessage: React.FunctionComponent<SimpleMessageProps> = ({
  text,
  className,
}: SimpleMessageProps): React.ReactElement => (
  <Message className={className}>
    <Title>{text}</Title>
  </Message>
);

export default SimpleMessage;

// Styled components

const Message = styled('div')`
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0.5;
  width: 100%;
`;

const Title = styled('p')`
  font-size: 18px;
  margin: 20px 0;
`;

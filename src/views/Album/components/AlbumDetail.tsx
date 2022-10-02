import * as React from 'react';
import styled from 'styled-components';

interface PropsFromState {
  fullBio: string;
}

export type IProps = PropsFromState;

class AlbumDetail extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <BioBar>
          <BioTitle>Album Details</BioTitle>
        </BioBar>
        <BioContainer>
          <BioContent
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html: this.props.fullBio,
            }}
          />
        </BioContainer>
      </React.Fragment>
    );
  }
}

export default AlbumDetail;

// Styled components

const BioBar = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 320px) and (max-width: 768px) {
    padding-left: 20px;
  }
`;
const BioTitle = styled('p')`
  font-size: 24px;
  height: 30px;
`;

const BioContent = styled('div')`
  font-size: 16px;
  height: 100%;
  white-space: pre-line;
`;

const BioContainer = styled('div')`
  font-size: 16px;
  padding: 10px;
  white-space: pre-line;
`;

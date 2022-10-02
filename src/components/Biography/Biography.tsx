import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import styled from 'styled-components';

interface PropsFromState {
  briefBio: string;
  fullBio: string;
}

export type IProps = PropsFromState;

type BioOptions = 'brief' | 'full';

interface IState {
  bioToggleOption: BioOptions;
}

class Biography extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      bioToggleOption: 'brief',
    };
  }

  private _handleBio = (
    _event: React.MouseEvent<HTMLElement>,
    newBioOption: BioOptions,
  ): void => {
    if (newBioOption !== null) {
      this.setState({
        bioToggleOption: newBioOption,
      });
    }
  };

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <BioBar>
          <BioTitle>Biography</BioTitle>
          <ToggleButtonGroupStyled
            value={this.state.bioToggleOption}
            exclusive={true}
            onChange={this._handleBio}
            aria-label="text alignment"
            size={'small'}
          >
            <ToggleButton value="brief" aria-label="Brief">
              Brief
            </ToggleButton>
            <ToggleButton value="full" aria-label="Full">
              Full
            </ToggleButton>
          </ToggleButtonGroupStyled>
        </BioBar>
        <BioContainer>
          <BioContent
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html:
                this.state.bioToggleOption === 'brief'
                  ? this.props.briefBio
                  : this.props.fullBio,
            }}
          />
        </BioContainer>
      </React.Fragment>
    );
  }
}

export default Biography;

// Styled components

const BioBar = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  width: 100%;
`;
const BioTitle = styled('p')`
  font-size: 24px;
  height: 30px;
`;
const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  background-color: white;
  height: 30px;
  margin-right: 10px;
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

import { searchTracksAction } from '@Store/tracks/actions';
import { CircularProgress, Grid } from '@material-ui/core';
import { Track } from '@Store/tracks/types';
import { ApplicationState } from '@Store/index';
import { IBrowser } from 'redux-responsive/types';
import { connect } from 'react-redux';
import React from 'react';
import SimpleMessage from '@Components/SimpleMessage/SimpleMessage';
import styled from 'styled-components';
import GridTrackList from './components/GridTrackList';
import TrackSearchBar from './components/TrackSearchBar';

export interface TypedAction<TAction, TPayload> {
  type: TAction;
  payload: TPayload;
}

interface PropsFromState {
  tracks: Track[];
  browser: IBrowser;
  isLoadingAlbums: boolean;
}

interface PropsFromDispatch {
  searchTracksAction: typeof searchTracksAction;
}

type IProps = PropsFromState & PropsFromDispatch;

class TrackSearch extends React.Component<IProps> {
  public render(): React.ReactElement {
    const isLoadingAlbums = this.props.isLoadingAlbums;
    const albumsEmpty = this.props.tracks.length === 0;
    return (
      <Wrapper>
        {isLoadingAlbums && (
          <StyledCircularProgress>
            <CircularProgress color="secondary" />
          </StyledCircularProgress>
        )}
        {!isLoadingAlbums &&
          (!albumsEmpty ? (
            <React.Fragment>
              <StyledGrid>
                <Grid container spacing={3}>
                  <Grid item md={3} xs={12}>
                    <Title>
                      Showing {this.props.tracks.length} tracks out of total
                      tracks
                    </Title>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SearchBarContainer>
                      <TrackSearchBar />
                    </SearchBarContainer>
                  </Grid>
                </Grid>
              </StyledGrid>
              <GridTrackList
                tracks={this.props.tracks}
                browser={this.props.browser}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SearchBarContainer>
                <TrackSearchBar />
              </SearchBarContainer>
              <SimpleMessageStyled text={'No results for the search'} />
            </React.Fragment>
          ))}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  tracks,
  browser,
}: ApplicationState): PropsFromState => ({
  tracks: tracks.searchCache,
  browser,
  isLoadingAlbums: tracks.isSearchLoading,
});

const mapDispatchToProps = {
  searchTracksAction: searchTracksAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);

// Styled components

const SimpleMessageStyled = styled(SimpleMessage)`
  margin-top: 10px;
`;
const Wrapper = styled('div')`
  background: #0a0e11;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 50px;
  width: 100%;
`;
const Title = styled('p')`
  font-size: 14px;
  margin: 20px 0;
  text-align: left;

  @media (min-width: 320px) and (max-width: 768px) {
    text-align: center;
    margin: 0px 0px;
  }
`;

const SearchBarContainer = styled('div')`
  textalign: 'center';
  width: 100%;
`;

const StyleFormControl = styled('div')`
  > div {
    border: 1px solid;
    color: white;
    height: 32px;
    margin-left: -20px;
    width: 100%;

    > div {
      color: white;
      height: 32px;
      min-height: 0px;
    }

    > label {
      top: -12px;
    }
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin: 0px 6px 0px 48px;
  }
`;

const StyledGrid = styled('div')`
  > div {
    align-items: center;
    border-bottom: 1px solid grey;
  }
`;

const StyledCircularProgress = styled('div')`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  > div {
    height: 100px !important;
    width: 100px !important;
  }
`;

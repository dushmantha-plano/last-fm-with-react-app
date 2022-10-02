import { searchAlbumInfoAction, sortAlbumsBy } from '@Store/albums/actions';
import { CircularProgress, Grid } from '@material-ui/core';
import { Album } from '@Store/albums/types';
import { ApplicationState } from '@Store/index';
import { IBrowser } from 'redux-responsive/types';
import { connect } from 'react-redux';
import React from 'react';
import SimpleMessage from '@Components/SimpleMessage/SimpleMessage';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import GridAlbumList from './components/GridAlbumList';
import AlbumSearchBar from './components/AlbumSearchBar';
import SelectMenu from '@Components/Select/SelectMenu';
import { album } from '@Utils/test/models/albums';

export interface TypedAction<TAction, TPayload> {
  type: TAction;
  payload: TPayload;
}
const sortList: { name: string; value: string }[] = [
  {
    value: '0',
    name: 'Select Sort Order',
  },
  {
    value: '1',
    name: 'Name',
  },
  {
    value: '2',
    name: 'Year',
  },
];

interface PropsFromState {
  albums: Album[];
  browser: IBrowser;
  isLoadingAlbums: boolean;
}
interface IState {
  sortBy: string;
}

interface PropsFromDispatch {
  searchAlbumInfoAction: typeof searchAlbumInfoAction;
  sortAlbumsBy: typeof sortAlbumsBy;
}

type IProps = PropsFromState & PropsFromDispatch;

class AlbumSearch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sortBy: '0',
    };
  }

  private _onSelectSort = (value: string): void => {
    this.setState({ sortBy: value });
    this.props.sortAlbumsBy(value, this.props.albums);
  };

  public render(): React.ReactElement {
    const isLoadingAlbums = this.props.isLoadingAlbums;
    const albumsEmpty = this.props.albums.length === 0;
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
                      Showing {this.props.albums.length} albums out of total
                      albums
                    </Title>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SearchBarContainer>
                      <AlbumSearchBar />
                    </SearchBarContainer>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <StyleFormControl>
                      <FormControl variant="outlined">
                        <InputLabel style={{ color: 'white' }}>
                          Sort Albums by
                        </InputLabel>
                        <SelectMenu
                          items={sortList}
                          onChange={this._onSelectSort}
                          value={this.state.sortBy}
                        />
                      </FormControl>
                    </StyleFormControl>
                  </Grid>
                </Grid>
              </StyledGrid>
              <GridAlbumList
                searchAlbumInfoAction={this.props.searchAlbumInfoAction}
                albums={this.props.albums}
                browser={this.props.browser}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SearchBarContainer>
                <AlbumSearchBar />
              </SearchBarContainer>
              <SimpleMessageStyled text={'No results for the search'} />
            </React.Fragment>
          ))}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  albums,
  browser,
}: ApplicationState): PropsFromState => ({
  albums: albums.searchCache,
  browser,
  isLoadingAlbums: albums.isSearchLoading,
});

const mapDispatchToProps = {
  searchAlbumInfoAction: searchAlbumInfoAction,
  sortAlbumsBy: sortAlbumsBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumSearch);

// Styled components

const SimpleMessageStyled = styled(SimpleMessage)`
  margin-top: 10px;
`;
const Wrapper = styled('div')`
  // background: #0a0e11;
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
    @media (min-width: 320px) and (max-width: 768px) {
      width: 95%;
    }

    > div {
      color: white;
      height: 32px;
      min-height: 0px;

      > div {
        color: white;
        height: 32px;
        top: -45px;
        width: 100%;

        > svg {
          color: rgb(255 255 255 / 99%) !important;
        }

        > fieldset {
          border: none;
        }
      }
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

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

import { IEpisode } from "../typescript/interfaces";

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      episode
      air_date
      characters {
        id
        name
        species
        origin {
          id
          name
        }
      }
    }
  }
`;

interface IArgs {
  id?: number;
}

interface IQueryProps {
  episode: IEpisode;
}

interface IRouterParams {
  id: number;
}

interface IProps extends RouteComponentProps<IRouterParams> {}

const Episode = ({ id }: IProps) => {
  const { loading, data } = useQuery<IQueryProps, IArgs>(GET_EPISODE, {
    variables: { id: id },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      {data && (
        <>
          <div className="card mt-4">
            <div className="card-header">Episode {data.episode.episode}</div>
            <div className="card-body">
              <h5 className="card-title">{data.episode.name}</h5>
              <p className="card-text">Aired {data.episode.air_date}</p>
            </div>
          </div>
          <div className="card my-4">
            <div className="card-header">Characters</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Species</th>
                    <th scope="col">Origin</th>
                  </tr>
                </thead>
                <tbody>
                  {data.episode.characters.map((character, key) => (
                    <tr key={key}>
                      <td>
                        <Link to={"/character/" + character.id}>{character.name}</Link>
                      </td>
                      <td>{character.species}</td>
                      <td>
                        {character.origin.name !== "unknown" ? (
                          <Link to={"/location/" + character.origin.id}>
                            {character.origin.name}
                          </Link>
                        ) : (
                          character.origin.name
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Episode;

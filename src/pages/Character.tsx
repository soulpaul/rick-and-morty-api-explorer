import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

import { ICharacter } from "../typescript/interfaces";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      image
      origin {
        id
        name
      }
      location {
        id
        name
      }
      episode {
        id
        episode
        name
        air_date
      }
    }
  }
`;

interface IArgs {
  id?: number;
}

interface IQueryProps {
  character: ICharacter;
}

interface IRouterParams {
  id: number;
}

interface IProps extends RouteComponentProps<IRouterParams> {}

const Character = ({ id }: IProps) => {
  const { loading, data } = useQuery<IQueryProps, IArgs>(GET_CHARACTER, {
    variables: { id: id },
  });

  if (loading) {
    return <Loading />;
  }

  console.log(data);
  return (
    <>
      {data && (
        <>
          <NavBar />
          <div className="card mt-4">
            <div className="card-header">Character</div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <img src={data.character.image} alt={data.character.name} />
                </div>
                <div className="col">
                  <h5 className="card-title">{data.character.name}</h5>
                  <p className="card-text">gender: {data.character.gender}</p>
                  <p className="card-text">species: {data.character.species}</p>
                  {data.character.type && <p className="card-text">type: {data.character.type}</p>}
                  <p className="card-text">status: {data.character.status}</p>
                  <p className="card-text">
                    origin:{" "}
                    {data.character.origin.name !== "unknown" ? (
                      <Link to={"/location/" + data.character.origin.id}>
                        {data.character.origin.name}
                      </Link>
                    ) : (
                      data.character.origin.name
                    )}
                  </p>
                  <p className="card-text">
                    location:{" "}
                    <Link to={"/location/" + data.character.location.id}>
                      {data.character.location.name}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card my-4">
            <div className="card-header">Appears in</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Episode</th>
                    <th scope="col">Title</th>
                    <th scope="col">Air Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.character.episode.map((episode, key) => (
                    <tr key={key}>
                      <td>{episode.episode}</td>
                      <td>
                        <Link to={"/episode/" + episode.id}>{episode.name}</Link>
                      </td>
                      <td>{episode.air_date}</td>
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

export default Character;

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

import { ILocation } from "../typescript/interfaces";

const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        id
        name
        species
        status
      }
    }
  }
`;

interface IArgs {
  id?: number;
}

interface IQueryProps {
  location: ILocation;
}

interface IRouterParams {
  id: number;
}

interface IProps extends RouteComponentProps<IRouterParams> {}

const Location = ({ id }: IProps) => {
  const { loading, data } = useQuery<IQueryProps, IArgs>(GET_LOCATION, {
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
            <div className="card-header">Location</div>
            <div className="card-body">
              <h5 className="card-title">{data.location.name}</h5>
              <p className="card-text">
                Location of type <strong>{data.location.type}</strong> in the{" "}
                <strong>{data.location.dimension}</strong> dimension
              </p>
            </div>
          </div>
          <div className="card my-4">
            <div className="card-header">Residents</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Species</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.location.residents.map((character, key) => (
                    <tr key={key}>
                      <td>
                        <Link to={"/character/" + character.id}>{character.name}</Link>
                      </td>
                      <td>{character.species}</td>
                      <td>{character.status}</td>
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

export default Location;

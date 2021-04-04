import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

import { IInfo, ICharacter } from "../typescript/interfaces";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        species
        origin {
          id
          name
        }
        location {
          id
          name
        }
      }
    }
  }
`;

interface IProps extends RouteComponentProps {}

interface IArgs {
  page: number;
}

interface ICharacterResult {
  results: ICharacter[];
  info: IInfo;
}

interface ICharacters {
  characters: ICharacterResult;
}

const Characters: React.FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, data } = useQuery<ICharacters, IArgs>(GET_CHARACTERS, {
    variables: { page: currentPage },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <h1 className="mt-4">Characters</h1>

      <table className="table my-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
            <th scope="col">Origin</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.characters.results.map((character, key) => (
              <tr key={key}>
                <td>{character.name}</td>
                <td>{character.species}</td>
                <td>
                  {character.origin.name !== "unknown" ? (
                    <Link to={"/location/" + character.origin.id}>{character.origin.name}</Link>
                  ) : (
                    character.origin.name
                  )}
                </td>
                <td>
                  <Link to={"/location/" + character.location.id}>{character.location.name}</Link>
                </td>
                <td>
                  <Link
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    to={"/character/" + character.id}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          {data && (
            <div className="col">
              Showing <strong>{data.characters.results.length}</strong> of{" "}
              <strong>{data.characters.info.count}</strong> entries on page{" "}
              <strong>{currentPage}</strong> of <strong>{data.characters.info.pages}</strong>
            </div>
          )}
          <div className="col">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                {currentPage === 1 ? (
                  <li className="page-item disabled">
                    <button className="page-link" tabIndex={-1} aria-disabled="true">
                      Previous
                    </button>
                  </li>
                ) : (
                  <li className="page-item">
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                )}
                {data && currentPage === data.characters.info.pages ? (
                  <li className="page-item disabled">
                    <button className="page-link" tabIndex={-1} aria-disabled="true">
                      Next
                    </button>
                  </li>
                ) : (
                  <li className="page-item">
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Characters;

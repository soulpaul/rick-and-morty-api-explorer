import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

import { IInfo, ILocation } from "../typescript/interfaces";

const GET_LOCATIONS = gql`
  query GetLocations($page: Int!) {
    locations(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

interface IProps extends RouteComponentProps {}

interface IArgs {
  page: number;
}

interface ILocationResult {
  results: ILocation[];
  info: IInfo;
}

interface ILocations {
  locations: ILocationResult;
}

const Locations: React.FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, data } = useQuery<ILocations, IArgs>(GET_LOCATIONS, {
    variables: { page: currentPage },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <h1 className="mt-4">Locations</h1>
      <table className="table my-4">
        <thead>
          <tr>
            <th scope="col">Episode</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Dimension</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.locations.results.map((location, key) => (
              <tr key={key}>
                <td>{location.name}</td>
                <td>{location.type}</td>
                <td>{location.dimension}</td>
                <td>
                  <Link
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    to={"/location/" + location.id}
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
              Showing <strong>{data.locations.results.length}</strong> of{" "}
              <strong>{data.locations.info.count}</strong> entries on page{" "}
              <strong>{currentPage}</strong> of <strong>{data.locations.info.pages}</strong>
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
                {data && currentPage === data.locations.info.pages ? (
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

export default Locations;

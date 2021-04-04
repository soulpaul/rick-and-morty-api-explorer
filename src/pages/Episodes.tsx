import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, RouteComponentProps } from "@reach/router";

import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

import { IInfo, IEpisode } from "../typescript/interfaces";

const GET_EPISODES = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

interface IProps extends RouteComponentProps {}

interface IArgs {
  page: number;
}

interface IEpisodeResult {
  results: IEpisode[];
  info: IInfo;
}

interface IEpisodes {
  episodes: IEpisodeResult;
}

const Episodes: React.FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, data } = useQuery<IEpisodes, IArgs>(GET_EPISODES, {
    variables: { page: currentPage },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <h1 className="mt-4">Episodes</h1>

      <table className="table my-4">
        <thead>
          <tr>
            <th scope="col">Episode</th>
            <th scope="col">Name</th>
            <th scope="col">Air Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.episodes.results.map((episode, key) => (
              <tr key={key}>
                <td>{episode.episode}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
                <td>
                  <Link className="btn btn-outline-primary btn-sm" to={"/episode/" + episode.id}>
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
              Showing <strong>{data.episodes.results.length}</strong> of{" "}
              <strong>{data.episodes.info.count}</strong> entries on page{" "}
              <strong>{currentPage}</strong> of <strong>{data.episodes.info.pages}</strong>
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
                {data && currentPage === data.episodes.info.pages ? (
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

export default Episodes;

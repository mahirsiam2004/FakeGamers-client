import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const GameButtons = () => {
  return (
    <StyledWrapper>
      <div className="main">
        <div className="up">
          <Link to={'/addGames'}  className="btn card1">
            <div className="txt">Add Games</div>
            <svg className="icon" viewBox="0 0 24 24" width="36" height="36">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
          </Link>

          <Link to={'/updateGames'} className="card2">
            <div className="txt">Update Games</div>
            <svg className="icon" viewBox="0 0 24 24" width="36" height="36">
              <path
                fill="currentColor"
                d="M19.36 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.22 11.1 6 12 6c3.05 0 5.5 2.45 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-1.91-4.82-4.42-5.26-.39-.72-.86-1.38-1.4-1.96z"
              />
            </svg>
          </Link>
        </div>

        <div className="down">
          <Link to={'/myGames'} className="card3">
            <div className="txt">My Games</div>
            <svg className="icon" viewBox="0 0 24 24" width="36" height="36">
              <path
                fill="currentColor"
                d="M4 6h16v2H4zm0 6h16v2H4zm0 6h12v2H4z"
              />
            </svg>
          </Link>

          <Link to={'/myDownloads'} className="card4">
            <div className="txt">My Downloads</div>
            <svg className="icon" viewBox="0 0 24 24" width="36" height="36">
              <path
                fill="currentColor"
                d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .main {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 2rem;
  }

  .up,
  .down {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .txt {
    font-size: 1.1rem;
    font-weight: 700;
    margin-top: 1.8em;
  }

  .icon {
    margin-top: 1.2em;
    color: #333;
  }

  .card1,
  .card2,
  .card3,
  .card4 {
    width: 160px;
    height: 160px;
    outline: none;
    border: none;
    background: white;
    color: #000;
    font-weight: bold;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card1 {
    border-radius: 90px 8px 8px 8px;
  }
  .card2 {
    border-radius: 8px 90px 8px 8px;
  }
  .card3 {
    border-radius: 8px 8px 8px 90px;
  }
  .card4 {
    border-radius: 8px 8px 90px 8px;
  }

  .card1:hover {
    background: #00d4ff;
    transform: scale(1.08);
  }
  .card2:hover {
    background: #ff6bcb;
    transform: scale(1.08);
  }
  .card3:hover {
    background: #a855f7;
    transform: scale(1.08);
    color: white;
  }
  .card4:hover {
    background: #22c55e;
    transform: scale(1.08);
    color: white;
  }

  .card1:hover .icon,
  .card2:hover .icon,
  .card3:hover .icon,
  .card4:hover .icon {
    color: white;
  }
`;

export default GameButtons;

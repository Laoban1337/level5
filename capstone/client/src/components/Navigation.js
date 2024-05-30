import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <header>
        <div className="navigation">
          <nav>
            <ul>
              {/* link to components */}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cleaners">Cleaners</Link>
              </li>
              <li>
                <Link to="/chores">Chores</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

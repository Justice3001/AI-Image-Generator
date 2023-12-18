import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../component/nav";
import "./models.css";

const Models = () => {
  return (
    <div className="container mt-5">
      <Navbar />

      {/* Cards */}
      <div className="row mt-4">
        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://placekitten.com/200/300"
              className="card-img-top"
              alt="Card 1"
            />
            <div className="overlay">
              <button className="btn btn-primary">Use Model</button>
              <p>Additional text on hover</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        {/* ... (Repeat the structure for other cards) */}
        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://placekitten.com/200/300"
              className="card-img-top"
              alt="Card 1"
            />
            <div className="overlay">
              <button className="btn btn-primary">Click me</button>
              <p>Additional text on hover</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://placekitten.com/200/300"
              className="card-img-top"
              alt="Card 1"
            />
            <div className="overlay">
              <button className="btn btn-primary">Click me</button>
              <p>Additional text on hover</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://placekitten.com/200/300"
              className="card-img-top"
              alt="Card 1"
            />
            <div className="overlay">
              <button className="btn btn-primary">Click me</button>
              <p>Additional text on hover</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://placekitten.com/200/300"
              className="card-img-top"
              alt="Card 1"
            />
            <div className="overlay">
              <button className="btn btn-primary">Click me</button>
              <p>Additional text on hover</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card">
            <img
              src="https://placekitten.com/200/300"
              className="card-img-top"
              alt="Card 1"
            />
            <div className="overlay">
              <button className="btn btn-primary">Click me</button>
              <p>Additional text on hover</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;

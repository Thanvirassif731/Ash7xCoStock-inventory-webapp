import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="py-6 bg-light">
      <div className="container d-flex flex-column flex-lg-row align-items-center gap-4">
        <div className="flex-grow-1">
          <h1 className="display-5 fw-bold">From Messy Spreadsheets to One Simple Screen</h1>
          <p className="lead text-muted">Manage inventory, generate reports, and run audits — all in one place.</p>
          <div>
            <a href="/signup" className="btn btn-primary btn-lg rounded-pill me-2">Get started</a>
            <a href="#demo" className="btn btn-outline-secondary rounded-pill">View demo</a>
          </div>
        </div>
        <div style={{ width: 420, maxWidth: "100%" }}>
          <img alt="dashboard preview" className="img-fluid rounded shadow" src="/assets/preview.png"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
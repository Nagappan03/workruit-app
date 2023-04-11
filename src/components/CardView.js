import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardView.module.css';

const CardView = ({ job }) => {
  const expiresInDays = (days) => {
    if (!days) {
      return 'Invalid days';
    }

    const currentDate = new Date();
    const expiresDate = new Date(currentDate);
    expiresDate.setDate(currentDate.getDate() + parseInt(days));

    if (isNaN(expiresDate)) {
      return 'Invalid date';
    }

    return `${days} days (${expiresDate.toLocaleDateString()})`;
  };


  return (
    <div className={`card mb-4 ${styles.card_container}`}>
      <img
        src={job?.companyLogo}
        alt="Company Logo"
        className={`card-img-top ${styles.company_logo}`}
      />
      <hr />
      <div className="card-body">
        <h5 className="card-title">{job.jobTitle}</h5>
        <p>Job Function: {job.jobFunction}</p>
        <p>Job Type: {job.jobType}</p>
        <p>Experience: {job.experience}</p>
        <p>Salary: {job.salary}</p>
        <p>
          Job expires in: {expiresInDays(job.jobExpiresIn)}
        </p>
        <p>Skills: {job.skills}</p>
        <p>Location: {job.location}</p>
        <Link to={`/edit-job/${job.id}`} className="btn btn-primary">
          Edit Job
        </Link>
      </div>
    </div>
  );
};

export default CardView;
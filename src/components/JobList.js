import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import CardView from './CardView';
import { Header } from './Header';
import { Helmet } from 'react-helmet-async';
import styles from './CardView.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('jobDetails')
      .onSnapshot((snapshot) =>
        setJobs(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
        <Header />
        <Helmet>
            <title>Job Listings - Workruit Job Posting</title>
            <meta name="description" content="Explore the latest job listings on Workruit Job Posting platform"/>
        </Helmet>
            <div className="job-list d-flex flex-wrap justify-content-around">
                {jobs.length > 0 ? (jobs.map((job) => <CardView key={job.id} job={{ ...job.data, id: job.id }} />)) : (
                    <div className={`${styles.no_jobs_message} text-center mt-5`}>
                        <h3>No Jobs available at the moment.</h3>
                        <p>Please click on Create Job to create new jobs which will be listed here.</p>
                    </div>
                )}
            </div>
    </>
  );
};

export default JobList;
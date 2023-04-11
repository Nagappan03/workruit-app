import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import CardView from './CardView';
import { Footer } from './Footer';
import { Header } from './Header';
import { Helmet } from 'react-helmet-async';

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
                {jobs.map((job) => (
                    <CardView key={job.id} job={{ ...job.data, id: job.id }} />
                ))}
            </div>
        <Footer />
    </>
  );
};

export default JobList;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { db } from '../firebase';
import CreateJobForm from './CreateJobForm';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const jobDoc = await db.collection('jobDetails').doc(id).get();
      setJobData({ id: jobDoc.id, ...jobDoc.data() });
    };

    fetchJob();
  }, [id]);

  const onSubmitSuccess = () => {
    navigate('/');
  };

  return (
    <div>
      {jobData && <CreateJobForm initialValues={{ ...jobData, id }} onSubmitSuccess={onSubmitSuccess} />}
    </div>
  );
};

export default EditJob;
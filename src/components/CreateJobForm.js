import React from 'react';
import { useForm } from 'react-hook-form';
import { db, storage } from '../firebase';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function CreateJobForm({initialValues = {}, onSubmitSuccess}) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ defaultValues: initialValues });
  
  useEffect(() => {
    for (const [key, value] of Object.entries(initialValues)) {
      setValue(key, value);
    }
  }, [initialValues, setValue]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState('');
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
        const { companyLogo, ...restData } = data;
        const file = companyLogo[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`companyLogos/${file.name}`);
        await fileRef.put(file);
        const fileURL = await fileRef.getDownloadURL();

        const newData = { ...restData, companyLogo: fileURL, recaptcha: recaptchaResponse };

        if (initialValues.id) {
            await db.collection('jobDetails').doc(initialValues.id).update(newData);
            console.log('Job details updated successfully');
        } else {
            await db.collection('jobDetails').add(newData);
            console.log('Job details added successfully');
        }

        reset();
        setRecaptchaResponse('');
        onSubmitSuccess && onSubmitSuccess();
        navigate('/');
    } catch (error) {
        console.error('Error adding/updating job details: ', error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
        <Header />
        <Helmet>
            <title>Create Job - Workruit Job Posting</title>
            <meta name="description" content="Create a new job listing on Workruit Job Posting platform"/>
        </Helmet>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="mb-3">
                            <label htmlFor="jobTitle" className="form-label">Job Title</label>
                            <input id="jobTitle" className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`} {...register('jobTitle', { required: true })} />
                            {errors.jobTitle && <div className="invalid-feedback">This field is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="jobFunction" className="form-label">Job Function</label>
                            <input id="jobFunction" className={`form-control ${errors.jobFunction ? 'is-invalid' : ''}`} {...register('jobFunction', { required: true })} />
                            {errors.jobFunction && <div className="invalid-feedback">This field is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="jobType" className="form-label">Job Type</label>
                            <select id="jobType" className={`form-control ${errors.jobType ? 'is-invalid' : ''}`} {...register('jobType', { required: true })} >
                                <option value="">Select...</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                            </select>
                            {errors.jobType && <div className="invalid-feedback">Please select a job type</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="experience" className="form-label">Experience</label>
                            <input id="experience" type="number" className={`form-control ${errors.experience ? 'is-invalid' : ''}`} {...register('experience', { required: true, min: 0 })} />
                            {errors.experience && <div className="invalid-feedback">Please enter a valid experience</div>}
                        </div>
                        <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input id="salary" type="number" className={`form-control ${errors.salary ? 'is-invalid' : ''}`} {...register('salary', { required: true, min: 0 })} />
                        {errors.salary && <div className="invalid-feedback">Please enter a valid salary</div>}
                        </div>  
                        <div className="mb-3">
                            <label htmlFor="jobExpiresIn" className="form-label">Job Expires In (days)</label>
                            <input id="jobExpiresIn" type="number" className={`form-control ${errors.jobExpiresIn ? 'is-invalid' : ''}`} {...register('jobExpiresIn', { required: true, min: 1 })} />
                            {errors.jobExpiresIn && <div className="invalid-feedback">Please enter a valid number of days</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="skills" className="form-label">Skills</label>
                            <input id="skills" className={`form-control ${errors.skills ? 'is-invalid' : ''}`} {...register('skills', { required: true })} />
                            {errors.skills && <div className="invalid-feedback">This field is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companyLogo" className="form-label">Company Logo</label>
                            <input id="companyLogo" type="file" accept=".jpeg,.jpg,.png" className={`form-control ${errors.companyLogo ? 'is-invalid' : ''}`} {...register('companyLogo', { required: true })} />
                            {errors.companyLogo && <div className="invalid-feedback">Please upload a company logo</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input id="location" className={`form-control ${errors.location ? 'is-invalid' : ''}`} {...register('location', { required: true })} />
                            {errors.location && <div className="invalid-feedback">This field is required</div>}
                        </div>
                        <div className="mb-3">
                            <ReCAPTCHA sitekey="6LeXmXYlAAAAAPtEfNnusjjQo1TCsnVOaK6K6NoE" onChange={(response) => setRecaptchaResponse(response)}/>
                            {!recaptchaResponse && errors.recaptcha && (<div className="invalid-feedback">Please complete the captcha</div>)}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : ('Submit')}
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <Footer />
    </React.Fragment>
  )
}

export default CreateJobForm;
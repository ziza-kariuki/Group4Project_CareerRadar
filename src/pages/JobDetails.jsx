import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { useJobs } from "../hooks/UseJobs";
import { formatSalaryRange } from "../services/JobApi";

function JobDetails() {
    const { jobId } = useParams();
    const { jobs, loading, error, refetch } = useJobs();
    const job = jobs.find((item) => String(item.id) === jobId);

    return (
        <>
            <Navbar />

            <main>
                {error ? (
                    <section className="job-detail-state"><ErrorMessage message={error} onRetry={refetch} /></section>
                ) : loading ? (
                    <section className="job-header job-detail-loading" aria-live="polite">Loading job details…</section>
                ) : job ? (
                    <>
                        <section className="job-header">
                            <h1>{job.title}</h1>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                        </section>

                        <section className="job-information">
                            <div><strong>Employment Type</strong><p>{job.jobTypes.join(", ") || "Not specified"}</p></div>
                            <div><strong>Experience Level</strong><p>{job.level || "Not specified"}</p></div>
                            <div><strong>Salary</strong><p>{formatSalaryRange(job)}</p></div>
                        </section>

                        <section className="job-description">
                            <h2>Job Description</h2>
                            <p>{job.excerpt || "See the original listing for the full description."}</p>
                        </section>

                        <section className="job-requirements">
                            <h2>About this opportunity</h2>
                            <p>Review the full role details and requirements on the employer’s listing.</p>
                        </section>

                        <section className="job-application">
                            <a href={job.url} target="_blank" rel="noreferrer">Apply for this Job <span aria-hidden="true">↗</span></a>
                        </section>
                    </>
                ) : (
                    <section className="job-detail-state"><EmptyState title="Job not found" message="This role may have closed or is no longer available." /></section>
                )}
            </main>

            <Footer />
        </>
    );
}

export default JobDetails;
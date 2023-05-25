import './style.css';

import { Process } from "../../entities/process";
import JobForm from "./JobForm";
import JobHeader from "./JobHeader";

interface JobFormsProp {
    process: Process,
    setCurrentPage: any,
}

function JobForms({ process, setCurrentPage }: JobFormsProp) {
    return (
        <div className="job__screen">
            <JobHeader process={process} setCurrentPage={setCurrentPage} jobScreenStep={1}></JobHeader>
            <JobForm process={process!} setCurrentPage={setCurrentPage}></JobForm>
        </div>
    );
}

export default JobForms;
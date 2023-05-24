import './style.css';

import { Process } from "../../entities/process";
import JobForm from "./JobForm";
import JobHeader from "./JobHeader";

interface JobFormsProp {
    process: Process | null
}

function JobForms({ process }: JobFormsProp) {
    return (
        <div className="job__screen">
            <JobHeader process={process}></JobHeader>
            <JobForm></JobForm>
        </div>
    );
}

export default JobForms;
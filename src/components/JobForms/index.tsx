import './style.css';

import { Process } from "../../entities/process";
import JobForm from "./JobForm";
import JobHeader from "./JobHeader";

interface JobFormsProp {
    process: Process,
    addJobScreen: any,
}

function JobForms({ process, addJobScreen }: JobFormsProp) {
    return (
        <div className="job__screen">
            <JobHeader process={process} addJobScreen={addJobScreen} jobScreenStep={1}></JobHeader>
            <JobForm process={process!} addJobScreen={addJobScreen}></JobForm>
        </div>
    );
}

export default JobForms;
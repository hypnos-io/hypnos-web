import { Process } from "../../entities/process";
import JobForm from "./JobForm";
import JobHeader from "./JobHeader";

interface JobFormsProp {
    process: Process | null
}


function JobForms({ process }: JobFormsProp) {
    return (
        <>
            <JobHeader process={process}></JobHeader>
            <JobForm></JobForm>
        </>
    );
}

export default JobForms;
import { Process } from "../../../entities/process";

interface JobHeaderProps {
    process: Process | null
}

function JobHeader({ process }: JobHeaderProps) {
    return (
        <header>{process?.name}</header>
    );
}

export default JobHeader;
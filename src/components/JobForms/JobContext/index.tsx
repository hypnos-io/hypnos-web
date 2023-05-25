import React, {createContext, useContext} from 'react';
import { Job } from '../../../entities/job';

interface JobContextType {
    newJob: Job | null;
    setNewJob: (job: Job | null) => void;
  }
  
  const JobContext = createContext<JobContextType>({
    newJob: null,
    setNewJob: () => {},
  });
  
  const JobProvider: React.FC = ({ children }: any) => {
    const [newJob, setNewJob] = React.useState<Job | null>(null);
  
    return (
      <JobContext.Provider value={{ newJob, setNewJob }}>
        {children}
      </JobContext.Provider>
    );
  };
  
  const useJobContext = (): JobContextType => useContext(JobContext);
  
  export { JobProvider, useJobContext };
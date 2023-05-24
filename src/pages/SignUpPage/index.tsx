import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import GrayRectBackground from '../../components/GrayRectBackground'
import awesomeUsersDark from '../../components/assets/img/Icon awesome-users-black@2x.png'
import SignUpWindow from '../../components/SignUpWindow'
import { FetchAllEmployees } from '../../use_cases/employees/FetchAll'
import { FetchAllLeaders } from '../../use_cases/leaders/FetchAll'
import { EmployeeService } from '../../services/employee_service';
import './style.css'
import { LeaderService } from '../../services/leader_service'
import { SupervisorService } from '../../services/supervisor_service'
import { FetchAllSupervisors } from '../../use_cases/supervisors/FetchAll'


const SignUpPage: React.FC = () => {
  const [blurBackground, setBlurBackground] = useState(false);
  const [foundOperators, setFoundOperators] = useState<(string | undefined)[][]>([]);
  const [allOperators, setAllOperators] = useState(foundOperators);

  useEffect(() => {
    async function getUsers() {
      const employers = await new FetchAllEmployees(new EmployeeService()).execute();
      const leaders = await new FetchAllLeaders(new LeaderService()).execute();
      const supervisors = await new FetchAllSupervisors(new SupervisorService()).execute();
  
      const employersList = employers.map(obj => {
        let roleString = '';
        switch (obj.role) {
          case 0:
            roleString = 'Operário';
            break;
            case 1:
              roleString = 'Gerente';
              break;
            case 2:
              roleString = 'Líder';
              break;
          default:
            roleString = 'Operário';
        }
        return [obj.name, obj.imageURL, obj.registration, roleString, obj._id];
      });
  
      const leadersList = leaders.map(obj => {
        let roleString = '';
        switch (obj.role) {
          case 0:
            roleString = 'Operário';
            break;
            case 1:
              roleString = 'Gerente';
              break;
            case 2:
              roleString = 'Líder';
              break;
          default:
            roleString = 'Operário';
        }
        return [obj.name, obj.imageURL, obj.registration, roleString, obj._id];
      });
  
      const supervisorsList = supervisors.map(obj => {
        let roleString = '';
        switch (obj.role) {
          case 0:
            roleString = 'Operário';
            break;
            case 1:
              roleString = 'Gerente';
              break;
            case 2:
              roleString = 'Líder';
              break;
          default:
            roleString = 'Operário';
        }
        return [obj.name, obj.imageURL, obj.registration, roleString, obj._id];
      });
  
      // Merge the three lists into a single list
      const mergedList = employersList.concat(leadersList, supervisorsList);
  
      setFoundOperators(mergedList);
      setAllOperators(mergedList);
    }
  
    getUsers();
  }, []);
  

  return (
    <div className="signUpPage">
      <Sidebar></Sidebar>
      <div className={`page-content ${blurBackground ? "blur" : ""}`}>
        {blurBackground && <div className='shadow'></div>}
        <div className='icon-and-title'>
        <img className="awesome-users-icon" src={awesomeUsersDark} alt="Awesome Users Icon"></img>
        <h1 className="upper-title">Cadastros</h1>
        </div>
        <div className='rect-background'>
        <GrayRectBackground></GrayRectBackground>
        </div>
      </div>
      
    </div>
  );
};

export default SignUpPage;




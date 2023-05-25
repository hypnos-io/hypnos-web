import React, { useEffect, useState } from 'react'
import { GrRefresh } from 'react-icons/gr'
import './style.css'
import HeaderRectangle from '../HeaderRectangle';
import SearchBar from '../SearchBar';
import AddUserButton from '../AddUserButton';
import VerticalList from '../VerticalList';
import { FetchAllEmployees } from '../../use_cases/employees/FetchAll'
import { FetchAllLeaders } from '../../use_cases/leaders/FetchAll'
import { EmployeeService } from '../../services/employee_service';
import './style.css'
import { LeaderService } from '../../services/leader_service'
import { SupervisorService } from '../../services/supervisor_service'
import { FetchAllSupervisors } from '../../use_cases/supervisors/FetchAll'
import SignUpWindow from '../SignUpWindow';

function GrayRectBackground() {
    const [showWindow, setShowWindow] = useState(false);
    const [foundOperators, setFoundOperators] = useState<(string | undefined)[][]>([]);
    const [allOperators, setAllOperators] = useState(foundOperators);

    const handleRefreshClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        window.location.reload();
    }

    const handleWindowClose = () => {
      setShowWindow(false);
    };

    const handleFilter = (searchTerm: string) => {
        if (searchTerm === '') {
          setFoundOperators(allOperators);
          return;
        }
    
        const filteredOperators = allOperators.filter((operator) =>
          operator[0]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFoundOperators(filteredOperators);
      };

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
        <div>
         <div className='backRectangle'>
           <div className='buttons-and-searchBar'>
            <div className="search-bar-area">
            <SearchBar onSearch={handleFilter}></SearchBar>
            </div>
    
            <div className="refresh-icon-and-button">
            <div>
            <GrRefresh className='refresh-icon' onClick={handleRefreshClick}></GrRefresh>
            </div>
            <div className="button-to-add">
            <AddUserButton text="Adicionar Usuário" onClick={() => setShowWindow(true)}></AddUserButton>
            </div>
            </div>
            </div>
            <div className="list-and-header">
                <HeaderRectangle hideCenterTitles={showWindow}></HeaderRectangle>
                <VerticalList links={foundOperators}></VerticalList>
            </div>
         </div>
         <div className="signup-window-area">
            {showWindow && <SignUpWindow onWindowClose={handleWindowClose} />}
            </div>
       </div>
       
       
    )
}

export default GrayRectBackground;
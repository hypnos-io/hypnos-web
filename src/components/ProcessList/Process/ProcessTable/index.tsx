import './style.css';

import arrowsUpDownIcon from '../../../assets/img/ProcessList/Grupo 183@2x.png';
import blackPencilIcon from '../../../assets/img/ProcessList/Icon open-pencil@2x.png';
import deleteIcon from '../../../assets/img/ProcessList/Icon material-delete@2x.png';


function ProcessTable() {
    function showProcess() {
        const process = [];

        for (let i = 0; i < 4; i++) {
            process.push(
                <tr className="table__row">
                    <td><img src={arrowsUpDownIcon}/></td>
                    <td>Tarefa 1</td>
                    <td>1</td>
                    <td>4h</td>
                    <td>8:00</td>
                    <td>12:00</td>
                    <td>20</td>
                    <td><img src={blackPencilIcon}/></td>
                    <td><img src={deleteIcon}/></td>
                </tr>
            );
        }

        return process;
    }

    return (
        <table className="process__table">
            <tr className="table__header">
                <th></th>
                <th>Tarefa</th>
                <th>Setor</th>
                <th>Duração</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Nº de operários</th>
                <th></th>
                <th></th>
            </tr>
            
            {showProcess()}
            
        </table>
    );
}

export default ProcessTable;
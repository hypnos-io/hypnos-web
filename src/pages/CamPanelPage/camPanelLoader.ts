import {LoaderFunctionArgs} from 'react-router-dom'
import {WorkstationService} from '../../services/workstation_service'
import {FecthAllBySector} from '../../use_cases/workstation/FetchAllBySector'

export async function camPanelLoader(args: LoaderFunctionArgs) {
  const fetchAllUC = new FecthAllBySector(new WorkstationService())
  const {sectorId} = args.params
  if (!sectorId) return []
  const allWorkstations = await fetchAllUC.execute(sectorId)
  return allWorkstations
}

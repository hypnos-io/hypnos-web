import {LoaderFunctionArgs} from 'react-router-dom'
import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'
import {FecthAllBySector} from '../../use_cases/workstation/FetchAllBySector'

export interface CamPanelLoaderResult {
  sectorId: string
  workstations: Workstation[]
}

export async function camPanelLoader(
  args: LoaderFunctionArgs
): Promise<CamPanelLoaderResult> {
  const fetchAllUC = new FecthAllBySector(new WorkstationService())
  const {sectorId} = args.params
  if (!sectorId) throw new Response('Sector not found', {status: 404})
  const allWorkstations = await fetchAllUC.execute(sectorId)
  return {
    sectorId,
    workstations: allWorkstations,
  }
}

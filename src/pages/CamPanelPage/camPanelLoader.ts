import {LoaderFunctionArgs} from 'react-router-dom'
import {Workstation} from '../../entities/workstation'
import {WorkstationService} from '../../services/workstation_service'

import {FecthAllBySector} from '../../use_cases/workstation/FetchAllBySector'
import { ConnectSocket } from '../../use_cases/websocket/Connect'
import { Socket } from 'socket.io-client'


export interface CamPanelLoaderResult {
  sectorId: string
  workstations: Workstation[]
  socket?: Socket
}

export async function camPanelLoader(
  args: LoaderFunctionArgs
): Promise<CamPanelLoaderResult> {
  const fetchAllUC = new FetchAllBySector(new WorkstationService())
  const {sectorId} = args.params
  if (!sectorId) throw new Response('Sector not found', {status: 404})
  const socket = await (new ConnectSocket()).connect()
  const allWorkstations = await fetchAllUC.execute(sectorId)
  return {
    sectorId,
    socket: socket,
    workstations: allWorkstations,
  }
}

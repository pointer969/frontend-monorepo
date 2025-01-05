import { Pool } from '../PoolProvider'
import { PoolListItem } from '@repo/lib/modules/pool/pool.types'
import { useStrategiesMetadata } from './StrategiesMetadataProvider'
import { useMemo } from 'react'

export function useStrategyMetadata(pool: Pool | PoolListItem) {
  const { getPoolMetadata } = useStrategiesMetadata()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const poolMetadata = useMemo(() => getPoolMetadata(pool), [pool])

  return { ...poolMetadata }
}

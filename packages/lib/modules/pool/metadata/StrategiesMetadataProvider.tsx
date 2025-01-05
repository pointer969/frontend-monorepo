'use client'

import { useMandatoryContext } from '@repo/lib/shared/utils/contexts'
import { createContext, PropsWithChildren } from 'react'
import { Pool } from '../PoolProvider'
import { Erc4626Metadata } from './getErc4626Metadata'
import { PoolListItem } from '../pool.types'
import { getChainId } from '@repo/lib/config/app.config'
import { PoolMetadata, PoolsMetadata } from './getPoolsMetadata'
import { StakeStrategyMetadata, StakeStrategiesMetadata } from './getStrategiesMetadata'

export type UseStrategiesMetadataResult = ReturnType<typeof _useStrategiesMetadata>
export const StrategiesMetadataContext = createContext<UseStrategiesMetadataResult | null>(null)

export function _useStrategiesMetadata(
  erc4626Metadata: Erc4626Metadata[] | undefined,
  poolsMetadata: StakeStrategiesMetadata | undefined
) {
  function getErc4626Metadata(pool: Pool | PoolListItem): Erc4626Metadata[] {
    if (!erc4626Metadata) return []

    return erc4626Metadata.filter(_metadata =>
      pool.tags?.map(tag => tag?.toLowerCase()).includes(_metadata.id)
    )
  }

  function getPoolMetadata(pool: Pool | PoolListItem): StakeStrategyMetadata | undefined {
    if (!poolsMetadata) return undefined

    const poolChainId = getChainId(pool.chain)

    return poolsMetadata?.[poolChainId]?.[pool.address]
  }

  return { getErc4626Metadata, getPoolMetadata }
}

export function PoolsMetadataProvider({
  children,
  erc4626Metadata,
  poolsMetadata,
}: PropsWithChildren & {
  erc4626Metadata: Erc4626Metadata[] | undefined
  poolsMetadata: StakeStrategiesMetadata | undefined
}) {
  const hook = _useStrategiesMetadata(erc4626Metadata, poolsMetadata)
  return <StrategiesMetadataContext.Provider value={hook}>{children}</StrategiesMetadataContext.Provider>
}

export const useStrategiesMetadata = (): UseStrategiesMetadataResult =>
  useMandatoryContext(StrategiesMetadataContext, 'PoolsMetadata')

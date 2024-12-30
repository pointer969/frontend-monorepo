import { StakeListProvider } from '@repo/lib/modules/pool/StakeList/StakeListProvider'
import { StakeListLayout } from './StakeListLayout'
import { GqlPoolType } from '@repo/lib/shared/services/api/generated/graphql'
import { PoolListDisplayType } from '../pool.types'

export async function StakeList({
  fixedPoolTypes,
  displayType = PoolListDisplayType.TokenPills,
  hideProtocolVersion = [],
  hidePoolTypes = [],
  hidePoolTags = [],
}: {
  displayType?: PoolListDisplayType
  fixedPoolTypes?: GqlPoolType[]
  hideProtocolVersion?: string[]
  hidePoolTypes?: GqlPoolType[]
  hidePoolTags?: string[]
}) {
  return (
    <StakeListProvider
      displayType={displayType}
      fixedPoolTypes={fixedPoolTypes}
      hidePoolTags={hidePoolTags}
      hidePoolTypes={hidePoolTypes}
      hideProtocolVersion={hideProtocolVersion}
    >
      <StakeListLayout />
    </StakeListProvider>
  )
}

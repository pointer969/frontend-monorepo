'use client'

import { useUserSettings } from '@/lib/modules/user/settings/useUserSettings'
import { emptyAddress } from '@/lib/modules/web3/contracts/wagmi-helpers'
import { useUserAccount } from '@/lib/modules/web3/useUserAccount'
import { Dictionary } from 'lodash'
import { useQuery } from 'wagmi'
import { HumanAmountIn } from '../add-liquidity.types'
import { useAddLiquidity } from '../useAddLiquidity'
import { generateAddLiquidityQueryKey } from './generateAddLiquidityQueryKey'

// Queries the SDK to create a transaction config to be used by wagmi's useManagedSendTransaction
export function useBuildAddLiquidityQuery(
  humanAmountsIn: HumanAmountIn[],
  enabled: boolean,
  poolId: string
) {
  const { address: userAddress } = useUserAccount()

  const { buildAddLiquidityTx } = useAddLiquidity()
  const { slippage } = useUserSettings()
  const allowances = {}

  function queryKey(): string {
    return generateAddLiquidityQueryKey({
      userAddress: userAddress || emptyAddress,
      poolId,
      slippage,
      humanAmountsIn,
    })
  }

  const addLiquidityQuery = useQuery(
    [queryKey()],
    async () => {
      const inputs = {
        humanAmountsIn,
        account: userAddress || emptyAddress,
        slippagePercent: slippage,
      }
      return await buildAddLiquidityTx(inputs)
    },
    {
      enabled: enabled && !!userAddress && allowances && hasTokenAllowance(allowances),
    }
  )

  return addLiquidityQuery
}

function hasTokenAllowance(tokenAllowances: Dictionary<bigint>) {
  // TODO: depending on the user humanAmountsIn this rule will be different
  // Here we will check that the user has enough allowance for the current Join operation
  return Object.values(tokenAllowances).every(a => a > 0n)
}
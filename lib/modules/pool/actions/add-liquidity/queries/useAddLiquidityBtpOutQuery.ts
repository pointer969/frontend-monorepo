'use client'

import { useUserSettings } from '@/lib/modules/user/settings/useUserSettings'
import { emptyAddress } from '@/lib/modules/web3/contracts/wagmi-helpers'
import { useUserAccount } from '@/lib/modules/web3/useUserAccount'
import { integerFormat } from '@/lib/shared/utils/numbers'
import { AddLiquidityQueryOutput, TokenAmount } from '@balancer/sdk'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { formatUnits } from 'viem'
import { useQuery } from 'wagmi'
import { areEmptyAmounts } from '../add-liquidity.helpers'
import { HumanAmountIn } from '../add-liquidity.types'
import { AddLiquidityHandler } from '../handlers/AddLiquidity.handler'
import { generateAddLiquidityQueryKey } from './generateAddLiquidityQueryKey'

const debounceMillis = 300

export function useAddLiquidityBtpOutQuery(
  handler: AddLiquidityHandler,
  humanAmountsIn: HumanAmountIn[],
  poolId: string
) {
  const { address: userAddress } = useUserAccount()
  const { slippage } = useUserSettings()
  const [bptOut, setBptOut] = useState<TokenAmount | null>(null)
  const [lastSdkQueryOutput, setLastSdkQueryOutput] = useState<AddLiquidityQueryOutput | undefined>(
    undefined
  )
  const debouncedHumanAmountsIn = useDebounce(humanAmountsIn, debounceMillis)

  function queryKey(): string {
    return generateAddLiquidityQueryKey({
      userAddress: userAddress || emptyAddress,
      poolId,
      slippage,
      humanAmountsIn: debouncedHumanAmountsIn as unknown as HumanAmountIn[],
    })
  }

  async function queryBptOut() {
    const queryResult = await handler.queryAddLiquidity({ humanAmountsIn })

    const { bptOut } = queryResult

    setBptOut(bptOut)

    // Only SDK handlers will return this output
    if (queryResult.sdkQueryOutput) {
      setLastSdkQueryOutput(queryResult.sdkQueryOutput)
    }
    return bptOut
  }

  const query = useQuery(
    [queryKey()],
    async () => {
      return await queryBptOut()
    },
    {
      enabled: !!userAddress && !areEmptyAmounts(humanAmountsIn),
    }
  )

  const bptOutUnits = bptOut ? integerFormat(formatUnits(bptOut.amount, 18)) : '-'

  return { bptOut, bptOutUnits, isBptOutQueryLoading: query.isLoading, lastSdkQueryOutput }
}
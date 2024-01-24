/* eslint-disable max-len */
import { defaultTestUserAccount } from '@/test/utils/wagmi'
import { poolId } from '@/lib/debug-helpers'
import { HumanAmountIn } from '../../liquidity-types'
import { addLiquidityKeys } from './add-liquidity-keys'

test('Generates expected query keys', () => {
  const humanAmountsIn: HumanAmountIn[] = [
    { tokenAddress: '0x198d7387fa97a73f05b8578cdeff8f2a1f34cd1f', humanAmount: '0' },
    { tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', humanAmount: '0' },
  ]
  const result = addLiquidityKeys.priceImpact({
    userAddress: defaultTestUserAccount,
    poolId,
    slippage: '0.2',
    humanAmountsIn,
  })
  expect(result).toMatchInlineSnapshot(
    `
    [
      "add-liquidity",
      "price-impact",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266:0x68e3266c9c8bbd44ad9dca5afbfe629022aee9fe000200000000000000000512:0.2:[{"tokenAddress":"0x198d7387fa97a73f05b8578cdeff8f2a1f34cd1f","humanAmount":"0"},{"tokenAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","humanAmount":"0"}]",
    ]
  `
  )

  const result2 = addLiquidityKeys.priceImpact({
    userAddress: defaultTestUserAccount,
    poolId,
    slippage: '0.3',
    humanAmountsIn,
  })

  expect(result).not.toEqual(result2)
})
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Cryzar | Stake',
  description: `
    Explore DeFi liquidity stake.
    Provide liquidity to accumulate yield from swap fees
    while retaining your token exposure as prices move.
  `,
}

export default async function Stake({ children }: PropsWithChildren) {
  return <>{children}</>
}

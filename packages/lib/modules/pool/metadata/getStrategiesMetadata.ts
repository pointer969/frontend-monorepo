import { mins } from '@repo/lib/shared/utils/time'

const STAKE_STRATEGIES_METADATA_URL =
  'https://raw.githubusercontent.com/Cryzar-Tech/metadata/refs/heads/main/stakes/strategies/index.json'

export type StakeStrategyMetadata = {
  name?: string
  description?: string
  ignoreERC4626?: boolean
  iconUrl?: string
}

export type StakeStrategiesMetadata = {
  [chainId: string]: {
    [address: string]: StakeStrategyMetadata
  }
}

export async function getStakeStrategiesMetadata(): Promise<StakeStrategiesMetadata | undefined> {
  try {
    const res = await fetch(STAKE_STRATEGIES_METADATA_URL, {
      next: { revalidate: mins(15).toSecs() },
    })

    return (await res.json()) as StakeStrategiesMetadata
  } catch (error) {
    console.error('Unable to fetch pools metadata', error)
    return undefined
  }
}

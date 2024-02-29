import { getNetworkConfig } from '@/lib/config/app.config'
import { SupportedChainId } from '@/lib/config/config.types'
import { balancerV2VaultABI } from '@/lib/modules/web3/contracts/abi/generated'
import { useUserAccount } from '@/lib/modules/web3/useUserAccount'
import { useContractRead } from 'wagmi'
import { useChainSwitch } from '../web3/useChainSwitch'

export function useHasApprovedRelayer(chainId: SupportedChainId) {
  const { isConnected, userAddress } = useUserAccount()
  const { shouldChangeNetwork } = useChainSwitch(chainId)
  const config = getNetworkConfig(chainId)

  const query = useContractRead({
    chainId,
    abi: balancerV2VaultABI,
    address: config.contracts.balancer.vaultV2,
    account: userAddress,
    functionName: 'hasApprovedRelayer',
    args: [userAddress, config.contracts.balancer.relayerV6],
    enabled: isConnected && !shouldChangeNetwork,
  })
  return {
    ...query,
    hasApprovedRelayer: query.data ?? false,
  }
}
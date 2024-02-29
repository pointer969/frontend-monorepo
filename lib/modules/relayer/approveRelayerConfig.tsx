import { TransactionStepButton } from '@/lib/shared/components/btns/transaction-steps/TransactionStepButton'
import { CommonStepProps, OnStepCompleted, StepConfig } from '../pool/actions/useIterateSteps'
import { useConstructApproveRelayerStep } from './useConstructApproveRelayerStep'
import { SupportedChainId } from '@/lib/config/config.types'

export const getApproveRelayerConfig = (chainId: SupportedChainId): StepConfig => ({
  render(useOnStepCompleted: OnStepCompleted) {
    return <ApproveRelayerButton useOnStepCompleted={useOnStepCompleted} chainId={chainId} />
  },
})

function ApproveRelayerButton({
  useOnStepCompleted,
  chainId,
}: CommonStepProps & { chainId: SupportedChainId }) {
  const step = useConstructApproveRelayerStep(chainId)

  useOnStepCompleted(step)

  return <TransactionStepButton step={step} />
}
import TokenRow from '@/lib/modules/tokens/TokenRow/TokenRow'
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Pool } from '../../usePool'
import { useClaiming } from './useClaiming'
import { Address } from 'wagmi'
import { BalTokenReward } from '@/lib/modules/portfolio/useBalRewards'
import { ClaimableReward } from '@/lib/modules/portfolio/useClaimableBalances'

type Props = {
  isOpen: boolean
  onClose(): void
  onOpen(): void
  gaugeAddresses: Address[]
  pool: Pool
}

export function ClaimModal({
  isOpen,
  onClose,
  gaugeAddresses,
  pool,
  ...rest
}: Props & Omit<ModalProps, 'children'>) {
  const { currentStep, useOnStepCompleted, thirdPartyRewards, balRewards } = useClaiming(
    gaugeAddresses,
    pool
  )

  function RewardTokenRow({ reward }: { reward: ClaimableReward | BalTokenReward }) {
    if (reward.formattedBalance === '0') return null
    return (
      <TokenRow
        address={reward.tokenAddress}
        value={reward.formattedBalance}
        chain={reward.pool.chain}
      />
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontWeight="bold" size="h5">
            Claim rewards
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!balRewards.length && !thirdPartyRewards.length && <Text>Nothing to claim</Text>}
          {balRewards.map((reward, idx) => (
            <RewardTokenRow key={idx} reward={reward} />
          ))}
          {thirdPartyRewards.map((reward, idx) => (
            <RewardTokenRow key={idx} reward={reward} />
          ))}
        </ModalBody>
        <ModalFooter>
          <VStack w="full">
            {currentStep.render.length ? (
              currentStep.render(useOnStepCompleted)
            ) : (
              <Button w="full" size="lg" onClick={onClose}>
                Close
              </Button>
            )}
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

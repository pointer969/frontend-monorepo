import TokenRow from '../../tokens/TokenRow/TokenRow'
import ButtonGroup, {
  ButtonGroupOption,
} from '@/lib/shared/components/btns/button-group/ButtonGroup'
import { Box, Button, Card, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { usePool } from '../usePool'
import { Address } from 'viem'

const TABS = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'unstaked',
    label: 'Unstaked',
  },
  {
    id: 'staked',
    label: 'Staked',
  },
  {
    id: 'third-parties',
    label: '3rd parties',
  },
]
export default function PoolMyLiquidity() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const { pool, chain } = usePool()

  function handleTabChanged(option: ButtonGroupOption) {
    setActiveTab(option)
  }

  return (
    <Card variant="gradient" width="full" minHeight="320px">
      <VStack spacing="0" width="full">
        <HStack width="full" p="4" justifyContent="space-between">
          <Heading fontWeight="bold" size="h5">
            My liquidity
          </Heading>
          <ButtonGroup value={activeTab} options={TABS} onChange={handleTabChanged} />
        </HStack>
        <Box width="full" p="4" pt="0">
          <Card borderWidth={1} variant="level5" shadow="none">
            <VStack width="full">
              <Box width="full" borderBottomWidth={1} borderColor="borderColor">
                <HStack py="4" px="4" width="full" justifyContent="space-between">
                  <VStack spacing="1" alignItems="flex-start">
                    <Heading fontWeight="bold" size="h6">
                      My balance
                    </Heading>
                    <Text variant="secondary" fontSize="0.85rem">
                      APR range
                    </Text>
                  </VStack>
                  <VStack spacing="1" alignItems="flex-end">
                    <Heading fontWeight="bold" size="h6">
                      $0.00
                    </Heading>
                    <Text variant="secondary" fontSize="0.85rem">
                      8.69%-12.34%
                    </Text>
                  </VStack>
                </HStack>
              </Box>
              <VStack spacing="4" p="4" py="2" pb="4" width="full">
                {pool.displayTokens.map(token => {
                  return (
                    <TokenRow
                      chain={chain}
                      key={`my-liquidity-token-${token.address}`}
                      address={token.address as Address}
                      // TODO: Fill pool balances
                      value={0}
                    />
                  )
                })}
              </VStack>
            </VStack>
            <HStack p="4" width="full" justifyContent="flex-start">
              <Button variant="primary">Add</Button>
              <Button variant="disabled" isDisabled>
                Remove
              </Button>
              <Button variant="disabled" isDisabled>
                Stake
              </Button>
              <Button variant="disabled" isDisabled>
                Unstake
              </Button>
            </HStack>
          </Card>
        </Box>
      </VStack>
    </Card>
  )
}
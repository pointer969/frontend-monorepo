import { Box, Grid, GridItem, GridProps, HStack, Text, Button, Icon } from '@chakra-ui/react'
import { Plus } from 'react-feather'
import Link from 'next/link'
import { getPoolPath } from '../../pool.utils'
import MainAprTooltip from '@repo/lib/shared/components/tooltips/apr-tooltip/MainAprTooltip'
import { memo } from 'react'
import { NetworkIcon } from '@repo/lib/shared/components/icons/NetworkIcon'
import { useCurrency } from '@repo/lib/shared/hooks/useCurrency'
import { PoolListDisplayType, PoolListItem } from '../../pool.types'
import { StakeListTokenPills } from '../StakeListTokenPills'
import { getUserTotalBalanceUsd } from '../../user-balance.helpers'
import FadeInOnView from '@repo/lib/shared/components/containers/FadeInOnView'
import { useStakeList } from '../StakeListProvider'
import { TokenIcon } from '@repo/lib/modules/tokens/TokenIcon'
import { StakeListTableDetailsCell } from '@repo/lib/modules/pool/StakeList/StakeListTable/StakeListTableDetailsCell'
import { usePoolMetadata } from '../../metadata/usePoolMetadata'
import { useBreakpoints } from '@repo/lib/shared/hooks/useBreakpoints'


interface Props extends GridProps {
  pool: PoolListItem
  keyValue: number
}

const MemoizedMainAprTooltip = memo(MainAprTooltip)

function PoolName({ pool }: { pool: PoolListItem }) {
  const isFirstToken = (index: number) => index === 0
  const zIndices = Array.from({ length: pool.displayTokens.length }, (_, index) => index).reverse()
  
  return (
    <HStack>
      {pool.displayTokens.map((token, i) => (
        <Box key={token.address} ml={isFirstToken(i) ? 0 : -3} zIndex={zIndices[i]}>
          <TokenIcon
            address={token.address}
            alt={token.symbol}
            chain={pool.chain}
            size={20}
            weight={token.weight}
          />
        </Box>
      ))}
      <Text fontWeight="medium" textAlign="left">
        {pool.name}
      </Text>
    </HStack>
  )
}

export function StakeListTableRow({ pool, keyValue, ...rest }: Props) {
  const {
    queryState: { userAddress },
    displayType,
  } = useStakeList()
  const { name } = usePoolMetadata(pool)
  const { isMobile } = useBreakpoints()
  const { toCurrency } = useCurrency()

  return (
    <FadeInOnView>
      <Box
        _hover={{
          bg: 'background.level0',
        }}
        key={keyValue}
        px={{ base: '0', sm: 'md' }}
        rounded="md"
        transition="all 0.2s ease-in-out"
        w="full"
      >
        <Link href={getPoolPath(pool)} prefetch>
          <Grid {...rest} pr="4" py={{ base: 'ms', md: 'md' }}>
            <GridItem>
              <NetworkIcon chain={pool.chain} size={6} />
            </GridItem>
            <GridItem>
              {displayType === PoolListDisplayType.TokenPills && (
                <StakeListTokenPills
                  h={['32px', '36px']}
                  iconSize={name ? 24 : 20}
                  nameSize="sm"
                  p={['xxs', 'sm']}
                  pool={pool}
                  pr={[1.5, 'ms']}
                />
              )}
              {displayType === PoolListDisplayType.Name && <PoolName pool={pool} />}
            </GridItem>
            <GridItem minW="32">
              <StakeListTableDetailsCell pool={pool} />
            </GridItem>
            {userAddress ? (
              <GridItem>
                <Text fontWeight="medium" textAlign="right">
                  {toCurrency(getUserTotalBalanceUsd(pool), { abbreviated: false })}
                </Text>
              </GridItem>
            ) : null}
            <GridItem>
              <Text
                fontWeight="medium"
                textAlign="right"
                title={toCurrency(pool.dynamicData.totalLiquidity, { abbreviated: false })}
              >
                {toCurrency(pool.dynamicData.totalLiquidity)}
              </Text>
            </GridItem>
            {/* <GridItem textAlign="right">
              <Text
                fontWeight="medium"
                textAlign="right"
                title={toCurrency(pool.dynamicData.volume24h, { abbreviated: false })}
              >
                {toCurrency(pool.dynamicData.volume24h)}
              </Text>
            </GridItem> */}
            {/* <GridItem justifySelf="end" pr={{ base: 'md', xl: '0' }}>
              <MemoizedMainAprTooltip
                aprItems={pool.dynamicData.aprItems}
                height="auto"
                pool={pool}
                poolId={pool.id}
                textProps={{ fontWeight: 'medium', textAlign: 'right' }}
              />
            </GridItem> */}
            <GridItem justifySelf="end" pr={{ base: 'md', xl: '0' }}>
              <Button
                // as={Link}
                display="flex"
                gap="2"
                // href={`https://pool-creator.balancer.fi/${isCowPath ? 'cow' : 'v3'}`}
                ml="ms"
                rel=""
                // target="_blank"
                variant="tertiary"
              >
                {/* <Icon as={Plus} boxSize={4} />
                {!isMobile && 'Stake'} */}
                Stake
              </Button>
            </GridItem>
          </Grid>
        </Link>
      </Box>
    </FadeInOnView>
  )
}

'use client'

import { Grid, GridItem, Icon, Text, VStack } from '@chakra-ui/react'
import { GqlPoolOrderBy } from '@repo/lib/shared/services/api/generated/graphql'
import { PoolsColumnSort, orderByHash } from '../../pool.types'
import { useStakeOrderByState } from '../useStakeOrderByState'
import { Globe } from 'react-feather'
import { SortableHeader } from '@repo/lib/shared/components/tables/SortableHeader'
import { useStakeList } from '../StakeListProvider'

const setIsDesc = (id: GqlPoolOrderBy, currentSortingObj: PoolsColumnSort) =>
  currentSortingObj.id === id ? !currentSortingObj.desc : true

export function StakeListTableHeader({ ...rest }) {
  const {
    queryState: { sorting, setSorting },
  } = useStakeList()
  const { orderBy } = useStakeOrderByState()
  const sortingObj = sorting[0]

  const handleSort = (newSortingBy: GqlPoolOrderBy) => {
    setSorting([
      {
        id: newSortingBy,
        desc: setIsDesc(newSortingBy, sortingObj),
      },
    ])
  }

  return (
    <Grid {...rest} borderBottom="1px solid" borderColor="border.base" p={['sm', 'md']} w="full">
      <GridItem>
        <VStack align="start" w="full">
          <Icon as={Globe} boxSize="4" color="font.primary" />
        </VStack>
      </GridItem>
      <GridItem>
        <Text fontWeight="bold">Strategy</Text>
      </GridItem>
      <GridItem justifySelf="start">
        <Text fontWeight="bold" textAlign="left">
          Rewards
        </Text>
      </GridItem>
      <GridItem justifySelf="end" key="TotalLiquidity">
          <SortableHeader
            isSorted={true}
            label="TVL"
            onSort={() => handleSort(GqlPoolOrderBy.TotalLiquidity)}
            sorting={'desc'}
          />
        </GridItem>
      <GridItem justifySelf="start">
        <Text fontWeight="bold" textAlign="left">          
        </Text>
      </GridItem>
      {/* {orderBy.map(orderByItem => (
        <GridItem justifySelf="end" key={orderByItem}>
          <SortableHeader
            isSorted={sortingObj.id === orderByItem}
            label={orderByHash[orderByItem]}
            onSort={() => handleSort(orderByItem)}
            sorting={sortingObj.desc ? 'desc' : 'asc'}
          />
        </GridItem>
      ))} */}
    </Grid>
  )
}

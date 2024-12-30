'use client'

import { PaginatedTable } from '@repo/lib/shared/components/tables/PaginatedTable'
import { StakeListTableHeader } from './StakeListTableHeader'
import { StakeListTableRow } from './StakeListTableRow'
import { getPaginationProps } from '@repo/lib/shared/components/pagination/getPaginationProps'
import { PoolListItem } from '../../pool.types'
import { Card, Skeleton } from '@chakra-ui/react'
import { useIsMounted } from '@repo/lib/shared/hooks/useIsMounted'
import { useStakeList } from '../StakeListProvider'

interface Props {
  pools: PoolListItem[]
  count: number
  loading: boolean
}

export function StakeListTable({ pools, count, loading }: Props) {
  const isMounted = useIsMounted()
  const {
    queryState: { pagination, setPagination, userAddress },
  } = useStakeList()
  const paginationProps = getPaginationProps(count || 0, pagination, setPagination)
  const showPagination = !!pools.length && !!count && count > pagination.pageSize

  const numberColumnWidth = userAddress ? '120px' : '175px'
  const furthestLeftColWidth = '120px'

  const rowProps = {
    px: { base: 'sm', sm: '0' },
    gridTemplateColumns: `32px minmax(320px, 1fr) 180px ${
      userAddress ? furthestLeftColWidth : ''
    } ${userAddress ? numberColumnWidth : furthestLeftColWidth} ${numberColumnWidth} 200px`,
    alignItems: 'center',
    gap: { base: 'xxs', xl: 'lg' },
  }

  if (!isMounted) return <Skeleton height="500px" w="full" />

  return (
    <Card
      alignItems="flex-start"
      left={{ base: '-4px', sm: '0' }}
      p={{ base: '0', sm: '0' }}
      position="relative"
      w={{ base: '100vw', lg: 'full' }}
    >
      <PaginatedTable
        getRowId={item => item.id}
        items={pools}
        loading={loading}
        noItemsFoundLabel="No strategy found"
        paginationProps={paginationProps}
        renderTableHeader={() => <StakeListTableHeader {...rowProps} />}
        renderTableRow={(item: PoolListItem, index) => {
          return <StakeListTableRow keyValue={index} pool={item} {...rowProps} />
        }}
        showPagination={showPagination}
      />
    </Card>
  )
}

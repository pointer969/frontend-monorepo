'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { GqlPoolOrderBy } from '@repo/lib/shared/services/api/generated/graphql'
import { useState, useEffect } from 'react'
import { useStakeList } from './StakeListProvider'

const defaultOrderBy = [GqlPoolOrderBy.TotalLiquidity]

export function useStakeOrderByState() {
  const {
    queryState: { sorting, setSorting, userAddress },
  } = useStakeList()
  const [orderBy, setOrderBy] = useState(defaultOrderBy)

  useEffect(() => {
    if (userAddress) {
      setOrderBy([GqlPoolOrderBy.UserbalanceUsd, ...defaultOrderBy])
      setSorting([{ id: GqlPoolOrderBy.UserbalanceUsd, desc: true }])
    } else {
      setOrderBy(orderBy.filter(item => item !== GqlPoolOrderBy.UserbalanceUsd))
      if (sorting[0]?.id === GqlPoolOrderBy.UserbalanceUsd) {
        setSorting([{ id: GqlPoolOrderBy.TotalLiquidity, desc: true }])
      }
    }
  }, [userAddress])

  return {
    orderBy,
  }
}

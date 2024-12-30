import { PoolList as PoolListType } from '@repo/lib/modules/pool/pool.types'
import { defaultPoolListMock, mockPoolList } from '@repo/lib/test/msw/handlers/PoolList.handlers'
import { aGqlPoolMinimalMock } from '@repo/lib/test/msw/builders/gqlPoolMinimal.builders'
import { testHook } from '@repo/lib/test/utils/custom-renderers'
import { _useStakeList } from './StakeListProvider'

async function renderUseStakesList() {
  const { result, waitForLoadedUseQuery } = testHook(() => _useStakeList())
  await waitForLoadedUseQuery(result)
  return result
}

test('Returns stake strategy list', async () => {
  const result = await renderUseStakesList()

  expect(result.current.pools).toEqual(defaultPoolListMock)
})

test('Returns pool list with a custom mocked GQL pool', async () => {
  const mockedList: PoolListType = [aGqlPoolMinimalMock({ name: 'FOO BAL' })]

  mockPoolList(mockedList)

  const result = await renderUseStakesList()

  expect(result.current.pools[0].name).toEqual('FOO BAL')
})

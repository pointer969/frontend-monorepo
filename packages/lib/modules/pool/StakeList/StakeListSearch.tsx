import { FormControl, Box } from '@chakra-ui/react'
import { useStakeList } from './StakeListProvider'
import { SearchInput } from '@repo/lib/shared/components/inputs/SearchInput'

export function StakeListSearch() {
  const {
    loading,
    queryState: { searchText, setSearch },
  } = useStakeList()

  return (
    <Box w={{ base: 'full', lg: 'sm' }}>
      <form>
        <FormControl w="full">
          <SearchInput
            ariaLabel="search for a strategy"
            isLoading={loading}
            placeholder="Search..."
            search={searchText}
            setSearch={setSearch}
          />
        </FormControl>
      </form>
    </Box>
  )
}

import { StakeList } from '@repo/lib/modules/pool/StakeList/StakeList'
import { DefaultPageContainer } from '@repo/lib/shared/components/containers/DefaultPageContainer'
import FadeInOnView from '@repo/lib/shared/components/containers/FadeInOnView'
import { Box, Skeleton } from '@chakra-ui/react'
import { Suspense } from 'react'
// import { getApolloServerClient } from '@repo/lib/shared/services/api/apollo-server.client'
// import { getProjectConfig } from '@repo/lib/config/getProjectConfig'
// import { GetFeaturedPoolsDocument } from '@repo/lib/shared/services/api/generated/graphql'
// import { FeaturedPools } from '@repo/lib/modules/featured-pools/FeaturedPools'
// import { BoostedPoolsPromoBanner } from '@repo/lib/shared/components/promos/BoostedPoolsPromoBanner'
import { GqlPoolType } from '@repo/lib/shared/services/api/generated/graphql'

export default async function StakePage() {
  // Featured pools set up
  // const { supportedNetworks } = getProjectConfig()

  // const featuredPoolsQuery = await getApolloServerClient().query({
  //   query: GetFeaturedPoolsDocument,
  //   variables: { chains: supportedNetworks },
  //   context: {
  //     fetchOptions: {
  //       next: { revalidate: 300 }, // 5 minutes
  //     },
  //   },
  // })

  // const featuredPools = featuredPoolsQuery.data.featuredPools || []

  return (
    <>
      <Box bg="background.level0" borderBottom="1px solid" borderColor="border.base">
        <DefaultPageContainer pb={['xl', '2xl']} pt={['xl', '20px']}>
          <FadeInOnView animateOnce={false}>
            <Box>
              {/* <BoostedPoolsPromoBanner /> */}
            </Box>
          </FadeInOnView>
        </DefaultPageContainer>
      </Box>
      <DefaultPageContainer noVerticalPadding pb={['xl', '2xl']} pt={['lg', '40px']}>
        <FadeInOnView animateOnce={false}>
          <Suspense fallback={<Skeleton h="500px" w="full" />}>
            <StakeList hidePoolTypes={[GqlPoolType.CowAmm]} />
          </Suspense>
        </FadeInOnView>
      </DefaultPageContainer>
    </>
  )
}

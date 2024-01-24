import { useRouter } from 'next/navigation'
import { getPoolPath } from './pool.utils'
import { Pool } from './usePool'

export function usePoolRedirect(pool: Pool) {
  const router = useRouter()

  /**
   * Redirects user to pool page and respects ctrl/cmd clicks to open in new tab.
   */
  function redirectToPoolPage(event: React.MouseEvent<HTMLElement>) {
    const path = getPoolPath({ id: pool.id, chain: pool.chain })

    if (event.ctrlKey || event.metaKey) {
      window.open(path, '_blank')
    } else {
      router.push(path)
    }
  }

  return { redirectToPoolPage }
}
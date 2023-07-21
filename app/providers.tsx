'use client'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Web3Provider } from '@/lib/modules/web3/Web3Provider'
import { ApolloProvider } from '@/lib/services/api/apollo.provider'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Web3Provider>
        <ApolloProvider>{children}</ApolloProvider>
      </Web3Provider>
    </ThemeProvider>
  )
}
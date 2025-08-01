import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { connectWallet } from '../services/wallet'

export function useConnectWallet() {
  const queryClient = useQueryClient()

  return useMutation<string, Error>({
    mutationFn: connectWallet,
    onSuccess: address => {
      queryClient.setQueryData(['wallet', 'address'], address)
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
    }
  })
}

export function useWalletAddress() {
  return useQuery<string | undefined>({
    enabled: false, // Only set via mutation
    // queryFn: () => undefined,
    queryKey: ['wallet', 'address']
  })
}

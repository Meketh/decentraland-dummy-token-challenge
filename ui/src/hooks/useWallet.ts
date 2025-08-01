import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { connectWallet, getTokenBalance } from '../services/wallet'

export function useConnectWallet() {
  const queryClient = useQueryClient()

  return useMutation<string, Error>({
    mutationFn: connectWallet,
    onSuccess: address => {
      queryClient.setQueryData(['wallet', 'address'], address)
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] })
    }
  })
}

export function useWalletAddress() {
  return useQuery<string | undefined>({
    enabled: false, // Only set via mutation
    queryKey: ['wallet', 'address']
  })
}

export function useTokenBalance() {
  const { data: address } = useWalletAddress()

  return useQuery({
    queryKey: ['wallet', 'balance', address],
    queryFn: () => getTokenBalance(address!),
    enabled: !!address
  })
}

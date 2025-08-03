cd dummy-token

export TOKEN_ADDRESS=$(
  npx hardhat --network localhost run scripts/deploy.js \
| grep -oE "0x[0-9a-fA-F]{40}" \
| tail -1 \
)

echo "VITE_TOKEN_ADDRESS=$TOKEN_ADDRESS" > ../ui/.env
echo "{\"address\":\"$TOKEN_ADDRESS\"}" > ../e2e/token.json

export TEST_ACCOUNT_ADDRESS=$(grep -oE "0x[0-9a-fA-F]{40}" ../e2e/wallet.setup.ts | tail -1)
npx hardhat --network localhost faucet $TOKEN_ADDRESS $TEST_ACCOUNT_ADDRESS

import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "meta-verify: Asset registration and basic operations",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            Tx.contractCall('meta-verify-vault', 'register-asset', 
                [
                    types.ascii('Digital Art Piece'),
                    types.uint(5000),
                    types.uint(1234567),
                    types.ascii('Pristine'),
                    types.some(types.utf8('ipfs://example-metadata'))
                ], 
                wallet1.address
            )
        ]);

        // Basic asset registration test
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});
geth --datadir "~/exercices/Semaine6/noeud1/" --syncmode 'full' --networkid "4224" --port "30303" --rpc --rpcaddr 'localhost' --rpcport "8545" --rpcapi 'personal,db,eth,net,web3,txpool,miner,clique' --mine --nodiscover --gasprice '0' --allow-insecure-unlock --unlock "0x1e48Bd58c7BC1887401B61D85Bd326292B9cDa55" --password ./pwd.txt 
#!/bin/bash
cd /home/kavia/workspace/code-generation/ecosupply-chain-management-platform-20724-50186/supply_chain_sustainability_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


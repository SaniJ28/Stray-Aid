const crypto = require('crypto');
const fs = require('fs');

// File to store the blockchain
const blockchainFile = './blockchain.json';

// Create the genesis block (the first block in the blockchain)
const createGenesisBlock = () => {
  return {
    block_id: 0,
    timestamp: new Date().toISOString(),
    file_hash: 'Genesis Block',
    previous_hash: '0',
    current_hash: '0', // Placeholder, will be calculated
  };
};

// Calculate the hash of a block
const calculateHash = (block) => {
  const blockString = JSON.stringify(block);
  return crypto.createHash('sha256').update(blockString).digest('hex');
};

// Create a new block
const createNewBlock = (fileHash, previousBlock) => {
  const newBlock = {
    block_id: previousBlock.block_id + 1,
    timestamp: new Date().toISOString(),
    file_hash: fileHash,
    previous_hash: previousBlock.current_hash,
    current_hash: '', // Placeholder, will be calculated
  };

  // Calculate the hash of the new block
  newBlock.current_hash = calculateHash(newBlock);
  return newBlock;
};

// Load the blockchain from the JSON file
const loadBlockchain = () => {
  try {
    const data = fs.readFileSync(blockchainFile);
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, initialize with the genesis block
    return {
      chain: [createGenesisBlock()],
      length: 1,
    };
  }
};

// Save the blockchain to the JSON file
const saveBlockchain = (blockchain) => {
  fs.writeFileSync(blockchainFile, JSON.stringify(blockchain, null, 2));
};

// Add a new block to the blockchain
const addBlock = (fileHash) => {
  const blockchain = loadBlockchain();
  const previousBlock = blockchain.chain[blockchain.chain.length - 1];
  const newBlock = createNewBlock(fileHash, previousBlock);

  blockchain.chain.push(newBlock);
  blockchain.length += 1;
  saveBlockchain(blockchain);

  console.log('New block added:', newBlock);
};

// Verify the integrity of the blockchain
const verifyBlockchain = () => {
  const blockchain = loadBlockchain();

  for (let i = 1; i < blockchain.chain.length; i++) {
    const currentBlock = blockchain.chain[i];
    const previousBlock = blockchain.chain[i - 1];

    // Verify the current block's hash
    if (currentBlock.current_hash !== calculateHash(currentBlock)) {
      console.error(`Block ${currentBlock.block_id} is invalid: Hash mismatch`);
      return false;
    }

    // Verify the link to the previous block
    if (currentBlock.previous_hash !== previousBlock.current_hash) {
      console.error(`Block ${currentBlock.block_id} is invalid: Previous hash mismatch`);
      return false;
    }
  }

  console.log('Blockchain is valid');
  return true;
};

// Generate a hash of a JSON file
const generateFileHash = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileData).digest('hex');
};

// Monitor a directory for new JSON files
const chokidar = require('chokidar');

const watcher = chokidar.watch('./json-files', {
  persistent: true,
  ignoreInitial: false,
  awaitWriteFinish: true,
});

watcher
  .on('add', (filePath) => {
    if (filePath.endsWith('.json')) {
      console.log(`New JSON file detected: ${filePath}`);
      handleNewJsonFile(filePath);
    }
  })
  .on('error', (error) => {
    console.error('Error watching files:', error);
  });

// Handle new JSON file
const handleNewJsonFile = (filePath) => {
  try {
    const fileHash = generateFileHash(filePath);
    console.log('Generated File Hash:', fileHash);

    // Add the file hash to the blockchain
    addBlock(fileHash);
  } catch (error) {
    console.error('Error processing file:', error);
  }
};

// Example usage: Verify the blockchain
verifyBlockchain();
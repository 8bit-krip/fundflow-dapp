const CampaignFactoryABI = [
  {
    "type": "function",
    "name": "campaigns",
    "stateMutability": "view",
    "inputs": [
      { "name": "", "type": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "address" }
    ]
  },
  {
    "type": "function",
    "name": "createCampaign",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "goal", "type": "uint256" },
      { "name": "duration", "type": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "address" }
    ]
  },
  {
    "type": "function",
    "name": "getCampaigns",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address[]" }
    ]
  },
  {
    "type": "event",
    "name": "CampaignCreated",
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "campaign", "type": "address" },
      { "indexed": true, "name": "creator", "type": "address" },
      { "indexed": false, "name": "goal", "type": "uint256" },
      { "indexed": false, "name": "deadline", "type": "uint256" }
    ]
  }
];

export default CampaignFactoryABI;

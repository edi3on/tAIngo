// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PetTaming {
    struct TamingAttempt {
        uint256 userId;          // User's identifier
        uint256 targetPetId;     // ID of the pet being tamed
        uint256 successRate;     // Success rate (0-100)
        uint256[] usedNftIds;    // Array of NFT IDs used in taming attempt
        bool isSuccessful;       // Whether the taming was successful
        uint256 timestamp;       // When the attempt was made
    }

    // Mapping from user to their taming attempts
    mapping(uint256 => TamingAttempt[]) public userAttempts;
    
    // Event emitted when a taming attempt is recorded
    event TamingAttemptRecorded(
        uint256 indexed userId,
        uint256 indexed targetPetId,
        uint256 successRate,
        bool isSuccessful,
        uint256 timestamp
    );

    // Record a new taming attempt
    function recordTamingAttempt(
        uint256 _userId,
        uint256 _targetPetId,
        uint256 _successRate,
        uint256[] memory _usedNftIds,
        bool _isSuccessful
    ) public {
        TamingAttempt memory newAttempt = TamingAttempt({
            userId: _userId,
            targetPetId: _targetPetId,
            successRate: _successRate,
            usedNftIds: _usedNftIds,
            isSuccessful: _isSuccessful,
            timestamp: block.timestamp
        });

        userAttempts[_userId].push(newAttempt);

        emit TamingAttemptRecorded(
            _userId,
            _targetPetId,
            _successRate,
            _isSuccessful,
            block.timestamp
        );
    }

    // Get all taming attempts for a user
    function getUserAttempts(uint256 _userId) public view returns (TamingAttempt[] memory) {
        return userAttempts[_userId];
    }

    // Get the latest taming attempt for a user
    function getLatestAttempt(uint256 _userId) public view returns (TamingAttempt memory) {
        require(userAttempts[_userId].length > 0, "No attempts found for this user");
        return userAttempts[_userId][userAttempts[_userId].length - 1];
    }
}
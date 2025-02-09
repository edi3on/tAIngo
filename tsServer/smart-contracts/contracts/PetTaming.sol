// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PetTaming {
    struct TamingAttempt {
        uint256 userId;          
        uint256 targetPetId;     
        uint256 successRate;     
        uint256[] usedNftIds;    // This will be displayed as an array
        bool isSuccessful;       
        uint256 timestamp;       
    }

    // Add this new struct for better readability
    struct ReadableTamingAttempt {
        uint256 userId;
        uint256 targetPetId;
        uint256 successRate;
        uint256[] nftList;  // Explicitly named array
        bool isSuccessful;
        uint256 timestamp;
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

    // Modified to return the readable struct
    function getLatestAttempt(uint256 _userId) public view returns (ReadableTamingAttempt memory) {
        require(userAttempts[_userId].length > 0, "No attempts found for this user");
        TamingAttempt memory latest = userAttempts[_userId][userAttempts[_userId].length - 1];
        
        return ReadableTamingAttempt({
            userId: latest.userId,
            targetPetId: latest.targetPetId,
            successRate: latest.successRate,
            nftList: latest.usedNftIds,  // This will be displayed as a clear array
            isSuccessful: latest.isSuccessful,
            timestamp: latest.timestamp
        });
    }

    function getUserAttempts(uint256 _userId) public view returns (ReadableTamingAttempt[] memory) {
        TamingAttempt[] memory attempts = userAttempts[_userId];
        ReadableTamingAttempt[] memory readableAttempts = new ReadableTamingAttempt[](attempts.length);
        
        for(uint i = 0; i < attempts.length; i++) {
            readableAttempts[i] = ReadableTamingAttempt({
                userId: attempts[i].userId,
                targetPetId: attempts[i].targetPetId,
                successRate: attempts[i].successRate,
                nftList: attempts[i].usedNftIds,
                isSuccessful: attempts[i].isSuccessful,
                timestamp: attempts[i].timestamp
            });
        }
        
        return readableAttempts;
    }
}
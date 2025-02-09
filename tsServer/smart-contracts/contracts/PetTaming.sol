// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PetTaming {
    struct TamingAttempt {
        string user;          // Username or identifier
        string nft;          // NFT identifier
        uint8 tameScale;     // 0-100 representing 0.0-1.0 (multiply by 100 for percentage)
    }

    // Mapping from index to taming attempts
    TamingAttempt[] public attempts;

    // Event emitted when a taming attempt is recorded
    event TamingAttemptRecorded(
        string user,
        string nft,
        uint8 tameScale
    );

    // Record a new taming attempt
    function recordTamingAttempt(
        string memory _user,
        string memory _nft,
        uint8 _tameScale
    ) public {
        require(_tameScale <= 100, "Tame scale must be between 0 and 100");
        
        TamingAttempt memory newAttempt = TamingAttempt({
            user: _user,
            nft: _nft,
            tameScale: _tameScale
        });

        attempts.push(newAttempt);

        emit TamingAttemptRecorded(
            _user,
            _nft,
            _tameScale
        );
    }

    // Get all taming attempts
    function getAllAttempts() public view returns (TamingAttempt[] memory) {
        return attempts;
    }

    // Get the latest attempt
    function getLatestAttempt() public view returns (TamingAttempt memory) {
        require(attempts.length > 0, "No attempts recorded yet");
        return attempts[attempts.length - 1];
    }
}
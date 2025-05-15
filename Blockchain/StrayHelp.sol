// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StrayHelp {
    // Define a struct to represent a report
    struct Report {
        string reportId;
        uint256 timestamp;
        string location;
        string imageUrl;
        string prediction;
        uint256 confidence;
        string classifiedAs;
        string urgencyLevel;
        bool ngoAlertSent;
        uint256 ngoAlertTimestamp;
        string caseStatus;
    }

    // Mapping to store reports by their reportId
    mapping(string => Report) public reports;

    // Event to log when a report is stored
    event ReportStored(string indexed reportId, uint256 timestamp);

    /**
     * @dev Store a report in the contract.
     * @param _reportId The unique ID of the report.
     * @param _timestamp The timestamp of the report.
     * @param _location The location of the incident.
     * @param _imageUrl The URL of the image (or IPFS hash).
     * @param _prediction The prediction from the model.
     * @param _confidence The confidence level of the prediction.
     * @param _classifiedAs The classification of the incident.
     * @param _urgencyLevel The urgency level of the incident.
     * @param _ngoAlertSent Whether an NGO alert was sent.
     * @param _ngoAlertTimestamp The timestamp of the NGO alert.
     * @param _caseStatus The current status of the case.
     */
    function storeReport(
        string memory _reportId,
        uint256 _timestamp,
        string memory _location,
        string memory _imageUrl,
        string memory _prediction,
        uint256 _confidence,
        string memory _classifiedAs,
        string memory _urgencyLevel,
        bool _ngoAlertSent,
        uint256 _ngoAlertTimestamp,
        string memory _caseStatus
    ) public {
        // Create a new report and store it in the mapping
        reports[_reportId] = Report({
            reportId: _reportId,
            timestamp: _timestamp,
            location: _location,
            imageUrl: _imageUrl,
            prediction: _prediction,
            confidence: _confidence,
            classifiedAs: _classifiedAs,
            urgencyLevel: _urgencyLevel,
            ngoAlertSent: _ngoAlertSent,
            ngoAlertTimestamp: _ngoAlertTimestamp,
            caseStatus: _caseStatus
        });

        // Emit an event to log the report storage
        emit ReportStored(_reportId, _timestamp);
    }

    /**
     * @dev Retrieve a report by its reportId.
     * @param _reportId The unique ID of the report.
     * @return All fields of the report.
     */
    function getReport(string memory _reportId) public view returns (
        string memory,
        uint256,
        string memory,
        string memory,
        string memory,
        uint256,
        string memory,
        string memory,
        bool,
        uint256,
        string memory
    ) {
        // Fetch the report from the mapping
        Report memory report = reports[_reportId];

        // Return all fields of the report
        return (
            report.reportId,
            report.timestamp,
            report.location,
            report.imageUrl,
            report.prediction,
            report.confidence,
            report.classifiedAs,
            report.urgencyLevel,
            report.ngoAlertSent,
            report.ngoAlertTimestamp,
            report.caseStatus
        );
    }
}
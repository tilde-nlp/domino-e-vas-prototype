# Mission Chain REST APIs (1.0)

## SubmitProgrammingRequest 

Submit the given programming request.

##### Request Body schema: application/json



| externalId | stringThe programming request mission chain external Id |
| --- | --- |
| externalRefrequired | stringThe programming request mission chain external Ref |
| constellationrequired | string ^[A-Za-z0-9 !\\"#$%\&'*+,-./:;<=>?@^\_\`(\|)\~]{1,500}$ The programming request mission |
| priority | integer [ 1 .. 16 ] Describe the priority of the programming request. 1 is the greatest priority |
| statusrequired | stringEnum: "ACTIVATED" "CANCELLED" "EXPIRED" "COMPLETED" Programming request status |
| validityrequired | objectValidity period |
| activationDate | string <date-time> The programming request activation date |
| aoirequired | objectArea of interest (polygon) in GeoJson format |
| remainingToAcquire | object (GeoJSON MultiPolygon) Area of interest (polygon) in GeoJson format |
| satellitesrequired | Array of stringsThe programming request list of satellites |
| scoringParametersrequired | objectScoringParameters definitions |
| splitParameters | objectSplitParameters definitions |
| acquisitionParametersrequired | objectAcquisitionParameters definitions |
| angularConstraintsrequired | object or object or object |
| downloadParametersrequired | objectDownloadParameters definitions |
| coverageCompletion | object (The Programming request coverage completion object definition) The coverage feasibility estimation completion date and percentage progression |
| missionParameters | objectMission specific parameters |
| acquisitions | Array of objects (Acquisition Request object definition) The acquisitions returned the analysis of the mission |

### Responses 

| **HTTP Status Code** | **Description** |
| --- | --- |
| 200 | The submitted Programming request |
| 400 | Bad request. The request body does not match the schema |

post /programming-requests

http://mission-chain-services/programming-requests

### Request samples 

* Payload

Content type: application/json

{

 "externalId": "string",
 "externalRef": null,
 "constellation": null,
 "priority": 1,
 "status": null,
 "validity": null,
 "activationDate": "2024-11-21T06:44:16Z",
 "aoi": null,
 "remainingToAcquire": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "satellites": null,
 "scoringParameters": null,
 "splitParameters": null,
 "acquisitionParameters": null,
 "angularConstraints": null,
 "downloadParameters": null,
 "coverageCompletion": {
 "isCompleted": true,
 "completionDate": "2024-11-21T06:44:16Z",
 "progressAtDate": 0,
 "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ]
 },
 "missionParameters": null,
 "acquisitions": [
 {
 "externalId": "string",
 "status": "ACTIVATED",
 "datedDtos": [
 {
 "guid": "string",
 "satellite": "string",
 "orbitalDirection": "ASCENDING",
 "accessRoll": 0,
 "orbitNumber": 0,
 "psoStart": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "psoMiddle": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "psoEnd": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "missionParameters": {},
 "externalId": "string",
 "priority": "NONE",
 "period": {
 "begin": "2024-11-21T06:44:16Z",
 "end" : "2024-11-21T06:44:16Z"
 },
 "orbitCycleNumber": 0,
 "solarElevationAngle": 0
 }
 ],
 "meshes": [
 {
 "aoi": {
 "type": "Polygon",
 "coordinates": [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "meanAcquisitionDuration": 0,
 "usefulArea": 0,
 "gridCellIds": ["string"],
 "missionParameters": {}
 }
 ],
 "missionParameters": {}
 }
 ]
}

Response samples 

200

Content type: application/json

{
 "externalId": null,
 "externalRef": null,
 "constellation": null,
 "priority": 1,
 "status": null,
 "validity": null,
 "activationDate": "2024-11-21T06:44:16Z",
 "aoi": null,
 "remainingToAcquire": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "satellites": null,
 "scoringParameters": null,
 "splitParameters": null,
 "acquisitionParameters": null,
 "angularConstraints": null,
 "downloadParameters": null,
 "coverageCompletion": {
 "isCompleted": true,
 "completionDate": "2024-11-21T06:44:16Z",
 "progressAtDate": 0,
 "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ]
 },
 "missionParameters": null,
 "acquisitions": null,
 "historyEvents": null
}

## UpdateProgrammingRequest 

Update the given programming request

##### Request Body schema: application/json

| externalIdrequired | stringThe User Request identified by its guid |
| --- | --- |
| priority | integer [ 1 .. 16 ] The new priority |
| clearSkyRejectionSelectionThreshold | numberminimum forecast clear sky percentage for programming the request (in %) |

### Responses 

| **HTTP Status Code** | **Description** |
| --- | --- |
| 200 | The updated User request |
| 400 | Bad request. The request body does not match the schema |
| 403 | Forbidden. The user request can not be updated. It is not authorized to update the requested fields |

patch /programming-requests

http://mission-chain-services/programming-requests

### Request samples 

* Payload

Content type: application/json

{
"externalId": "string",
"priority": 1,
"clearSkyRejectionSelectionThreshold": 0
}

### Response samples 

* 200

Content type: application/json

{
 "externalId": null,
 "externalRef": null,
 "constellation": null,
 "priority": 1,
 "status": null,
 "validity": null,
 "activationDate": "2024-11-21T06:44:16Z",
 "aoi": null,
 "remainingToAcquire": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "satellites": null,
 "scoringParameters": null,
 "splitParameters": null,
 "acquisitionParameters": null,
 "angularConstraints": null,
 "downloadParameters": null,
 "coverageCompletion": {
 "isCompleted": true,
 "completionDate": "2024-11-21T06:44:16Z",
 "progressAtDate": 0,
 "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ]
 },
 "missionParameters": null,
 "acquisitions": null,
 "historyEvents": null
}

## RetrieveProgrammingRequests 

Get all programming requests

##### query Parameters

| externalId | stringA query parameter to filter the Programming Requests. |
| --- | --- |
| status | Array of strings,Items Enum: "ACTIVATED" "CANCELLED" "COMPLETED" A query parameter to filter the Programming Requests. |
| horizonStart | stringA query parameter to filter the Programming Requests. |
| horizonEnd | stringA query parameter to filter the Programming Requests. |

### Responses 

| **HTTP Status Code** | **Description** |
| --- | --- |
| 200 | A Programming Request list |
| 400 | Bad request. The request body does not match the schema |

get /programming-requests

http://mission-chain-services/programming-requests

### Response samples 

* 200

Content type: application/json
[
 {
 "externalId": "string",
 "externalRef": "string",
 "constellation": "string",
 "priority": 1,
 "status": "ACTIVATED",
 "validity": {
 "begin": "2024-11-21T06:44:16Z",
 "end" : "2024-11-21T06:44:16Z"
 },
 "activationDate": "2024-11-21T06:44:16Z",
 "aoi": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "remainingToAcquire": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "satellites": ["string"],
 "scoringParameters": {
 "areaWeightingFlag": true,
 "coreWeightingFlag": true,
 "catalogWeightingFlag": true,
 "weatherWeightingFlag": true,
 "clearSkyRejectionThreshold": 0,
 "clearSkyBonusThreshold": 0,
 "missionParameters": {}
 },

 "splitParameters": {
 "method": "WORLD\_LAYERED\_SPLIT",
 "maxMeshLength": 0,
 "cap": 0,
 "overlapMarginAlongTrack": 0,
 "overlapMarginAcrossTrack": 0,
 "missionParameters": {}
 },
 "acquisitionParameters": {
 "acquisitionType": "string",
 "mode": "MONOSCOPIC",
 "monopass": true,
 "stereoType": "QUASI\_SYMETRICAL",
 "luminosityThreshold": 0,
 "orbitalPhase": "DAY",
 "guidanceMode": "string",
 "nUpletAcquisitionsNumber": 0,
 "missionParameters": {}
 },
 "angularConstraints": {
 "angularConstraintsType": "INCIDENCE",
 "minAzimuthAngle": 0,
 "maxAzimuthAngle": 0,
 "maxGroundAngle": 0,
 "missionParameters": {}
 },
 "downloadParameters": {
 "downloadBranches": [
 {
 "inventoryCenter": "string",
 "stations": ["string"],
 "validating": true,
 "missionParameters": {}
 }
 ],
 "missionParameters": {}
 },
 "coverageCompletion": {
 "isCompleted": true,
 "completionDate": "2024-11-21T06:44:16Z",
 "progressAtDate": 0,
 "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ]
 },
 "missionParameters": {},
 "acquisitions": [
 {
 "externalId": "string",
 "status": "ACTIVATED",
 "datedDtos": [
 {
 "guid": "string",
 "satellite": "string",
 "orbitalDirection": "ASCENDING",
 "accessRoll": 0,
 "orbitNumber": 0,
 "psoStart": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "psoMiddle": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "psoEnd": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "missionParameters": {},
 "externalId": "string",
 "priority": "NONE",
 "period": {
 "begin": "2024-11-21T06:44:16Z",
 "end" : "2024-11-21T06:44:16Z"
 },
 "orbitCycleNumber": 0,
 "solarElevationAngle": 0
 }
 ],
 "meshes": [
 {
 "aoi": {
 "type": "Polygon",
 "coordinates": [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "meanAcquisitionDuration": 0,
 "usefulArea": 0,
 "gridCellIds": ["string"],
 "missionParameters": {}
 }
 ],
 "missionParameters": {}
 }
 ]
 }
]

## CancelProgrammingRequest 

Cancel the given programming request with the given externalId

##### query Parameters



| externalIdrequired | stringA query parameter to cancel the correct Programming Requests. |
| --- | --- |

### Responses 



| **HTTP Status Code** | **Description** |
| --- | --- |
| 200 | The Programming request has been cancelled |
| 400 | Bad request. The request body does not match the schema |
| 404 | Not found. The Programming request with the given externalId does not exist |

delete /programming-requests

http://mission-chain-services/programming-requests

## LaunchAnalysis 

Request the analysis for the given user request. Compute the geo split and accesses without submitting the request

##### Request Body schema: application/json



| externalId | stringThe programming request mission chain external Id |
| --- | --- |
| externalRefrequired | stringThe programming request mission chain external Ref |
| constellationrequired | string ^[A-Za-z0-9 !\\"#$%\&'*+,-./:;<=>?@^\_\`(\|)\~]{1,500}$ The programming request mission |
| priority | integer [ 1 .. 16 ] Describe the priority of the programming request. 1 is the greatest priority |
| statusrequired | stringEnum: "ACTIVATED" "CANCELLED" "EXPIRED" "COMPLETED" Programming request status |
| validityrequired | objectValidity period |
| activationDate | string <date-time> The programming request activation date |
| aoirequired | objectArea of interest (polygon) in GeoJson format |
| | typerequired | stringValue: "MultiPolygon" | | --- | --- | | coordinatesrequired | Array of Array of Array of Array of numbers | | bbox | Array of numbers >= 4 items | | |
| remainingToAcquire | object (GeoJSON MultiPolygon) Area of interest (polygon) in GeoJson format |
| satellitesrequired | Array of stringsThe programming request list of satellites |
| scoringParametersrequired | objectScoringParameters definitions |
| splitParameters | objectSplitParameters definitions |
| acquisitionParametersrequired | objectAcquisitionParameters definitions |
| angularConstraintsrequired | object or object or object |
| downloadParametersrequired | objectDownloadParameters definitions |
| coverageCompletion | object (The Programming request coverage completion object definition) The coverage feasibility estimation completion date and percentage progression |
| missionParameters | objectMission specific parameters |
| acquisitions | Array of objects (Acquisition Request object definition) The acquisitions returned the analysis of the mission |

### Responses 

| **HTTP Status Code** | **Description** |
| --- | --- |
| 200 | The user request with geo split and accesses computed without submission |
| 400 | Bad request. The request body does not match the schema |

post /user-request/analysis

http://mission-chain-services/user-request/analysis

### Request samples 

* Payload

Content type: application/json

{
 "externalId": "string",
 "externalRef": null,
 "constellation": null,
 "priority": 1,
 "status": null,
 "validity": null,
 "activationDate": "2024-11-21T06:44:16Z",
 "aoi": null,
 "remainingToAcquire": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "satellites": null,
 "scoringParameters": null,
 "splitParameters": null,
 "acquisitionParameters": null,
 "angularConstraints": null,
 "downloadParameters": null,
 "coverageCompletion": {
 "isCompleted": true,
 "completionDate": "2024-11-21T06:44:16Z",
 "progressAtDate": 0,
 "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ]
 },
 "missionParameters": null,
 "acquisitions": [
 {
 "externalId": "string",
 "status": "ACTIVATED",
 "datedDtos": [
 {
 "guid": "string",
 "satellite": "string",
 "orbitalDirection": "ASCENDING",
 "accessRoll": 0,
 "orbitNumber": 0,
 "psoStart": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "psoMiddle": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "psoEnd": { "pso": {"orbitNumber": 0, "durationFromStart": 0} },
 "missionParameters": {},
 "externalId": "string",
 "priority": "NONE",
 "period": {
 "begin": "2024-11-21T06:44:16Z",
 "end" : "2024-11-21T06:44:16Z"
 },
 "orbitCycleNumber": 0,
 "solarElevationAngle": 0
 }
 ],
 "meshes": [
 {
 "aoi": {
 "type": "Polygon",
 "coordinates": [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "meanAcquisitionDuration": 0,
 "usefulArea": 0,
 "gridCellIds": ["string"],
 "missionParameters": {}
 }
 ],
 "missionParameters": {}
 }
 ]
}

### Response samples 

* 200

Content type: application/json

{
 "externalId": null,
 "externalRef": null,
 "constellation": null,
 "priority": 1,
 "status": null,
 "validity": null,
 "activationDate": "2024-11-21T06:44:16Z",
 "aoi": null,
 "remainingToAcquire": {
 "type": "MultiPolygon",
 "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ] ],
 "bbox": [0, 0, 0, 0]
 },
 "satellites": null,
 "scoringParameters": null,
 "splitParameters": null,
 "acquisitionParameters": null,
 "angularConstraints": null,
 "downloadParameters": null,
 "coverageCompletion": {
 "isCompleted": true,
 "completionDate": "2024-11-21T06:44:16Z",
 "progressAtDate": 0,
 "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ]
 },
 "missionParameters": null,
 "acquisitions": null,
 "historyEvents": null
}

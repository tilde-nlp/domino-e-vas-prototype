Mission Chain REST APIs (1.0)
===

SubmitProgrammingRequest

Submit the given programming request.

Request Body schema: application/json

| externalId externalRef required | string The programming request mission chain external Id |
|| string |
|| The programming request mission chain external Ref |
| constellation | string ^[A-Za-z0-9 !\\"#$%& \*\* +, -. / :;<= >?@^\_\`(\|)\~]{1,500}$ |
| required | The programming request mission integer [ 1 .. 16 ] |
| priority | Describe the priority of the programming request. 1 is the greatest priority |
|| string |
| status required | Enum: "ACTIVATED" "CANCELLED" "EXPIRED" "COMPLETED" |
|| Programming request status |
| validity | object |
| required 
| activationDate | Validity period string <date-time> || The programming request activation date |
| aoi | object |
| required | Area of interest (polygon) in GeoJson format object (GeoJSON MultiPolygon) |
| remaining ToAcquire 
|| || Area of interest (polygon) in GeoJson format |
| satellites | Array of strings |
| required | The programming request list of satellites |
| scoringParameters required | object |

ScoringParameters definitions object

splitParameters

SplitParameters definitions

object

acquisitionParameters

required

AcquisitionParameters definitions

angularConstraints

required

object or object or object

object

downloadParameters

required

DownloadParameters definitions

object (The Programming request coverage completion object definition)

coverageCompletion

The coverage feasibility estimation completion date and percentage

progression

object

missionParameters

Mission specific parameters

Array of objects (Acquisition Request object definition)

acquisitions

The acquisitions returned the analysis of the mission


## Responses

HTTP STATUS CODE

DESCRIPTION

|||
| - | - |
| 200 | The submitted Programming request |
| 400 | Bad request. The request body does not match the schema |

post /programming-requests http://mission-chain-services/programming-requests

Request samples

· Payload

Content type: application/json { "externalId": "string", "externalRef": null, "constellation": null,

"priority": 1, "status": null, "validity": null, "activationDate": "2024-11-21T06:44:16Z", "aoi": null, "remainingToAcquire": { "type": "MultiPolygon",

"coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ]

], "bbox": [0, 0, 0, 0] }, "satellites": null, "scoringParameters": null, "splitParameters": null, "acquisitionParameters": null, "angularConstraints": null,

"downloadParameters": null, "coverageCompletion": { "isCompleted": true, "completionDate": "2024-11-21T06:44:16Z",

"progressAtDate": 0, "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ] }, "missionParameters": null,

"acquisitions": [ { "externalId": "string", "status": "ACTIVATED", "datedDtos": [ { "guid": "string", "satellite": "string", "orbitalDirection": "ASCENDING", "accessRoll": 0, "orbitNumber": 0, "psoStart": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "psoMiddle": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "psoEnd": {"pso": {"orbitNumber": 0, "durationFromStart": 0} }, "missionParameters": {}, "externalId": "string", "priority": "NONE",

"period": { "begin": "2024-11-21T06:44:16Z", "end" : "2024-11-21T06:44:16Z" }, 'orbitCycleNumber": 0, "solarElevationAngle": 0 }

], "meshes": [ { "aoi": { "type": "Polygon", "coordinates": [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ], "bbox": [0, 0, 0, 0] }, "meanAcquisitionDuration": 0, "usefulArea": 0, "gridCellIds": ["string"], "missionParameters": {} }

], "missionParameters": {} }

]

} Response samples 200 Content type: application/json { "externalId": null, "externalRef": null, "constellation": null, "priority": 1, "status": null, "validity": null, "activationDate": "2024-11-21T06:44:16Z", "aoi": null, "remainingToAcquire": { "type": "MultiPolygon", "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ]

] ],

"bbox": [0, 0, 0, 0] }, "satellites": null, "scoringParameters": null,

"splitParameters": null,

"acquisitionParameters": null,

"angularConstraints": null,

"downloadParameters": null,

"coverageCompletion": { "isCompleted": true, "completionDate": "2024-11-21T06:44:16Z",

"progressAtDate": 0, "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ] }, "missionParameters": null, "acquisitions": null, "historyEvents": null }


## UpdateProgrammingRequest

Update the given programming request

Request Body schema: application/json

string

externalId required The User Request identified by its guid integer [ 1 .. 16 ] priority The new priority

number

clearSkyRejectionSelectionThreshold minimum forecast clear sky percentage for programming the request (in %)

Responses

HTTP STATUS CODE DESCRIPTION

|||
| - | - |
| 200 | The updated User request |
| 400 | Bad request. The request body does not match the schema |



#### pg:403



<!-- PageHeader="Forbidden. The user request can not be updated. It is not authorized to update the requested fields" -->

patch /programming-requests http://mission-chain-services/programming-requests


## Request samples

· Payload

Content type: application/json {

"externalId": "string",

"priority": 1, "clearSkyRejectionSelectionThreshold": 0 }


### Response samples

. 200

Content type: application/json { "externalId": null,

"externalRef": null,

"constellation": null,

"priority": 1,

"status": null,

"validity": null,

"activationDate": "2024-11-21T06:44:16Z",

"aoi": null,

"remainingToAcquire": {

"type": "MultiPolygon",

"coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ]

]

"bbox": [0, 0, 0, 0] }, "satellites": null,

"scoringParameters": null,

"splitParameters": null,

"acquisitionParameters": null,

"angularConstraints": null,

"downloadParameters": null,

"coverageCompletion": { "isCompleted": true, "completionDate": "2024-11-21T06:44:16Z", "progressAtDate": 0, "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ] }, "missionParameters": null,

"acquisitions": null, "historyEvents": null }


## RetrieveProgrammingRequests

Get all programming requests

query Parameters

string

externalId

A query parameter to filter the Programming Requests.

Array of strings,

Items Enum: "ACTIVATED" "CANCELLED" "COMPLETED"

status

A query parameter to filter the Programming Requests.

string

horizonStart

A query parameter to filter the Programming Requests.

string

horizonEnd

A query parameter to filter the Programming Requests.


### Responses

HTTP STATUS CODE DESCRIPTION

|||
| - | - |
| 200 | A Programming Request list |
| 400 | Bad request. The request body does not match the schema |

get /programming-requests http://mission-chain-services/programming-requests


### Response samples

. 200

Content type: application/json [

{ "externalId": "string", "externalRef": "string", "constellation": "string", "priority": 1, "status": "ACTIVATED", "validity": { "begin": "2024-11-21T06:44:16Z", "end" : "2024-11-21T06:44:16Z" }, "activationDate": "2024-11-21T06:44:16Z", "aoi": { "type": "MultiPolygon", "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ]

], "bbox": [0, 0, 0, 0]

"remainingToAcquire": { "type": "MultiPolygon", "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ]

]

], "bbox": [0, 0, 0, 0] }, "satellites": ["string"], "scoringParameters": { "areaWeightingFlag": true, "coreWeightingFlag": true, "catalogWeightingFlag": true, "weatherWeightingFlag": true, "clearSkyRejection Threshold": 0, "clearSkyBonusThreshold": 0, "missionParameters": {}

"splitParameters": { "method": "WORLD\_LAYERED\_SPLIT", "maxMeshLength": 0, "cap": 0, "overlapMarginAlongTrack": 0, "overlapMarginAcrossTrack": 0, "missionParameters": {} }, "acquisitionParameters": { "acquisitionType": "string", "mode": "MONOSCOPIC",

"monopass": true, "stereoType": "QUASI\_SYMETRICAL", "luminosityThreshold": 0, "orbitalPhase": "DAY", "guidanceMode": "string", "nUpletAcquisitionsNumber": 0, "missionParameters": {} },

"angularConstraints": { "angularConstraintsType": "INCIDENCE",

"minAzimuthAngle" : 0, "maxAzimuthAngle": 0, "maxGroundAngle": 0, "missionParameters": {} }, "downloadParameters": { "downloadBranches": [ { "inventoryCenter": "string", "stations": ["string"],

"validating": true, "missionParameters": {} } missionParameters": {} }, "coverageCompletion": { "isCompleted": true, "completionDate": "2024-11-21T06:44:16Z", "progressAtDate": 0, "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ] }, "missionParameters": {}, "acquisitions": [ { "externalId": "string", "status": "ACTIVATED",

"datedDtos": [ { "guid": "string", "satellite": "string", "orbitalDirection": "ASCENDING", "accessRoll": 0, "orbitNumber": 0, "psoStart": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "psoMiddle": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "psoEnd": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "missionParameters": {},

"externalId": "string", "priority": "NONE", "period": { "begin": "2024-11-21T06:44:16Z",

"end" : "2024-11-21T06:44:16Z"

"orbitCycleNumber": 0, "solarElevationAngle": 0 }

],

"meshes": [ {

"aoi": { "type": "Polygon", "coordinates": [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ], "bbox": [0, 0, 0, 0]

"meanAcquisitionDuration": 0, "usefulArea": 0, 'gridCelllds": ["string"], "missionParameters": {} } "missionParameters": {}

1,

}

]

}

]


## CancelProgrammingRequest

Cancel the given programming request with the given externalId

query Parameters

string

externalId

required

A query parameter to cancel the correct Programming Requests.


### Responses

| HTTP STATUS CODE | DESCRIPTION |
| - | - |
| 200 | The Programming request has been cancelled |
| 400 | Bad request. The request body does not match the schema |
| 404 | Not found. The Programming request with the given externalId does not exist |

delete /programming-requests http://mission-chain-services/programming-requests

## LaunchAnalysis
Request the analysis for the given user request. Compute the geo split and accesses without submitting the request

Request Body schema: application/json

externalId

string

The programming request mission chain external Id

string

externalRef

required

The programming request mission chain external Ref

string ^[A-Za-z0-9 !\\"#$%& \*\* +, -. / :;<= >?@^\_\`(|)\~]{1,500}$

constellation

required

The programming request mission

integer [ 1 .. 16 ]

priority

Describe the priority of the programming request. 1 is the greatest priority

string

Enum: "ACTIVATED" "CANCELLED" "EXPIRED" "COMPLETED"

status

required

Programming request status

object

validity

required

Validity period

string <date-time>

activationDate

The programming request activation date

aoi

object

required

Area of interest (polygon) in GeoJson format

type

string

required

Value: "MultiPolygon"

coordinates

Array of Array of Array of Array of numbers

required

bbox

Array of numbers >= 4 items

object (GeoJSON MultiPolygon)

remainingToAcquire

Area of interest (polygon) in GeoJson format

Array of strings

satellites

required

The programming request list of satellites

|||
| - | - |
| scoringParameters | object |
| required | ScoringParameters definitions |
| | object |
| splitParameters | SplitParameters definitions |
| acquisitionParameters | object |
| required | AcquisitionParameters definitions |
| angularConstraints required | object or object or object |
| downloadParameters | object |
| required | DownloadParameters definitions |
|| object (The Programming request coverage completion object definition) |
| coverageCompletion | The coverage feasibility estimation completion date and percentage progression |
| missionParameters 
| | object |
|
|
| acquisitions | || Mission specific parameters || Array of objects (Acquisition Request object definition) || |
| | The acquisitions returned the analysis of the mission |

Responses

| HTTP STATUS CODE | DESCRIPTION |
| - | - |
| 200 | The user request with geo split and accesses computed without submission |
| 400 | Bad request. The request body does not match the schema |

post /user-request/analysis http://mission-chain-services/user-request/analysis

Request samples

· Payload

Content type: application/json {

"externalId": "string", "externalRef": null,

"constellation": null,

"priority": 1, "status": null, "validity": null, "activationDate": "2024-11-21T06:44:16Z", "aoi": null, "remainingToAcquire": {

"type": "MultiPolygon", "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ]

], "bbox": [0, 0, 0, 0] }, "satellites": null, "scoringParameters": null, "splitParameters": null, "acquisitionParameters": null,

"angularConstraints": null, "downloadParameters": null, "coverageCompletion": { "isCompleted": true, "completionDate": "2024-11-21T06:44:16Z",

"progressAtDate": 0, 'progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ] }, "missionParameters": null, "acquisitions": [ { "externalId": "string", "status": "ACTIVATED", "datedDtos": [ { 'guid": "string", "satellite": "string", "orbitalDirection": "ASCENDING", "accessRoll": 0, "orbitNumber": 0, "psoStart": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "psoMiddle": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "psoEnd": { "pso": {"orbitNumber": 0, "durationFromStart": 0} }, "missionParameters": {}, "externalId": "string", "priority": "NONE", "period": { "begin": "2024-11-21T06:44:16Z", "end" : "2024-11-21T06:44:16Z" }, "orbitCycleNumber": 0, "solarElevationAngle": 0 } ],

"meshes": [ {

"aoi": { "type": "Polygon", "coordinates": [ [ [0, 0], [0, 0], [0, 0], [0, 0] ] ], "bbox": [0, 0, 0, 0] }, "meanAcquisitionDuration": 0, "usefulArea": 0, "gridCellIds": ["string"], "missionParameters": {} } "missionParameters": {} }

]

}


## Response samples

. 200

Content type: application/json { "externalId": null, "externalRef": null, "constellation": null, "priority": 1, "status": null, "validity": null, "activationDate": "2024-11-21T06:44:16Z", "aoi": null, "remainingToAcquire": { "type": "MultiPolygon", "coordinates": [ [ [ [0, 0], [0, 0], [0, 0], [0, 0] ]

] ], "bbox": [0, 0, 0, 0] }, "satellites": null, 'scoringParameters": null, "splitParameters": null, "acquisitionParameters": null, "angularConstraints": null, "downloadParameters": null, "coverageCompletion": { "isCompleted": true, "completionDate": "2024-11-21T06:44:16Z",

"progressAtDate": 0, "progress": [ {"date": "2024-11-21T06:44:16Z", "progress": 0} ] }, "missionParameters": null, "acquisitions": null, "historyEvents": null }

<figure>

![](https://test-botplatform.tilde.com/api/botdominoe0/media/staging/Mission%20Chain%20REST%20APIs_0.png)

</figure>
